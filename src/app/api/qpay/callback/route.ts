import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_QPAY_SECRET_KEY ||
  "QQ5E0FSEcAPhe9yqiTKn0rtlUUO5ScwtN9yBeBnwUwh2HCfUVEfs";

// Verification per QPayIndia Specification Section 4:
// String to be hashed = secretKey + "|" + MSPReferenceID + "|" + MerchantOrderID + "|" + ResponseCode + "|" + Message + "|" + PaymentMode + "|" + TransactionType
function verifyQPayCallbackHash(params: {
  secretKey: string;
  MSPReferenceID: string;
  MerchantOrderID: string;
  ResponseCode: string;
  Message: string;
  PaymentMode: string;
  TransactionType: string;
  receivedHash: string;
}): { isValid: boolean; calculatedHash: string } {
  const hashString = [
    params.secretKey,
    params.MSPReferenceID || "",
    params.MerchantOrderID || "",
    params.ResponseCode || "",
    params.Message || "",
    params.PaymentMode || "",
    params.TransactionType || "",
  ].join("|");

  const calculatedHash = crypto
    .createHash("sha512")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  const isValid =
    Boolean(params.receivedHash) &&
    calculatedHash === params.receivedHash.trim().toUpperCase();

  return { isValid, calculatedHash };
}

async function extractCallbackData(
  request: NextRequest,
): Promise<Record<string, string>> {
  const contentType = request.headers.get("content-type") || "";
  const data: Record<string, string> = {};

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData();
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
  } else if (contentType.includes("application/json")) {
    try {
      const json = await request.json();
      Object.entries(json).forEach(([k, v]) => {
        data[k] = String(v ?? "");
      });
    } catch {
      // Fallback to text parsing
    }
  } else {
    const text = await request.text();
    const searchParams = new URLSearchParams(text);
    searchParams.forEach((value, key) => {
      data[key] = value;
    });
  }

  // Also include any URL search parameters as fallback
  request.nextUrl.searchParams.forEach((value, key) => {
    if (!data[key]) {
      data[key] = value;
    }
  });

  return data;
}

export async function POST(request: NextRequest) {
  try {
    const data = await extractCallbackData(request);

    const MSPReferenceID = data.MSPReferenceID || "";
    const MerchantOrderID =
      data.MerchantOrderID || data.OrderID || data.orderid || "";
    const ResponseCode = data.ResponseCode || "";
    const Message = data.Message || "";
    const PaymentMode = data.PaymentMode || "";
    const TransactionType = data.TransactionType || "";
    const receivedHash = data.Secure_hash || data.secure_hash || "";

    const { isValid, calculatedHash } = verifyQPayCallbackHash({
      secretKey: SECRET_KEY,
      MSPReferenceID,
      MerchantOrderID,
      ResponseCode,
      Message,
      PaymentMode,
      TransactionType,
      receivedHash,
    });

    // Check response code: QPay uses "100" for Approved / Success, as well as "00", "000"
    const isSuccess =
      ResponseCode === "100" ||
      ResponseCode === "00" ||
      ResponseCode === "000" ||
      Message.toLowerCase().includes("approved") ||
      Message.toLowerCase().includes("success");

    console.log("QPay Callback Received:", {
      MSPReferenceID,
      MerchantOrderID,
      ResponseCode,
      Message,
      PaymentMode,
      TransactionType,
      receivedHash,
      calculatedHash,
      isValid,
      isSuccess,
    });

    const isExplicitWebhook =
      request.headers.get("content-type")?.includes("application/json") ||
      request.headers.get("user-agent")?.toLowerCase().includes("webhook");

    // If this is a customer returning in the browser (standard form POST from gateway):
    if (!isExplicitWebhook) {
      const host =
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        request.nextUrl.host;
      const proto =
        request.headers.get("x-forwarded-proto") ||
        request.nextUrl.protocol.replace(":", "") ||
        "http";
      const redirectUrl = new URL("/donate", `${proto}://${host}`);

      redirectUrl.searchParams.set(
        "status",
        isSuccess ? "success" : "failed",
      );
      if (MerchantOrderID)
        redirectUrl.searchParams.set("orderId", MerchantOrderID);
      if (MSPReferenceID) redirectUrl.searchParams.set("ref", MSPReferenceID);
      if (Message) redirectUrl.searchParams.set("message", Message);
      if (PaymentMode) redirectUrl.searchParams.set("mode", PaymentMode);
      const rawAmount = data.Amount || data.amount;
      if (rawAmount) {
        try {
          const decodedAmount = Buffer.from(rawAmount, "base64").toString("utf-8");
          redirectUrl.searchParams.set("amount", decodedAmount);
        } catch {
          redirectUrl.searchParams.set("amount", rawAmount);
        }
      }
      if (!isValid && receivedHash)
        redirectUrl.searchParams.set("hashError", "true");

      return NextResponse.redirect(redirectUrl.toString(), 303);
    }

    // Server-to-server callback notification (webhook)
    return NextResponse.json(
      {
        status: isSuccess && isValid ? "SUCCESS" : "FAILED",
        verified: isValid,
        message: Message || (isValid ? "Callback processed" : "Hash mismatch"),
        orderId: MerchantOrderID,
        refId: MSPReferenceID,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error processing QPay callback:", error);
    return NextResponse.json(
      { status: "ERROR", message: error?.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  // Support GET redirection if QPay redirects via GET to the callback URL
  return POST(request);
}
