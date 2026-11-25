"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Utensils,
  ChevronDown,
  ShieldCheck,
  Building2,
  ArrowRight,
  Landmark,
  Leaf,
  Globe2,
  CheckCircle2,
  Building,
  Smartphone,
  Quote,
  Users,
  BookOpen,
  X,
  Loader2,
  Printer,
  Copy,
  Check,
  FileText,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { addDonor } from "../../services/api";

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const predefinedAmounts = [100, 250, 500, 1000, 5000, 10000];

// Module-level guard to ensure addDonor is NEVER called more than once per transaction
const inFlightOrProcessedDonorKeys = new Set<string>();

// QPay Configuration
const QPAY_CONFIG = {
  targetUrl: "https://pg.qpayindia.com/wwws/Payment/PaymentDetails.aspx",
  qpayId: "kandaapiacc",
  qpayPwd: "kanda!123",
  secretKey: "QQ5E0FSEcAPhe9yqiTKn0rtlUUO5ScwtN9yBeBnwUwh2HCfUVEfs",
  mode: "test", // 'test' or 'live'
  responseUrl:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/qpay/callback`
      : "https://srikandhagurufoundation.org/api/qpay/callback",
};

// Disallowed characters in QPay values: [ < > ; ]
const sanitizeQPayValue = (val: string | null | undefined, maxLen?: number) => {
  if (!val) return "";
  const cleaned = val.replace(/[<>;[\]]/g, "").trim();
  return maxLen ? cleaned.slice(0, maxLen) : cleaned;
};

// SHA-512 calculation using Web Crypto API
async function generateSHA512(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const faqs = [
  {
    question: "How will my donation be used?",
    answer:
      "Your donation will be directly allocated to the cause you select. Temple construction funds go towards building materials and artisans, while Annadhanam funds are used to purchase groceries and serve fresh meals to devotees and the needy daily.",
  },
  {
    question: "Can I donate for a specific cause?",
    answer:
      "Yes, you can choose either '{t(\"donate.kovil_kattada\")}' or 'Annadhanam Contribution' from the dropdown in the donation form.",
  },
  {
    question: "Are online payments secure?",
    answer:
      "Absolutely. We use industry-standard 256-bit encryption and trusted payment gateways to ensure your transaction is 100% secure and private.",
  },
  {
    question: "Will I receive a donation receipt?",
    answer:
      "Yes, you will receive a digital receipt on your provided email address immediately upon successful payment. This receipt can be used for 80G tax exemptions where applicable.",
  },
];

export default function DonatePage() {
  const { t } = useLanguage();
  const [selectedCause, setSelectedCause] = useState("kovil");
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState<string>("");

  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("India");
  const [pannumber, setPannumber] = useState("");
  const [aadhaarnumber, setAadhaarnumber] = useState("");
  const [passportnumber, setPassportnumber] = useState("");
  const [donortype, setDonortype] = useState("domestic");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessPage, setIsSuccessPage] = useState(false);
  const [successDetails, setSuccessDetails] = useState<{
    orderId?: string;
    refId?: string;
    amount?: string | number;
    cause?: string;
    donorName?: string;
    email?: string;
    phone?: string;
    date?: string;
    paymentMode?: string;
  } | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [error, setError] = useState("");

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const hasCalledAddDonor = useRef(false);

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetDonationForm = () => {
    setIsSuccessPage(false);
    setSuccessDetails(null);
    setFullname("");
    setMobile("");
    setEmail("");
    setAddress("");
    setPannumber("");
    setAadhaarnumber("");
    setPassportnumber("");
    setAmount("");
    setCustomAmount("");
    setError("");
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("skf_last_donation");
        localStorage.removeItem("skf_last_donation");
      } catch {
        // ignore
      }
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Check for callback status when redirected from QPay gateway
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get("status");
    const message = searchParams.get("message");
    const hashError = searchParams.get("hashError");

    if (!status) return;

    let savedData: any = {};
    try {
      const stored =
        sessionStorage.getItem("skf_last_donation") ||
        localStorage.getItem("skf_last_donation");
      if (stored) savedData = JSON.parse(stored);
    } catch {
      // ignore
    }

    const orderIdVal = searchParams.get("orderId") || savedData.orderId || "";
    const refVal = searchParams.get("ref") || savedData.refId || "";

    // Validate amount from URL or saved session data
    const rawUrlAmount = searchParams.get("amount");
    let amountVal = "";
    if (
      rawUrlAmount &&
      !isNaN(Number(rawUrlAmount)) &&
      Number(rawUrlAmount) > 0
    ) {
      amountVal = String(Number(rawUrlAmount));
    } else if (
      savedData.amount &&
      !isNaN(Number(savedData.amount)) &&
      Number(savedData.amount) > 0
    ) {
      amountVal = String(Number(savedData.amount));
    } else {
      amountVal = "0";
    }

    let causeVal = "Temple Construction & Renovation";
    if (savedData.cause === "anna" || savedData.cause === "annadhanam" || savedData.cause === "food") {
      causeVal = "Annadhanam Contribution";
    } else if (savedData.cause === "ghosala" || savedData.cause === "gosala") {
      causeVal = "Ghosala Contribution";
    } else if (savedData.cause === "pooja" || savedData.cause === "puja") {
      causeVal = "Pooja Contribution";
    }

    const rawMode = searchParams.get("mode") || savedData.paymentmode || "";
    let paymentModeVal = "UPI";
    if (rawMode) {
      const lower = rawMode.toLowerCase();
      if (lower.includes("upi")) paymentModeVal = "UPI";
      else if (
        lower.includes("card") ||
        lower.includes("cc") ||
        lower.includes("dc")
      )
        paymentModeVal = "Card";
      else if (
        lower.includes("net") ||
        lower.includes("nb") ||
        lower.includes("banking")
      )
        paymentModeVal = "Net Banking";
      else paymentModeVal = rawMode;
    }

    // Determine normalized payment status: "success", "failed", or "pending"
    const normalizedStatus =
      status === "success"
        ? "success"
        : status === "failed"
          ? "failed"
          : "pending";

    // Handle UI display depending on payment status
    if (status === "success") {
      setSuccessDetails({
        orderId: orderIdVal,
        refId: refVal,
        amount: amountVal,
        cause: causeVal,
        donorName: savedData.name || "",
        email: savedData.email || "",
        phone: savedData.phone || "",
        date:
          savedData.date ||
          new Date().toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        paymentMode: searchParams.get("mode") || "Online",
      });
      setIsSuccessPage(true);
    } else if (status === "failed") {
      if (hashError) {
        setError("Security validation failed for the payment response.");
      } else {
        setError(message || "Payment was not successful. Please try again.");
      }
    } else if (status === "pending") {
      setError(
        message ||
        "Payment is currently pending confirmation from your bank. We will update you once confirmed.",
      );
    }

    // Call /donor/add API for all completed payment states (success, failed, or pending)
    const donorSyncKey = `skf_donor_recorded_${orderIdVal || refVal || savedData.orderId || "order"}_${normalizedStatus}`;
    const alreadyRecorded =
      typeof window !== "undefined" &&
      Boolean(sessionStorage.getItem(donorSyncKey));

    if (
      !hasCalledAddDonor.current &&
      !inFlightOrProcessedDonorKeys.has(donorSyncKey) &&
      !alreadyRecorded
    ) {
      // Lock immediately and synchronously across ref, module cache, and sessionStorage
      hasCalledAddDonor.current = true;
      inFlightOrProcessedDonorKeys.add(donorSyncKey);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(donorSyncKey, "in_progress");
      }

      let causePayload = "temple";
      if (
        savedData.cause === "anna" ||
        savedData.cause === "annadhanam" ||
        savedData.cause === "food"
      ) {
        causePayload = "food";
      } else if (savedData.cause === "ghosala" || savedData.cause === "gosala") {
        causePayload = "ghosala";
      } else if (savedData.cause === "pooja" || savedData.cause === "puja") {
        causePayload = "pooja";
      }

      const donorPayload = {
        cause: causePayload,
        type: "online",
        fullname:
          (savedData.fullname || savedData.name || "").trim() || "Donor",
        mobile:
          (savedData.mobile || savedData.phone || "").trim() || "9876543210",
        email:
          (savedData.email || "").trim() || "donor@srikandhagurufoundation.org",
        address:
          (savedData.address || "").trim() ||
          (savedData.country ? `${savedData.country}` : "Address not provided"),
        country: (savedData.country || "").trim() || "India",
        pannumber: savedData.pannumber?.trim()
          ? savedData.pannumber.trim().toUpperCase()
          : null,
        aadhaarnumber: savedData.aadhaarnumber?.trim()
          ? savedData.aadhaarnumber.replace(/\s+/g, "").trim()
          : null,
        passportnumber: savedData.passportnumber?.trim()
          ? savedData.passportnumber.trim().toUpperCase()
          : null,
        donortype:
          savedData.donortype === "international"
            ? "international"
            : "domestic",
        amount:
          !isNaN(Number(amountVal)) && Number(amountVal) > 0
            ? Number(amountVal)
            : Number(savedData.amount) || 0,
        orderid: orderIdVal || savedData.orderId || `SKGF-DON-${Date.now()}`,
        gatewayref: refVal || savedData.refId || null,
        paymentmode: paymentModeVal,
        paymentstatus: normalizedStatus,
      };

      addDonor(donorPayload)
        .then((res) => {
          console.log(
            `Donor added successfully with status ${normalizedStatus}:`,
            res,
          );
          if (typeof window !== "undefined") {
            sessionStorage.setItem(donorSyncKey, "completed");
          }
        })
        .catch((err) => {
          console.error("Failed to add donor:", err);
        });
    }
  }, []);

  const faqs = [
    { question: t("donate.q1"), answer: t("donate.a1") },
    { question: t("donate.q2"), answer: t("donate.a2") },
    { question: t("donate.q3"), answer: t("donate.a3") },
    { question: t("donate.q4"), answer: t("donate.a4") },
  ];
  const formRef = useRef<HTMLDivElement>(null);
  const donationAmount = Number(amount || customAmount);

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("");
  };

  const scrollToForm = (causeId: string = "kovil") => {
    setSelectedCause(causeId);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDonationPayment = async () => {
    setIsSubmitting(true);
    try {
      // 1. Format values according to QPayIndia specification
      const timestamp = Date.now().toString();
      const orderId = `DON_${timestamp}`.slice(0, 30);

      // Amount: "Amount should not contain any thousand separators or currency symbols"
      const formattedAmount = Number.isInteger(donationAmount)
        ? donationAmount.toString()
        : donationAmount.toFixed(2);
      const base64Amount = btoa(formattedAmount);
      const qpayIdParam = `${QPAY_CONFIG.qpayId}\`${base64Amount}`;

      const cleanName = sanitizeQPayValue(fullname, 50);
      const cleanEmail = sanitizeQPayValue(email, 50);
      const cleanPhone = sanitizeQPayValue(mobile, 20);
      const cleanAddress = sanitizeQPayValue(address, 150);
      const cleanCountry = sanitizeQPayValue(country, 50);
      const transactionType = "PURCHASE";
      const currency = "INR";
      const mode = QPAY_CONFIG.mode;
      const responseUrl = QPAY_CONFIG.responseUrl;
      const qpayPwd = QPAY_CONFIG.qpayPwd;

      // 2. Steps for calculating secure hash:
      // Hashdata = <secret_key provide by QPay> + "|" + <ResponseURL> + "|" + <QPayID> + "|" + <QPayPWD> + "|" + <TransactionType> + "|" + <OrderID> + "|" + <Currency> + "|" + <Mode> + "|" + <name> + "|" + <email> + "|" + <phone>
      // "If there is no value for name, email and phone then empty string can be assigned"
      // Secure_hash = SHA512(Hashdata)
      const hashData = [
        QPAY_CONFIG.secretKey,
        responseUrl,
        qpayIdParam,
        qpayPwd,
        transactionType,
        orderId,
        currency,
        mode,
        cleanName,
        cleanEmail,
        cleanPhone,
      ].join("|");

      const secureHash = await generateSHA512(hashData);

      // 3. Construct form parameters per QPayIndia specification
      const formParams: Record<string, string> = {
        ResponseURL: responseUrl,
        QPayID: qpayIdParam,
        QPayPWD: qpayPwd,
        TransactionType: transactionType,
        OrderID: orderId,
        Currency: currency,
        Mode: mode,
        Paymentoption: mode === "test" ? "C" : "C,N,U",
        secure_hash: secureHash,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
      };

      if (cleanAddress) formParams.address = cleanAddress;
      if (cleanCountry) formParams.country = cleanCountry;

      // Save pending donation details in storage for confirmation UI upon return
      if (typeof window !== "undefined") {
        try {
          const donationRecord = JSON.stringify({
            orderId,
            amount: formattedAmount,
            cause: selectedCause,
            name: cleanName,
            fullname: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            mobile: cleanPhone,
            address: cleanAddress,
            country: cleanCountry,
            pannumber,
            aadhaarnumber,
            passportnumber,
            donortype:
              donortype === "international" ? "international" : "domestic",
            paymentstatus: "pending",
            date: new Date().toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          });
          sessionStorage.setItem("skf_last_donation", donationRecord);
          localStorage.setItem("skf_last_donation", donationRecord);
        } catch {
          // ignore
        }
      }

      console.log("QPay Hashdata:", hashData);
      console.log("Submitting QPay form with params:", formParams);

      // 4. Submit form directly to QPay gateway URL
      const form = document.createElement("form");
      form.method = "POST";
      form.action = QPAY_CONFIG.targetUrl;
      form.style.display = "none";

      Object.entries(formParams).forEach(([key, val]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = val;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      HTMLFormElement.prototype.submit.call(form);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Failed to start QPay payment:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to start donation payment. Please try again.",
      );
    }
  };

  if (isSuccessPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-amber-50/20 to-[#F5F2EB] font-sans text-gray-800 pt-28 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Soft background aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-amber-100 overflow-hidden relative z-10 print:shadow-none print:border-none print:w-full print:p-0"
        >
          {/* Top Brand & Trust Header */}
          <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-orange-500/20">
                SKF
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 tracking-tight leading-none">
                  Sri Kandhaguru Foundation
                </h3>
                <p className="text-[11px] text-amber-700/90 font-medium mt-1">
                  Registered Trust • 80G Tax Exempt
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified
            </span>
          </div>

          {/* Hero Success Badge & Heading */}
          <div className="px-6 sm:px-8 pt-6 pb-5 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25 ring-8 ring-emerald-50"
            >
              <Check className="w-9 h-9 stroke-[3]" />
            </motion.div>

            <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200/80 mb-2">
              Official Donation Receipt
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Donation Successful!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
              Thank you for your sacred contribution. May divine grace and
              auspicious blessings be upon you.
            </p>
          </div>

          {/* Amount Spotlight Card */}
          <div className="px-6 sm:px-8 py-2">
            <div className="rounded-2xl bg-gradient-to-b from-amber-50/70 to-orange-50/40 border border-amber-200/70 p-5 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-900 bg-amber-100/80 mb-2 border border-amber-200/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {successDetails?.cause || "Sacred Offering"}
              </span>

              <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight my-1">
                ₹
                {(() => {
                  const num = Number(successDetails?.amount);
                  return !isNaN(num) && num > 0
                    ? num.toLocaleString("en-IN")
                    : "0";
                })()}
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-white/90 px-3 py-1 rounded-full border border-emerald-100 shadow-2xs mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Payment Confirmed & 80G Tax Deductible</span>
              </div>
            </div>
          </div>

          {/* Itemized Receipt Details */}
          <div className="px-6 sm:px-8 py-5">
            <div className="rounded-2xl bg-gray-50/90 border border-gray-100 p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-gray-700">
              {successDetails?.orderId && (
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-gray-400 font-medium">Order ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-900 text-xs sm:text-sm">
                      {successDetails.orderId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(successDetails.orderId || "")}
                      className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200/70 transition-colors print:hidden cursor-pointer"
                      title="Copy Order ID"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {successDetails?.refId && (
                <div className="flex justify-between items-center py-0.5 border-t border-gray-200/60 pt-2.5">
                  <span className="text-gray-400 font-medium">
                    Gateway Ref (MSP)
                  </span>
                  <span className="font-mono font-medium text-gray-900">
                    {successDetails.refId}
                  </span>
                </div>
              )}

              {successDetails?.donorName && (
                <div className="flex justify-between items-center py-0.5 border-t border-gray-200/60 pt-2.5">
                  <span className="text-gray-400 font-medium">Donor Name</span>
                  <span className="font-bold text-gray-900">
                    {successDetails.donorName}
                  </span>
                </div>
              )}

              {successDetails?.email && (
                <div className="flex justify-between items-center py-0.5 border-t border-gray-200/60 pt-2.5">
                  <span className="text-gray-400 font-medium">Email</span>
                  <span className="font-medium text-gray-800 truncate max-w-[200px]">
                    {successDetails.email}
                  </span>
                </div>
              )}

              {successDetails?.phone && (
                <div className="flex justify-between items-center py-0.5 border-t border-gray-200/60 pt-2.5">
                  <span className="text-gray-400 font-medium">
                    Mobile Number
                  </span>
                  <span className="font-medium text-gray-800">
                    {successDetails.phone}
                  </span>
                </div>
              )}

              {successDetails?.date && (
                <div className="flex justify-between items-center py-0.5 border-t border-gray-200/60 pt-2.5">
                  <span className="text-gray-400 font-medium">Date & Time</span>
                  <span className="text-gray-800 font-medium">
                    {successDetails.date}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-0.5 border-t border-gray-200/60 pt-2.5">
                <span className="text-gray-400 font-medium">Payment Mode</span>
                <span className="font-bold text-gray-900 uppercase">
                  {successDetails?.paymentMode === "C"
                    ? "Card"
                    : successDetails?.paymentMode === "U"
                      ? "UPI"
                      : successDetails?.paymentMode === "N"
                        ? "Net Banking"
                        : successDetails?.paymentMode || "Online"}
                </span>
              </div>

              <div className="flex justify-between items-center py-0.5 border-t border-gray-200/60 pt-2.5">
                <span className="text-gray-400 font-medium">Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Completed
                </span>
              </div>
            </div>

            {/* Note */}
            <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-100 flex items-start gap-2 text-left">
              <FileText className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                An official digital receipt has been dispatched to your email
                address. This serves as formal proof for your voluntary
                contribution.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 sm:px-8 pb-7 pt-1 flex flex-col sm:flex-row gap-3 print:hidden">
            <button
              type="button"
              onClick={() => {
                resetDonationForm();
                window.location.href = "/donate";
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <span>Make Another Donation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans selection:bg-amber-500/20 text-gray-800">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-orange-50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590050762110-8c2cb5792900?q=80&w=2000&auto=format&fit=crop"
            alt="South Indian Temple"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7] via-orange-100/90 to-orange-50/90 z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-700 font-bold text-xs uppercase tracking-widest mb-6 border border-amber-500/30 backdrop-blur-sm"
            >
              <span>{t("donate.sacred_offerings")}</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 mb-6 tracking-tight leading-tight "
            >
              {t("donate.support_sacred")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                {t("donate.generous_donation")}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              {t("donate.hero_desc")}
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                onClick={() => scrollToForm("kovil")}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2.5 cursor-pointer"
              >
                {t("donate.donate_now")} <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Donation Causes Cards */}
      <section className="py-20 relative -mt-16 z-30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cause 1: Temple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-2 shadow-xl shadow-gray-200/50 border border-amber-100 group flex flex-col"
            >
              <div className="h-64 rounded-2xl overflow-hidden relative">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwOFofqD8Q1ctHekCES98N5-u-WGNWdogcosBXqObmTJr4Pl_wQqL-AIu&s=10"
                  alt="Temple Construction"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
                      <Landmark size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {t("donate.temple_title")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  {t("donate.temple_desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    {t("donate.temple_const")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    {t("donate.temple_renov")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    {t("donate.preservation")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    {t("donate.spiritual_service")}
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("kovil")}
                  className="w-full py-4 rounded-xl bg-amber-50 text-amber-700 font-bold hover:bg-amber-500 hover:text-white transition-colors border border-amber-200 hover:border-transparent"
                >
                  {t("donate.donate_temple")}
                </button>
              </div>
            </motion.div>

            {/* Cause 2: Annadhanam */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-2 shadow-xl shadow-gray-200/50 border border-green-100 group flex flex-col"
            >
              <div className="h-64 rounded-2xl overflow-hidden relative">
                <img
                  src="https://static.tildacdn.one/tild3439-6231-4462-b566-363337303932/IMG_4675.JPG"
                  alt="Annadhanam"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shrink-0">
                      <Utensils size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {t("donate.anna_title")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  {t("donate.anna_desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" />{" "}
                    {t("donate.feed_devotees")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" />{" "}
                    {t("donate.serve_humanity")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" />{" "}
                    {t("donate.daily_anna")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" />{" "}
                    {t("donate.sacred_charity")}
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("annadhanam")}
                  className="w-full py-4 rounded-xl bg-green-50 text-green-700 font-bold hover:bg-green-600 hover:text-white transition-colors border border-green-200 hover:border-transparent cursor-pointer"
                >
                  {t("donate.donate_food")}
                </button>
              </div>
            </motion.div>

            {/* Cause 3: Ghosala */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-2 shadow-xl shadow-gray-200/50 border border-amber-100 group flex flex-col"
            >
              <div className="h-64 rounded-2xl overflow-hidden relative">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCWkWZ3yWTNtcvsnrSbwetbYrXzCss0wPLUekjDLjZgRdSOlaxShjjfKC&s=10"
                  alt="Ghosala Seva"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-700 rounded-xl flex items-center justify-center text-white shrink-0">
                      <Leaf size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {t("donate.ghosala_title")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  {t("donate.ghosala_desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-700" />{" "}
                    {t("donate.cow_protection")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-700" />{" "}
                    {t("donate.daily_fodder")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-700" />{" "}
                    {t("donate.veterinary_care")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-700" />{" "}
                    {t("donate.sacred_goseva")}
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("ghosala")}
                  className="w-full py-4 rounded-xl bg-amber-50 text-amber-800 font-bold hover:bg-amber-700 hover:text-white transition-colors border border-amber-200 hover:border-transparent cursor-pointer"
                >
                  {t("donate.donate_ghosala")}
                </button>
              </div>
            </motion.div>

            {/* Cause 4: Pooja */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-2 shadow-xl shadow-gray-200/50 border border-rose-100 group flex flex-col"
            >
              <div className="h-64 rounded-2xl overflow-hidden relative">
                <img
                  src="https://m.media-amazon.com/images/I/71i-D7OFdJL._AC_UF894,1000_QL80_.jpg"
                  alt="Pooja Seva"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center text-white shrink-0">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {t("donate.pooja_title")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  {t("donate.pooja_desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-rose-600" />{" "}
                    {t("donate.daily_pooja")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-rose-600" />{" "}
                    {t("donate.archana_seva")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-rose-600" />{" "}
                    {t("donate.homam_rituals")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-rose-600" />{" "}
                    {t("donate.divine_blessings")}
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("pooja")}
                  className="w-full py-4 rounded-xl bg-rose-50 text-rose-700 font-bold hover:bg-rose-600 hover:text-white transition-colors border border-rose-200 hover:border-transparent cursor-pointer"
                >
                  {t("donate.donate_pooja")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Main Form Section */}
      <section
        ref={formRef}
        className="relative overflow-hidden py-24 bg-[#F7F7F5]"
      >
        {/* Background accents */}
        <div className="absolute -top-24 left-0 h-96 w-96 rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-[1rem] border border-white/70 bg-white/80 shadow-[0_24px_90px_-20px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
          >
            <div className="grid lg:grid-cols-[0.95fr_1.45fr]">
              {/* Left panel */}
              <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-10 md:px-12 md:py-14 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                    <Heart
                      size={26}
                      className="text-amber-300 fill-amber-300/20"
                    />
                  </div>

                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                    {t("donate.secure_donation")}
                  </span>

                  <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
                    {t("donate.support_mission")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500">
                      {t("donate.sacred_mission")}
                    </span>
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-300 md:text-base">
                    {t("donate.mission_desc")}
                  </p>

                  <div className="mt-10 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {t("donate.step_1")}
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {t("donate.choose_cause")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {t("donate.step_2")}
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {t("donate.enter_donor")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {t("donate.step_3")}
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {t("donate.confirm_amt")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 rounded-2xl border border-amber-300/15 bg-amber-300/10 px-5 py-5">
                    <p className="text-sm leading-7 text-amber-100">
                      {t("donate.large_donation_note")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="px-6 py-8 sm:px-8 md:px-10 md:py-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {t("donate.donation_form")}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {t("donate.form_desc")}
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Cause */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <label className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {t("donate.cause_selection")}
                    </label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCause("kovil")}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 cursor-pointer ${selectedCause === "kovil"
                          ? "border-amber-500 bg-amber-50/40 shadow-[0_10px_30px_-15px_rgba(245,158,11,0.35)] ring-2 ring-amber-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                          }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selectedCause === "kovil"
                            ? "border-amber-600"
                            : "border-slate-300"
                            }`}
                        >
                          {selectedCause === "kovil" && (
                            <motion.div
                              layoutId="cause-dot"
                              className="h-2.5 w-2.5 rounded-full bg-amber-600"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-amber-600" />
                            <p className="font-semibold text-slate-900">
                              {t("donate.kovil_kattada")}
                            </p>
                          </div>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {t("donate.temple_support")}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedCause("annadhanam")}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 cursor-pointer ${selectedCause === "annadhanam"
                          ? "border-emerald-500 bg-emerald-50/40 shadow-[0_10px_30px_-15px_rgba(16,185,129,0.35)] ring-2 ring-emerald-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                          }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selectedCause === "annadhanam"
                            ? "border-emerald-600"
                            : "border-slate-300"
                            }`}
                        >
                          {selectedCause === "annadhanam" && (
                            <motion.div
                              layoutId="cause-dot"
                              className="h-2.5 w-2.5 rounded-full bg-emerald-600"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-emerald-600" />
                            <p className="font-semibold text-slate-900">
                              {t("donate.anna_title")}
                            </p>
                          </div>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {t("donate.food_support")}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedCause("ghosala")}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 cursor-pointer ${selectedCause === "ghosala"
                          ? "border-amber-600 bg-amber-50/40 shadow-[0_10px_30px_-15px_rgba(217,119,6,0.35)] ring-2 ring-amber-600/20"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                          }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selectedCause === "ghosala"
                            ? "border-amber-700"
                            : "border-slate-300"
                            }`}
                        >
                          {selectedCause === "ghosala" && (
                            <motion.div
                              layoutId="cause-dot"
                              className="h-2.5 w-2.5 rounded-full bg-amber-700"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-amber-700" />
                            <p className="font-semibold text-slate-900">
                              {t("donate.ghosala_title")}
                            </p>
                          </div>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {t("donate.ghosala_support")}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedCause("pooja")}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 cursor-pointer ${selectedCause === "pooja"
                          ? "border-rose-500 bg-rose-50/40 shadow-[0_10px_30px_-15px_rgba(244,63,94,0.35)] ring-2 ring-rose-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                          }`}
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selectedCause === "pooja"
                            ? "border-rose-600"
                            : "border-slate-300"
                            }`}
                        >
                          {selectedCause === "pooja" && (
                            <motion.div
                              layoutId="cause-dot"
                              className="h-2.5 w-2.5 rounded-full bg-rose-600"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-rose-600" />
                            <p className="font-semibold text-slate-900">
                              {t("donate.pooja_title")}
                            </p>
                          </div>
                          <p className="text-sm text-slate-500 mt-0.5">
                            {t("donate.pooja_support")}
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Donor details */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        {t("donate.donor_details")}
                      </label>
                      <select
                        value={donortype}
                        onChange={(e) => setDonortype(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      >
                        <option value="domestic">
                          {t("donate.domestic_citizen")}
                        </option>
                        <option value="international">
                          {t("donate.intl_citizen")}
                        </option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <input
                        type="text"
                        placeholder={t("donate.full_name")}
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                      <input
                        type="tel"
                        placeholder={t("donate.mobile_number")}
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                      <input
                        type="email"
                        placeholder={t("donate.email_address")}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="md:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                      <input
                        type="text"
                        placeholder={t("donate.country")}
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />

                      {donortype === "domestic" ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
                          <input
                            type="text"
                            placeholder={t("donate.pan_number")}
                            value={pannumber}
                            maxLength={10}
                            onChange={(e) =>
                              setPannumber(
                                e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, ""),
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 uppercase outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                          />
                          <input
                            type="text"
                            placeholder={t("donate.aadhaar_number")}
                            value={aadhaarnumber}
                            maxLength={12}
                            onChange={(e) =>
                              setAadhaarnumber(
                                e.target.value.replace(/[^0-9]/g, ""),
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder={t("donate.passport_number")}
                          value={passportnumber}
                          onChange={(e) => setPassportnumber(e.target.value)}
                          className="md:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 uppercase outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                        />
                      )}

                      <textarea
                        placeholder={t("donate.full_address")}
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="md:col-span-2 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <label className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {t("donate.donation_amount")}
                    </label>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handleAmountClick(amt)}
                          className={`rounded-xl border py-3 px-2 text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${amount === amt
                            ? "border-amber-500 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/30 scale-[1.02]"
                            : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50/50"
                            }`}
                        >
                          ₹{amt.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder={t("donate.enter_custom")}
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-center text-sm font-semibold text-red-600 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <X className="w-4 h-4 shrink-0 rounded-full bg-red-100 p-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => {
                      setError("");
                      if (
                        !fullname ||
                        !mobile ||
                        !email ||
                        !country ||
                        (!amount && !customAmount)
                      ) {
                        setError(
                          "Please fill all required fields and select an amount.",
                        );
                        return;
                      }
                      if (
                        donortype === "domestic" &&
                        !pannumber &&
                        !aadhaarnumber
                      ) {
                        setError(
                          "Please provide either PAN or Aadhaar number for domestic donation.",
                        );
                        return;
                      }
                      if (donortype === "international" && !passportnumber) {
                        setError(
                          "Please provide Passport number for international donation.",
                        );
                        return;
                      }

                      const donationAmount = amount || Number(customAmount);
                      if (donationAmount > 200000) {
                        setShowContactDialog(true);
                        return;
                      }

                      void handleDonationPayment();
                    }}
                    disabled={isSubmitting}
                    className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_16px_40px_-14px_rgba(245,158,11,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-12px_rgba(245,158,11,0.7)] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>{t("donate.submitting")}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={22} />
                        <span>
                          {t("donate.donate_securely")}{" "}
                          {amount || customAmount
                            ? `| ₹${Number(amount || customAmount).toLocaleString("en-IN")}`
                            : ""}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Trust Badges */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      256-Bit SSL Encrypted
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      80G Tax Exemption
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-500" />
                      100% Secure Gateway
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Donate & Progress Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {t("donate.why_support")}
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                title: t("donate.support_temple"),
                icon: Landmark,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                title: t("donate.feed_needy"),
                icon: Utensils,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                title: t("donate.preserve_heritage"),
                icon: BookOpen,
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                title: t("donate.part_divine"),
                icon: Heart,
                color: "text-rose-600",
                bg: "bg-rose-50",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200/60">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: ShieldCheck,
                title: t("donate.secure_payments"),
                desc: t("donate.ssl_enc"),
                color: "text-emerald-600",
                bg: "bg-emerald-100/50",
              },
              {
                icon: Globe2,
                title: t("donate.trans_usage"),
                desc: t("donate.funds_go"),
                color: "text-blue-600",
                bg: "bg-blue-100/50",
              },
              {
                icon: Heart,
                title: t("donate.trusted_ngo"),
                desc: `${t("donate.registered_ngo")} - 6/2022`,
                color: "text-rose-600",
                bg: "bg-rose-100/50",
              },
              {
                icon: Building2,
                title: t("donate.tax_benefit"),
                desc: t("donate.valid_tax"),
                color: "text-amber-600",
                bg: "bg-amber-100/50",
              },
            ].map((trust, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center ${trust.bg} ${trust.color} group-hover:scale-110 transition-transform`}
                >
                  <trust.icon size={26} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    {trust.title}
                  </h4>
                  <p className="text-gray-500 text-sm font-medium">
                    {trust.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#FFFDF7]">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              {t("donate.faq")}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600 leading-relaxed font-medium"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Dialog Overlay */}
      <AnimatePresence>
        {showContactDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center"
            >
              <button
                onClick={() => setShowContactDialog(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                {t("donate.large_req")}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                {t("donate.large_req_desc")}
              </p>
              <a
                href="tel:+919842023346"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                {t("donate.call")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
