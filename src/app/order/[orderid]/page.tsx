"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Calendar,
  Loader2,
  CheckCircle2,
  Clock,
  ClipboardList,
  Check,
  Truck,
  X,
} from "lucide-react";
import { getOrderDetail, IMAGEBASEURL } from "../../../services/api";
import { OrderDetailResponseModel } from "../../../models/OrderModel";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderid = parseInt(params.orderid as string);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<OrderDetailResponseModel | null>(null);

  useEffect(() => {
    if (orderid) {
      fetchOrderDetails();
    }
  }, [orderid]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetail({ orderid });
      if (res.success && res.data) {
        setData(new OrderDetailResponseModel(res.data));
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="pt-32 pb-20 bg-[#FAFAF9] min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[var(--color-deepgreen)] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading order details...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="pt-32 pb-20 bg-[#FAFAF9] min-h-screen flex flex-col items-center justify-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          We couldn't find the details for this order.
        </p>
        <button
          onClick={() => router.push("/my-account")}
          className="bg-[var(--color-deepgreen)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--color-deepgreen)]/90 transition-all cursor-pointer"
        >
          Back to My Account
        </button>
      </main>
    );
  }

  const { order, address, items } = data;

  return (
    <main className="pt-28 pb-20 bg-[#FAFAF9] min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-[var(--color-deepgreen)] transition-colors mb-6 font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (Items & Timeline) */}
          <div className="flex-grow space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    Order Id : {order.id}
                  </h1>
                  <p className="text-gray-500 flex items-center gap-2 mt-2 font-medium">
                    <Calendar className="w-4 h-4" />
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 font-bold text-sm rounded-[0px] uppercase tracking-widest text-center ${
                    order.orderstatus.toLowerCase() === "pending"
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : order.orderstatus.toLowerCase() === "confirmed"
                        ? "bg-sky-100 text-sky-700 border border-sky-200"
                        : order.orderstatus.toLowerCase() === "packed"
                          ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                          : order.orderstatus.toLowerCase() === "shipped"
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : order.orderstatus.toLowerCase() === "delivered"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : order.orderstatus.toLowerCase() === "cancelled"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  {order.orderstatus}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[var(--color-deepgreen)]" />
                  Order Items
                </h3>
                <div className="flex flex-col gap-6">
                  {items.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 sm:gap-6 bg-gray-50/50 p-4 rounded-xl border border-gray-50"
                    >
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl overflow-hidden border border-gray-100 shrink-0">
                        <img
                          src={IMAGEBASEURL + item.productimage}
                          alt={item.productname}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-grow">
                        <h4 className="font-bold text-gray-900 text-lg leading-snug">
                          {item.productname}
                        </h4>
                        <div className="mt-2 text-gray-500 font-medium">
                          Qty: {item.quantity}
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-xl font-black text-[var(--color-deepgreen)]">
                            ₹
                            {(item.sellingprice || item.price).toLocaleString()}
                          </span>
                          {item.sellingprice && (
                            <span className="text-sm font-bold text-gray-400 line-through">
                              ₹{item.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="hidden sm:flex flex-col justify-center items-end ml-auto">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">
                          Total
                        </p>
                        <p className="text-xl font-black text-gray-900">
                          ₹{item.totalprice.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-8 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[var(--color-deepgreen)]" />
                  Order Timeline
                </h3>
                <div className="px-2 md:px-8 py-2">
                  {order.orderstatus.toLowerCase() === "cancelled" ? (
                    <div className="flex items-center gap-3 text-red-600 font-bold bg-red-50 p-4 rounded-xl border border-red-200">
                      <X className="w-6 h-6" />
                      This order has been cancelled.
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row justify-between relative">
                      {/* Connecting line (Desktop) */}
                      <div className="hidden md:block absolute top-5 left-6 right-6 h-1 bg-gray-100 rounded-full z-0">
                        <div
                          className="h-full bg-[var(--color-deepgreen)] rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.max(
                              0,
                              ([
                                "pending",
                                "confirmed",
                                "packed",
                                "shipped",
                                "delivered",
                              ].indexOf(order.orderstatus.toLowerCase()) /
                                4) *
                                100,
                            )}%`,
                          }}
                        ></div>
                      </div>

                      {[
                        "pending",
                        "confirmed",
                        "packed",
                        "shipped",
                        "delivered",
                      ].map((step, index) => {
                        const currentIdx = [
                          "pending",
                          "confirmed",
                          "packed",
                          "shipped",
                          "delivered",
                        ].indexOf(order.orderstatus.toLowerCase());
                        const isCompleted = index <= currentIdx;
                        const isCurrent = index === currentIdx;

                        let Icon = Check;
                        if (step === "pending") Icon = ClipboardList;
                        if (step === "confirmed") Icon = CheckCircle2;
                        if (step === "packed") Icon = Package;
                        if (step === "shipped") Icon = Truck;
                        if (step === "delivered") Icon = MapPin;

                        return (
                          <div
                            key={step}
                            className="flex flex-row md:flex-col items-center gap-4 md:gap-3 relative z-10 mb-8 md:mb-0"
                          >
                            {/* Mobile vertical line */}
                            {index !== 4 && (
                              <div className="md:hidden absolute left-5 top-10 bottom-[-32px] w-1 bg-gray-100 z-0">
                                {isCompleted && index < currentIdx && (
                                  <div className="w-full h-full bg-[var(--color-deepgreen)]"></div>
                                )}
                              </div>
                            )}

                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                                isCompleted
                                  ? "bg-[var(--color-deepgreen)] border-white shadow-[0_0_0_2px_var(--color-deepgreen)] text-white"
                                  : "bg-white border-gray-200 text-gray-300"
                              } transition-colors duration-300 z-10`}
                            >
                              <Icon className={`w-5 h-5`} />
                            </div>
                            <div className="md:text-center mt-0 md:mt-2">
                              <p
                                className={`text-sm font-bold capitalize ${isCurrent ? "text-[var(--color-deepgreen)]" : isCompleted ? "text-gray-800" : "text-gray-400"}`}
                              >
                                {step}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Address, Payment Info) */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--color-deepgreen)]" />
                Shipping Address
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <span className="bg-[var(--color-deepgreen)]/10 text-[var(--color-deepgreen)] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-2 inline-block">
                  {address.place}
                </span>
                <p className="font-bold text-gray-900">{address.contactname}</p>
                <p className="text-sm text-gray-600 mb-3">
                  {address.contactnumber}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {address.address}
                  <br />
                  {address.city}, {address.district}
                  <br />
                  {address.state}, {address.pincode}
                  <br />
                  {address.country}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--color-deepgreen)]" />
                Payment Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹{order.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Shipping Fee</span>
                  {order.shippingcost !== 0 && order.shippingcost !== null ? (
                    <span className="font-medium text-gray-900">
                      ₹{order.shippingcost}
                    </span>
                  ) : (
                    "Free"
                  )}
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-black text-[var(--color-deepgreen)]">
                    ₹{order.totalamount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                    Status
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-blue-700">
                    {order.paymentstatus.toLowerCase() === "pending" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span className="capitalize">{order.paymentstatus}</span>
                  </div>
                </div>
                {order.screenshot && (
                  <div className="mt-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Screenshot
                    </p>
                    <a
                      href={IMAGEBASEURL + order.screenshot}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full h-50 rounded-lg overflow-hidden border border-gray-200 hover:border-[var(--color-deepgreen)] transition-colors cursor-pointer group relative"
                    >
                      <img
                        src={IMAGEBASEURL + order.screenshot}
                        alt="Payment"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                          View
                        </span>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
