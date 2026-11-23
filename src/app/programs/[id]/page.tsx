"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Tag,
  CreditCard,
  X,
  Send,
  ClipboardList,
  Info,
  Loader2,
  Sparkles,
  Check,
  Armchair,
  Eye,
} from "lucide-react";
import {
  getEventDetails,
  getImageVideoUrl,
  addBooking,
  verifyBookingPayment,
} from "../../../services/api";
import { EventDetailData } from "../../../models/event_model";
import { useForm, useFieldArray } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().min(1, { message: "Age is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  whatsapp: z
    .string()
    .min(10, { message: "Valid WhatsApp number is required" }),
  gender: z.string().optional(),
  occupation: z.string().optional(),
  district: z.string().min(2, { message: "District is required" }),
  state: z.string().min(2, { message: "State is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  participants: z.string().min(1, { message: "Required" }),
  adultcount: z.string().min(1, { message: "Required" }),
  childrencount: z.string().min(1, { message: "Required" }),
  remarks: z.string().optional(),
  ishealthissue: z.boolean().default(false),
  healthissues: z
    .array(
      z.object({
        name: z.string().optional(),
        issue: z.string().optional(),
      }),
    )
    .optional(),
  bookingdate: z.string().optional(),
  bookingtime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayPaymentResponse) => Promise<void>;
};

const getMapEmbedUrl = (link: string) => {
  if (!link) return "";
  if (link.includes("?q=")) {
    const query = link.split("?q=")[1];
    return `https://maps.google.com/maps?q=${query}&hl=en&z=14&output=embed`;
  }
  return link;
};

export default function ProgramDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { isLoggedIn, openLogin } = useAuth();
  const { t } = useLanguage();
  const [program, setProgram] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      participants: "1",
      adultcount: "1",
      childrencount: "0",
      ishealthissue: false,
      healthissues: [{ name: "", issue: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "healthissues",
  });

  const isHealthIssue = watch("ishealthissue");
  const bookingdateValue = watch("bookingdate");
  const isOnline = program?.deliverymode?.toLowerCase() === "online";
  const isLevel2 = program?.leveltype?.toLowerCase() === "level2";
  const isLevel1Or2 =
    program?.leveltype?.toLowerCase() === "level1" ||
    program?.leveltype?.toLowerCase() === "level2" ||
    program?.leveltype?.toLowerCase() === "level 1" ||
    program?.leveltype?.toLowerCase() === "level 2" ||
    program?.leveltype === "1" ||
    program?.leveltype === "2";

  const hasValidEventToDate = (() => {
    if (!program?.eventtodate) return false;
    const str = String(program.eventtodate).trim();
    if (str === "" || str === "null" || str === "undefined") return false;
    return !isNaN(new Date(str).getTime());
  })();
  const [selectedPriceType, setSelectedPriceType] = useState<
    "platinum" | "gold" | "silver"
  >("platinum");
  const [showSeatPlanModal, setShowSeatPlanModal] = useState(false);

  useEffect(() => {
    if (isLevel2 && program) {
      if (program.platinumprice) {
        setSelectedPriceType("platinum");
      } else if (program.goldprice) {
        setSelectedPriceType("gold");
      } else if (program.silverprice) {
        setSelectedPriceType("silver");
      }
    }
  }, [program, isLevel2]);

  const participantsCount = isOnline ? "1" : watch("participants") || "1";

  const isOfferActive = (() => {
    if (!program?.lastofferdate) return false;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`;

    const offerDateStr = program.lastofferdate.includes("T")
      ? program.lastofferdate.split("T")[0]
      : program.lastofferdate;

    return todayStr < offerDateStr;
  })();

  const getTierPrice = (tier: "platinum" | "gold" | "silver") => {
    if (!program) return 0;
    const rawPrice =
      tier === "platinum"
        ? Number(program.platinumprice || 0)
        : tier === "gold"
          ? Number(program.goldprice || 0)
          : Number(program.silverprice || 0);

    if (rawPrice <= 0) return 0;

    if (isOfferActive) {
      const discount = tier === "platinum" ? 1500 : tier === "gold" ? 1000 : 500;
      return Math.max(0, rawPrice - discount);
    }
    return rawPrice;
  };

  const getUnitPrice = () => {
    if (!program) return 0;
    if (isLevel2) {
      if (selectedPriceType === "platinum" && program.platinumprice) {
        return getTierPrice("platinum");
      }
      if (selectedPriceType === "gold" && program.goldprice) {
        return getTierPrice("gold");
      }
      if (selectedPriceType === "silver" && program.silverprice) {
        return getTierPrice("silver");
      }
      return (
        getTierPrice("platinum") ||
        getTierPrice("gold") ||
        getTierPrice("silver") ||
        Number(program.registrationfee || 0)
      );
    }
    return Number(program.registrationfee || 0);
  };

  const currentUnitPrice = getUnitPrice();
  const baseAmount = currentUnitPrice * Number(participantsCount);
  const gstAmount = Number((baseAmount * 0.18).toFixed(2));
  const totalAmount = Number((baseAmount + gstAmount).toFixed(2));
  const amount = totalAmount;

  const loadRazorpay = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const onSubmit = async (data: FormValues) => {
    if (isOnline && (!data.bookingdate || !data.bookingtime)) {
      setToastMessage("Booking date and time are required for online programs.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    const payload = {
      eventid: Number(id),
      fullname: data.name,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      occupation: data.occupation || "",
      gender: data.gender || "Male",
      age: Number(data.age),
      city: data.district,
      state: data.state,
      country: data.country,
      participants: isOnline ? 1 : Number(data.participants),
      adultcount: isOnline ? 1 : Number(data.adultcount),
      childrencount: isOnline ? 0 : Number(data.childrencount),
      ishealthissue: data.ishealthissue,
      healthissues: data.ishealthissue ? (data.healthissues ?? []) : [],
      totalamount: totalAmount,
      sendtotalamount: totalAmount,
      baseamount: baseAmount,
      gstamount: gstAmount,
      ...(isLevel2 ? { pricetype: selectedPriceType } : {}),
      ...(isOnline && data.bookingdate && data.bookingtime
        ? {
          bookingdate: data.bookingdate,
          bookingtime: data.bookingtime,
        }
        : {}),
    };

    setIsSubmitting(true);
    try {
      const bookingRes = await addBooking(payload);
      if (!bookingRes.success) {
        throw new Error(bookingRes.message || "Booking failed");
      }
      const newBookingId = bookingRes.data?.bookingid;
      if (!newBookingId) {
        throw new Error("No booking ID received from server.");
      }
      const newRazorpayOrderId = bookingRes.data?.razorpay_order_id;
      if (!newRazorpayOrderId) {
        throw new Error("No Razorpay order ID received from server.");
      }

      const res = await loadRazorpay();
      if (!res) {
        setToastMessage("Razorpay SDK failed to load. Are you online?");
        setTimeout(() => setToastMessage(null), 3000);
        return;
      }

      const options: RazorpayOptions = {
        key: "rzp_test_U1bWPxyRyZr7Fb",
        order_id: newRazorpayOrderId,
        amount: Math.round(totalAmount * 100), // Amount in paise (including 18% GST)
        currency: "INR",
        name: "Sri KandhaGuru Foundation",
        description: "Event Booking",
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#f59e0b",
        },
        handler: async (response) => {
          try {
            setIsSubmitting(true);
            const verification = await verifyBookingPayment({
              bookingid: newBookingId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!verification.success) {
              throw new Error(
                verification.message || "Payment verification failed.",
              );
            }

            setIsSuccess(true);
            reset();
            setTimeout(() => {
              setIsSuccess(false);
              setIsDialogOpen(false);
            }, 3000);
          } catch (error) {
            console.error(error);
            setToastMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Please contact support.",
            );
            setTimeout(() => setToastMessage(null), 3000);
          } finally {
            setIsSubmitting(false);
          }
        },
      };

      const RazorpayConstructor = (
        window as Window & {
          Razorpay?: new (
            options: RazorpayOptions,
          ) => {
            on: (event: "payment.failed", handler: () => void) => void;
            open: () => void;
          };
        }
      ).Razorpay;
      if (!RazorpayConstructor) {
        throw new Error("Razorpay SDK is unavailable. Please try again.");
      }

      const razorpay = new RazorpayConstructor(options);
      razorpay.on("payment.failed", () => {
        setToastMessage("Payment Failed. Please try again.");
        setTimeout(() => setToastMessage(null), 3000);
      });
      razorpay.open();
    } catch (error) {
      console.error(error);
      setToastMessage(
        error instanceof Error
          ? error.message
          : "An error occurred during booking. Please try again.",
      );
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getEventDetails(Number(id));
        setProgram(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col justify-center items-center text-brand-primary font-medium bg-brand-primary/5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full mb-4"
        ></motion.div>
        <p className="animate-pulse">{t("program_details.loading")}</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {t("program_details.not_found")}
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {t("program_details.not_found_desc")}
        </p>
        <Link
          href="/programs"
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all font-semibold transform hover:-translate-y-1"
        >
          {t("program_details.return_btn")}
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#FAFAF9] min-h-screen pt-20 pb-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-full min-h-[60vh] md:min-h-[75vh] relative overflow-hidden flex items-end pb-24 md:pb-32 bg-[#0a0a0a]">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 bg-center bg-no-repeat bg-contain bg-orange-100"
          style={{
            backgroundImage: `url('${getImageVideoUrl(program.image)}')`,
          }}
        />

        {/* Cinematic Gradients & Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/20 to-transparent z-10 md:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255, 255, 255, 0.05)_0%,transparent_70%)] pointer-events-none"></div>

        {/* Content Container */}
        <div className="container mx-auto px-4 max-w-6xl relative z-10 w-full mb-12 md:mb-0">
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="max-w-4xl"
            >
              {/* Top Meta Area */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Link
                  href="/programs"
                  className="text-white/70 hover:text-white transition-colors text-sm font-medium flex items-center gap-1 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
                  {t("program_details.return_btn")}
                </Link>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black  font-semibold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-6">
                {program.title}
              </h1>

              {/* Quick Info Bar */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm md:text-base font-medium">
                {program.eventdate && (
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    {new Date(program.eventdate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
                {(program.city || program.state) && (
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    {program.city
                      ? `${program.city}, ${program.state}`
                      : program.state}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-6xl mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full -z-10 blur-2xl"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {t("program_details.about_event")}
                </h2>
              </div>

              <div className="prose prose-lg text-gray-600 font-light leading-relaxed max-w-none">
                <p>{program.description}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  {t("program_details.key_info")}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <Tag className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                    {t("program_details.category")}
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {program.category}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <CreditCard className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                    {isLevel2
                      ? t("program_details.tier_packages")
                      : t("program_details.registration")}
                  </h4>
                  {isLevel2 &&
                    (program.platinumprice ||
                      program.goldprice ||
                      program.silverprice) ? (
                    <div className="space-y-1.5 mt-1">
                      {program.platinumprice && (
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-purple-700">
                            {t("program_details.platinum_tier")}:
                          </span>
                          <span className="font-bold text-gray-900 flex items-center gap-1.5">
                            {isOfferActive && (
                              <span className="line-through text-gray-400 text-[10px]">
                                ₹{program.platinumprice}
                              </span>
                            )}
                            <span>₹{getTierPrice("platinum")}</span>
                          </span>
                        </div>
                      )}
                      {program.goldprice && (
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-amber-700">
                            {t("program_details.gold_tier")}:
                          </span>
                          <span className="font-bold text-gray-900 flex items-center gap-1.5">
                            {isOfferActive && (
                              <span className="line-through text-gray-400 text-[10px]">
                                ₹{program.goldprice}
                              </span>
                            )}
                            <span>₹{getTierPrice("gold")}</span>
                          </span>
                        </div>
                      )}
                      {program.silverprice && (
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-700">
                            {t("program_details.silver_tier")}:
                          </span>
                          <span className="font-bold text-gray-900 flex items-center gap-1.5">
                            {isOfferActive && (
                              <span className="line-through text-gray-400 text-[10px]">
                                ₹{program.silverprice}
                              </span>
                            )}
                            <span>₹{getTierPrice("silver")}</span>
                          </span>
                        </div>
                      )}
                      {program.lastofferdate && (
                        <p className={`text-[10px] font-semibold pt-1 ${isOfferActive ? "text-red-600" : "text-gray-500"}`}>
                          {isOfferActive
                            ? `${t("program_details.offer_ends")}: ${new Date(program.lastofferdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                            : `${t("program_details.standard_pricing")}: ${new Date(program.lastofferdate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{program.registrationfee}
                    </p>
                  )}
                </div>

                {program.participants !== null &&
                  program.participants !== undefined ? (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <Users className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                    <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                      Capacity
                    </h4>
                    <p className="text-lg font-semibold text-gray-900">
                      {program.participants} Max
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <Info className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                    <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                      {t("program_details.program_type")}
                    </h4>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {program.programtype || t("program_details.general")}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {isLevel2 &&
              Boolean(
                program.platinumprice ||
                program.goldprice ||
                program.silverprice,
              ) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.51 }}
                  className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                          {t("program_details.select_package")} <span className="text-brand-primary">*</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {t("program_details.select_package_desc")}
                        </p>
                      </div>
                    </div>

                    {program.lastofferdate && (
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs self-start sm:self-auto ${isOfferActive
                        ? "text-red-600 bg-red-50 border border-red-200/80"
                        : "text-gray-600 bg-gray-100 border border-gray-200"
                        }`}>
                        <span>
                          {isOfferActive
                            ? `${t("program_details.limited_offer")}: ${t("program_details.offer_ends")}: ${new Date(program.lastofferdate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}`
                            : `${t("program_details.standard_pricing")}: ${new Date(program.lastofferdate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {program.platinumprice && (
                      <div
                        onClick={() => setSelectedPriceType("platinum")}
                        className={`relative rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ${selectedPriceType === "platinum"
                          ? "border-purple-600 bg-gradient-to-b from-purple-50/90 to-white shadow-lg shadow-purple-500/10 ring-2 ring-purple-400/50 -translate-y-1"
                          : "border-gray-200/80 bg-white hover:border-purple-300 hover:shadow-md"
                          }`}
                      >
                        {selectedPriceType === "platinum" && (
                          <div className="absolute -top-3 right-4 whitespace-nowrap bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-10">
                            <Check className="w-3 h-3 stroke-[3] shrink-0" /> {t("program_details.selected_package")}
                          </div>
                        )}
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center justify-between min-h-[36px] mb-3">
                            <span className="text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 whitespace-nowrap">
                              {t("program_details.platinum_tier")}
                            </span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selectedPriceType === "platinum"
                              ? "border-purple-600 bg-purple-600 text-white"
                              : "border-gray-300 bg-white"
                              }`}>
                              {selectedPriceType === "platinum" && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>

                          <div className="my-3">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-3xl font-black text-gray-900 tracking-tight">
                                ₹{getTierPrice("platinum").toLocaleString("en-IN")}
                              </span>
                              {isOfferActive && (
                                <>
                                  <span className="text-sm font-semibold text-gray-400 line-through">
                                    ₹{Number(program.platinumprice).toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">
                                    {t("program_details.save")} ₹1,500
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="mt-1.5 min-h-[20px] flex items-center">
                              <span className="text-xs text-gray-500 font-medium leading-tight">
                                {t("program_details.base_fee_per_person")}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-purple-100/70 text-xs text-gray-600 space-y-1.5 mt-auto">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">{t("program_details.gst_18")}</span>
                              <span className="font-semibold text-gray-800 shrink-0">
                                +₹{(getTierPrice("platinum") * 0.18).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-purple-900 pt-1.5 border-t border-purple-100/40 min-h-[32px]">
                              <span className="leading-snug">{t("program_details.total_payable")}</span>
                              <span className="font-black shrink-0 ml-2">
                                ₹{(getTierPrice("platinum") * 1.18).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPriceType("platinum");
                          }}
                          className={`mt-5 w-full min-h-[42px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center text-center leading-tight ${selectedPriceType === "platinum"
                            ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                            : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                            }`}
                        >
                          {selectedPriceType === "platinum" ? t("program_details.selected_package") : t("program_details.select_platinum")}
                        </button>
                      </div>
                    )}

                    {program.goldprice && (
                      <div
                        onClick={() => setSelectedPriceType("gold")}
                        className={`relative rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ${selectedPriceType === "gold"
                          ? "border-amber-500 bg-gradient-to-b from-amber-50/90 to-white shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/50 -translate-y-1"
                          : "border-gray-200/80 bg-white hover:border-amber-300 hover:shadow-md"
                          }`}
                      >
                        {selectedPriceType === "gold" && (
                          <div className="absolute -top-3 right-4 whitespace-nowrap bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-10">
                            <Check className="w-3 h-3 stroke-[3] shrink-0" /> {t("program_details.selected_package")}
                          </div>
                        )}
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center justify-between min-h-[36px] mb-3">
                            <span className="text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 whitespace-nowrap">
                              {t("program_details.gold_tier")}
                            </span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selectedPriceType === "gold"
                              ? "border-amber-500 bg-amber-500 text-white"
                              : "border-gray-300 bg-white"
                              }`}>
                              {selectedPriceType === "gold" && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>

                          <div className="my-3">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-3xl font-black text-gray-900 tracking-tight">
                                ₹{getTierPrice("gold").toLocaleString("en-IN")}
                              </span>
                              {isOfferActive && (
                                <>
                                  <span className="text-sm font-semibold text-gray-400 line-through">
                                    ₹{Number(program.goldprice).toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">
                                    {t("program_details.save")} ₹1,000
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="mt-1.5 min-h-[20px] flex items-center">
                              <span className="text-xs text-gray-500 font-medium leading-tight">
                                {t("program_details.base_fee_per_person")}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-amber-100/70 text-xs text-gray-600 space-y-1.5 mt-auto">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">{t("program_details.gst_18")}</span>
                              <span className="font-semibold text-gray-800 shrink-0">
                                +₹{(getTierPrice("gold") * 0.18).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-amber-900 pt-1.5 border-t border-amber-100/40 min-h-[32px]">
                              <span className="leading-snug">{t("program_details.total_payable")}</span>
                              <span className="font-black shrink-0 ml-2">
                                ₹{(getTierPrice("gold") * 1.18).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPriceType("gold");
                          }}
                          className={`mt-5 w-full min-h-[42px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center text-center leading-tight ${selectedPriceType === "gold"
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            }`}
                        >
                          {selectedPriceType === "gold" ? t("program_details.selected_package") : t("program_details.select_gold")}
                        </button>
                      </div>
                    )}

                    {program.silverprice && (
                      <div
                        onClick={() => setSelectedPriceType("silver")}
                        className={`relative rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ${selectedPriceType === "silver"
                          ? "border-slate-600 bg-gradient-to-b from-slate-50/90 to-white shadow-lg shadow-slate-500/10 ring-2 ring-slate-400/50 -translate-y-1"
                          : "border-gray-200/80 bg-white hover:border-slate-300 hover:shadow-md"
                          }`}
                      >
                        {selectedPriceType === "silver" && (
                          <div className="absolute -top-3 right-4 whitespace-nowrap bg-slate-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-10">
                            <Check className="w-3 h-3 stroke-[3] shrink-0" /> {t("program_details.selected_package")}
                          </div>
                        )}
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center justify-between min-h-[36px] mb-3">
                            <span className="text-xs font-black tracking-widest uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 whitespace-nowrap">
                              {t("program_details.silver_tier")}
                            </span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selectedPriceType === "silver"
                              ? "border-slate-600 bg-slate-600 text-white"
                              : "border-gray-300 bg-white"
                              }`}>
                              {selectedPriceType === "silver" && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </div>

                          <div className="my-3">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-3xl font-black text-gray-900 tracking-tight">
                                ₹{getTierPrice("silver").toLocaleString("en-IN")}
                              </span>
                              {isOfferActive && (
                                <>
                                  <span className="text-sm font-semibold text-gray-400 line-through">
                                    ₹{Number(program.silverprice).toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">
                                    {t("program_details.save")} ₹500
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="mt-1.5 min-h-[20px] flex items-center">
                              <span className="text-xs text-gray-500 font-medium leading-tight">
                                {t("program_details.base_fee_per_person")}
                              </span>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100/70 text-xs text-gray-600 space-y-1.5 mt-auto">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">{t("program_details.gst_18")}</span>
                              <span className="font-semibold text-gray-800 shrink-0">
                                +₹{(getTierPrice("silver") * 0.18).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-slate-900 pt-1.5 border-t border-slate-100/40 min-h-[32px]">
                              <span className="leading-snug">{t("program_details.total_payable")}</span>
                              <span className="font-black shrink-0 ml-2">
                                ₹{(getTierPrice("silver") * 1.18).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPriceType("silver");
                          }}
                          className={`mt-5 w-full min-h-[42px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center text-center leading-tight ${selectedPriceType === "silver"
                            ? "bg-slate-700 text-white shadow-md shadow-slate-700/20"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                        >
                          {selectedPriceType === "silver" ? t("program_details.selected_package") : t("program_details.select_silver")}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Seating Layout & Options Image */}
                  <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 md:p-8 border border-amber-100 shadow-sm overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-200/60">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                          <Armchair className="w-5 h-5 text-amber-500" />
                          {t("program_details.seating_layout_title")}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {t("program_details.seating_layout_desc")}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="flex items-center gap-1.5 text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span> {t("program_details.platinum_front_vip")}
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span> {t("program_details.gold_middle")}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-slate-500"></span> {t("program_details.silver_rear")}
                        </span>
                      </div>
                    </div>
                    <div className="relative w-full rounded-xl overflow-hidden bg-white flex justify-center items-center border border-amber-200/70 p-2 sm:p-4 shadow-sm">
                      <img
                        src="/seating-layout.png"
                        alt="Seating Layout Plan for Platinum, Gold, and Silver seat options"
                        className="w-full h-auto max-h-[460px] object-contain mx-auto"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

            {program.agenda && program.agenda.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 }}
                className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mt-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    <ClipboardList className="text-amber-500 w-8 h-8" />
                    {t("program_details.schedule")}
                  </h3>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-amber-200 before:to-transparent">
                  {program.agenda.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                        <Clock size={16} />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded w-fit">
                            {item.starttime} - {item.endtime}
                          </span>
                          <h4 className="font-semibold text-gray-900">
                            {item.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {program.instructions && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54 }}
                className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    <Info className="text-amber-500 w-8 h-8" />
                    {t("program_details.instructions")}
                  </h3>
                </div>
                <div className="bg-amber-50/50 border border-amber-100/50 p-6 rounded-2xl">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {program.instructions}
                  </p>
                </div>
              </motion.div>
            )}

            {program.benefits && program.benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.53 }}
                className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mt-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    {t("program_details.benefits")}
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed font-medium">
                  {program.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {program.thingstobring && program.thingstobring.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54 }}
                className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mt-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                    {t("program_details.things_to_bring")}
                  </h3>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed font-medium">
                  {program.thingstobring.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {program.maplink && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mt-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    {t("program_details.location")}
                  </h3>
                </div>

                <div className="w-full h-50 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
                  <iframe
                    src={getMapEmbedUrl(program.maplink)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar / Info Card (Right) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-1 rounded-xl shadow-2xl sticky top-28 bg-gradient-to-b from-amber-400 to-orange-500"
            >
              <div className="bg-white rounded-[10px] p-8 h-full">
                {program.status === "active" &&
                  program.eventtype?.toLowerCase() !== "completed" &&
                  program.eventtype?.toLowerCase() !== "cancelled" &&
                  program.registrationactive ? (
                  <div className="flex justify-center mb-8">
                    <div className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-center border border-green-200 shadow-sm">
                      {t("program_details.reg_active")}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-center border border-gray-200 shadow-sm">
                      {t("program_details.reg_closed")}
                    </div>
                  </div>
                )}

                <div className="space-y-8 mb-10">
                  {(program.deliverymode?.toLowerCase() === "offline" || program.eventdate) && (
                    <div className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                        <Calendar size={22} />
                      </div>

                      <div>
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {t("program_details.date")}
                        </h5>
                        <p className="font-semibold text-gray-900">
                          {new Date(program.eventdate ?? "").toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      {isLevel1Or2 && hasValidEventToDate && program.eventtodate && (
                        <div>
                          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                            {t("program_details.reg_closed")}
                          </h5>
                          <p className="font-semibold text-gray-900">
                            {new Date(
                              program.eventtodate,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {(program.starttime ||
                    program.endtime ||
                    program.duration) && (
                      <div className="flex gap-5 group">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                          <Clock size={22} />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                            {program.starttime
                              ? t("program_details.time")
                              : t("program_details.duration")}
                          </h5>
                          {program.starttime && (
                            <p className="font-semibold text-gray-900">
                              {program.starttime} - {program.endtime}
                            </p>
                          )}
                          {program.duration && (
                            <p className="font-medium text-gray-600 text-sm mt-0.5">
                              {program.starttime
                                ? `Duration: ${program.duration}`
                                : program.duration}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                  {program.venuename || program.address ? (
                    <div className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                        <MapPin size={22} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {t("program_details.location")}
                        </h5>
                        <p className="font-medium text-gray-600 leading-relaxed text-sm">
                          {program.venuename && (
                            <span className="font-bold text-gray-900 block mb-0.5 text-base">
                              {program.venuename}
                            </span>
                          )}
                          {program.address && (
                            <>
                              {program.address},<br />
                            </>
                          )}
                          {program.city && (
                            <>
                              {program.city}, {program.state}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                        <MapPin size={22} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          Location
                        </h5>
                        <p className="font-bold text-gray-900 block mb-0.5 text-base">
                          Online Event
                        </p>
                      </div>
                    </div>
                  )}

                  {program.eligibility && (
                    <div className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                        <Users size={22} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {t("program_details.eligibility")}
                        </h5>
                        <p className="font-medium text-gray-600 leading-relaxed text-sm">
                          {program.eligibility}
                        </p>
                      </div>
                    </div>
                  )}

                  {program.dresscode && (
                    <div className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                        <Tag size={22} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {t("program_details.dress_code")}
                        </h5>
                        <p className="font-medium text-gray-600 leading-relaxed text-sm">
                          {program.dresscode}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-gray-100">
                  {program.status === "active" &&
                    program.eventtype?.toLowerCase() !== "completed" &&
                    program.eventtype?.toLowerCase() !== "cancelled" &&
                    program.registrationactive ? (
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          openLogin();
                        } else {
                          setIsDialogOpen(true);
                        }
                      }}
                      className="relative flex items-center justify-center w-full py-3 font-bold text-white rounded-[0px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-[0_8px_25px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.8)] overflow-hidden group/btn cursor-pointer"
                    >
                      <span className="relative z-10 text-lg">
                        {t("program_details.register_now")}
                      </span>
                      <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left ease-out duration-300"></div>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="block w-full py-5 text-center bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed text-lg"
                    >
                      {t("program_details.coming_soon")}
                    </button>
                  )}

                  <p className="text-sm text-center text-gray-500 mt-6 font-light">
                    {t("program_details.have_questions")}
                    <Link
                      href="/contact"
                      className="text-amber-500 hover:text-orange-600 font-medium underline underline-offset-4 decoration-amber-500/30"
                    >
                      {t("program_details.contact_us")}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Registration Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-md p-4 overflow-y-auto"
            onClick={() => setIsDialogOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[0px] p-6 md:p-8 max-w-3xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 p-2 rounded-full hover:bg-gray-200"
              >
                <X size={20} />
              </button>

              <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                    {t("program_details.form_title")}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{program.title}</p>
                </div>
                {!isSuccess && (
                  <div className="text-right mr-8 flex flex-col items-end">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      {t("program_details.amount")} (incl. 18% GST)
                    </p>
                    <p className="text-2xl font-black text-amber-500 tracking-tight">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                      Fee: ₹{baseAmount.toLocaleString("en-IN")} + 18% GST: ₹{gstAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-10 flex flex-col items-center justify-center text-center rounded-2xl py-12">
                  <div className="w-16 h-16 bg-white border border-green-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h5 className="text-2xl font-bold mb-3 tracking-tight">
                    {t("program_details.reg_submitted")}
                  </h5>
                  <p className="text-gray-600 font-light max-w-md">
                    {t("program_details.reg_success_msg")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {isLevel2 &&
                    (program.platinumprice ||
                      program.goldprice ||
                      program.silverprice) && (
                      <div className="bg-gradient-to-r from-purple-50 via-amber-50 to-slate-50 p-4 rounded-xl border border-amber-200/80 mb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                          <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            {t("program_details.select_package")} *
                          </h5>
                          {program.lastofferdate && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit border ${isOfferActive
                              ? "text-red-600 bg-red-50 border-red-200"
                              : "text-gray-600 bg-gray-100 border-gray-200"
                              }`}>
                              {isOfferActive
                                ? `${t("program_details.offer_ends")}: ${new Date(program.lastofferdate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}`
                                : `${t("program_details.standard_pricing")}: ${new Date(program.lastofferdate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}`}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {program.platinumprice && (
                            <button
                              type="button"
                              onClick={() => setSelectedPriceType("platinum")}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${selectedPriceType === "platinum"
                                ? "border-purple-600 bg-purple-100/70 shadow-sm ring-2 ring-purple-400"
                                : "border-gray-200 bg-white hover:border-purple-300"
                                }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                                  {t("program_details.platinum_tier")}
                                </span>
                                <input
                                  type="radio"
                                  name="pricetype_modal"
                                  checked={selectedPriceType === "platinum"}
                                  onChange={() => setSelectedPriceType("platinum")}
                                  className="accent-purple-600 pointer-events-none"
                                />
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <p className="text-lg font-black text-gray-900">
                                  ₹{getTierPrice("platinum")}
                                </p>
                                {isOfferActive && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ₹{program.platinumprice}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-500">
                                {t("program_details.per_participant")} {isOfferActive && <span className="text-emerald-600 font-semibold">({t("program_details.save")} ₹1,500)</span>}
                              </p>
                            </button>
                          )}
                          {program.goldprice && (
                            <button
                              type="button"
                              onClick={() => setSelectedPriceType("gold")}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${selectedPriceType === "gold"
                                ? "border-amber-600 bg-amber-100/70 shadow-sm ring-2 ring-amber-400"
                                : "border-gray-200 bg-white hover:border-amber-300"
                                }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                                  {t("program_details.gold_tier")}
                                </span>
                                <input
                                  type="radio"
                                  name="pricetype_modal"
                                  checked={selectedPriceType === "gold"}
                                  onChange={() => setSelectedPriceType("gold")}
                                  className="accent-amber-600 pointer-events-none"
                                />
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <p className="text-lg font-black text-gray-900">
                                  ₹{getTierPrice("gold")}
                                </p>
                                {isOfferActive && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ₹{program.goldprice}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-500">
                                {t("program_details.per_participant")} {isOfferActive && <span className="text-emerald-600 font-semibold">({t("program_details.save")} ₹1,000)</span>}
                              </p>
                            </button>
                          )}
                          {program.silverprice && (
                            <button
                              type="button"
                              onClick={() => setSelectedPriceType("silver")}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${selectedPriceType === "silver"
                                ? "border-slate-600 bg-slate-100/80 shadow-sm ring-2 ring-slate-400"
                                : "border-gray-200 bg-white hover:border-slate-300"
                                }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                                  {t("program_details.silver_tier")}
                                </span>
                                <input
                                  type="radio"
                                  name="pricetype_modal"
                                  checked={selectedPriceType === "silver"}
                                  onChange={() => setSelectedPriceType("silver")}
                                  className="accent-slate-600 pointer-events-none"
                                />
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <p className="text-lg font-black text-gray-900">
                                  ₹{getTierPrice("silver")}
                                </p>
                                {isOfferActive && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ₹{program.silverprice}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-500">
                                {t("program_details.per_participant")} {isOfferActive && <span className="text-emerald-600 font-semibold">({t("program_details.save")} ₹500)</span>}
                              </p>
                            </button>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-amber-200/60">
                          <button
                            type="button"
                            onClick={() => setShowSeatPlanModal(!showSeatPlanModal)}
                            className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 cursor-pointer underline"
                          >
                            <Eye size={13} />
                            {showSeatPlanModal ? t("program_details.hide_seating_plan") : t("program_details.view_seating_plan")}
                          </button>
                          {showSeatPlanModal && (
                            <div className="mt-2.5 rounded-xl overflow-hidden border border-amber-200/80 bg-white p-2 shadow-sm">
                              <img
                                src="/seating-layout.png"
                                alt="Seating Layout Plan for Platinum, Gold, and Silver seat options"
                                className="w-full h-auto max-h-[260px] object-contain rounded-lg mx-auto"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.full_name")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.name ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_name")}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.age")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("age")}
                        type="number"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.age ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_age")}
                      />
                      {errors.age && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.age.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.phone")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.phone ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_phone")}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.whatsapp")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("whatsapp")}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.whatsapp ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_whatsapp")}
                      />
                      {errors.whatsapp && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.whatsapp.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.gender")}
                      </label>
                      <select
                        {...register("gender")}
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.gender ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                      >
                        <option value="Male">
                          {t("program_details.male")}
                        </option>
                        <option value="Female">
                          {t("program_details.female")}
                        </option>
                        <option value="Other">
                          {t("program_details.other")}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.occupation")}
                      </label>
                      <input
                        {...register("occupation")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.occupation ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_occupation")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.email")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.email ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_email")}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.district")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("district")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.district ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_district")}
                      />
                      {errors.district && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.district.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.state")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("state")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.state ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_state")}
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        {t("program_details.country")}{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("country")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.country ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        placeholder={t("program_details.enter_country")}
                      />
                      {errors.country && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {!isOnline && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          {t("program_details.participants")}{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("participants")}
                          type="number"
                          min="1"
                          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.participants ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        />
                        {errors.participants && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.participants.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          {t("program_details.adults")}{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("adultcount")}
                          type="number"
                          min="0"
                          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.adultcount ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        />
                        {errors.adultcount && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.adultcount.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          {t("program_details.children")}{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("childrencount")}
                          type="number"
                          min="0"
                          className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-1 transition-colors font-medium text-gray-900 placeholder:text-gray-400 text-sm ${errors.childrencount ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500" : "border-gray-300 bg-white focus:ring-brand-primary focus:border-brand-primary"}`}
                        />
                        {errors.childrencount && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.childrencount.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {isOnline && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          {t("program_details.booking_date")}{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("bookingdate")}
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          {t("program_details.booking_time")}{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("bookingtime")}
                          type="time"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="flex items-center gap-3 text-sm font-bold text-gray-700 uppercase tracking-wide">
                      <input
                        type="checkbox"
                        {...register("ishealthissue")}
                        className="w-4 h-4 accent-brand-primary"
                      />
                      {t("program_details.health_issue_q")}
                    </label>
                  </div>

                  {isHealthIssue && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50/30">
                      <h5 className="text-sm font-bold text-gray-900 mb-4">
                        Health Issues Detail
                      </h5>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative"
                        >
                          <div>
                            <input
                              {...register(`healthissues.${index}.name`)}
                              placeholder={t("program_details.name_ph")}
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm"
                            />
                            {errors.healthissues?.[index]?.name && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.healthissues[index]?.name?.message}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 items-start">
                            <div className="flex-1">
                              <input
                                {...register(`healthissues.${index}.issue`)}
                                placeholder={t("program_details.issue_ph")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm"
                              />
                              {errors.healthissues?.[index]?.issue && (
                                <p className="text-xs text-red-500 mt-1">
                                  {errors.healthissues[index]?.issue?.message}
                                </p>
                              )}
                            </div>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => append({ name: "", issue: "" })}
                        className="text-xs font-bold text-brand-primary mt-2"
                      >
                        + Add Another
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {t("program_details.remarks")}
                    </label>
                    <textarea
                      {...register("remarks")}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm resize-none"
                      placeholder={t("program_details.remarks_ph")}
                    ></textarea>
                  </div>

                  <div className="rounded-xl bg-amber-50/70 border border-amber-200/70 p-4 space-y-2 text-xs text-gray-700">
                    {isLevel2 && (
                      <div className="space-y-1 pb-2 border-b border-amber-200/60">
                        <div className="flex justify-between items-center text-gray-700 font-medium">
                          <span>Selected Package:</span>
                          <span className="font-bold text-amber-900 capitalize">
                            {selectedPriceType} Tier (₹{currentUnitPrice.toLocaleString("en-IN")}/person)
                          </span>
                        </div>
                        {isOfferActive && (
                          <div className="flex justify-between items-center text-[11px] text-emerald-700 font-semibold">
                            <span>Special Offer Discount:</span>
                            <span>-₹{selectedPriceType === "platinum" ? "1,500" : selectedPriceType === "gold" ? "1,000" : "500"}/person applied</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Registration Fee ({participantsCount} participant{Number(participantsCount) > 1 ? "s" : ""}):</span>
                      <span className="font-semibold text-gray-900">₹{baseAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                      <span>GST (18%):</span>
                      <span className="font-semibold text-gray-900">₹{gstAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-amber-200/90 font-bold text-sm text-gray-900">
                      <span className="text-amber-950">Total Payable Amount:</span>
                      <span className="text-amber-600 font-black text-base">₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn relative flex w-full md:w-auto items-center justify-center overflow-hidden rounded-[0px] bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-bold text-white shadow-[0_8px_25px_-8px_rgba(245,158,11,0.6)] transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.8)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      ) : (
                        <>
                          {t("program_details.submit_app")} <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm flex items-center gap-2"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
