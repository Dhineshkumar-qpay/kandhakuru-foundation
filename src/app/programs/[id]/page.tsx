"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import { getEventDetails, getImageVideoUrl } from "../../../services/api";
import { EventDetailData } from "../../../models/event_model";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().min(1, { message: "Age is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  whatsapp: z
    .string()
    .min(10, { message: "Valid WhatsApp number is required" }),
  district: z.string().min(2, { message: "District is required" }),
  state: z.string().min(2, { message: "State is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

type FormValues = z.infer<typeof formSchema>;

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
  const [program, setProgram] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
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
        <p className="animate-pulse">Loading Event Details...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Program Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The sacred gathering you are looking for does not exist or has been
          removed.
        </p>
        <Link
          href="/programs"
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all font-semibold transform hover:-translate-y-1"
        >
          Return to Programs
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#FAFAF9] min-h-screen pt-20 pb-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Hero Section */}
      <div className="w-full h-[55vh] md:h-[65vh] relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${getImageVideoUrl(program.image)}')`,
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end pb-24">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-[5px] backdrop-blur-sm transition-all mb-8 text-sm font-normal tracking-widest border border-white/20"
              >
                <ArrowLeft size={10} /> Back to Programs
              </Link>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-3xl"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    {program.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl">
                  {program.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-6xl -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full -z-10 blur-2xl"></div>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  About the Event
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
              className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Key Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-md transition-shadow group">
                  <Tag className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                    Category
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {program.category}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-md transition-shadow group">
                  <CreditCard className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                    Registration
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{program.registrationfee}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-md transition-shadow group">
                  <Users className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                    Capacity
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {program.partcipants} Max
                  </p>
                </div>
              </div>
            </motion.div>

            {program.maplink && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white mt-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Event Location
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
              className="bg-white p-1 rounded-3xl shadow-2xl sticky top-28 bg-gradient-to-b from-amber-400 to-orange-500"
            >
              <div className="bg-white rounded-[22px] p-8 h-full">
                {program.status === "active" ? (
                  <div className="bg-green-100 text-green-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider text-center w-full mb-8 border border-green-200">
                    Registration is Active
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-500 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider text-center w-full mb-8 border border-gray-200">
                    Registration Closed
                  </div>
                )}

                <div className="space-y-8 mb-10">
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                      <Calendar size={22} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        Date
                      </h5>
                      <p className="font-semibold text-gray-900">
                        {new Date(program.eventdate).toLocaleDateString(
                          undefined,
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                      <Clock size={22} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        Time
                      </h5>
                      <p className="font-semibold text-gray-900">
                        {program.starttime} - {program.endtime}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        Location
                      </h5>
                      <p className="font-medium text-gray-600 leading-relaxed text-sm">
                        <span className="font-bold text-gray-900 block mb-0.5 text-base">
                          {program.venuename}
                        </span>
                        {program.address},<br />
                        {program.city}, {program.state}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  {program.status === "active" ? (
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="relative flex items-center justify-center w-full py-5 font-bold text-white rounded-[0px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-[0_8px_25px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.8)] overflow-hidden group/btn cursor-pointer"
                    >
                      <span className="relative z-10 text-lg">
                        Register Now
                      </span>
                      <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left ease-out duration-300"></div>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="block w-full py-5 text-center bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed text-lg"
                    >
                      Currently Unavailable
                    </button>
                  )}

                  <p className="text-sm text-center text-gray-500 mt-6 font-light">
                    Have questions?{" "}
                    <Link
                      href="/contact"
                      className="text-amber-500 hover:text-orange-600 font-medium underline underline-offset-4 decoration-amber-500/30"
                    >
                      Contact us
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4 overflow-y-auto"
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
              
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                  Program Registration Application
                </h4>
                <p className="text-sm text-gray-500 mt-1">{program.title}</p>
              </div>

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-10 flex flex-col items-center justify-center text-center rounded-2xl py-12">
                  <div className="w-16 h-16 bg-white border border-green-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h5 className="text-2xl font-bold mb-3 tracking-tight">
                    Registration Submitted
                  </h5>
                  <p className="text-gray-600 font-light max-w-md">
                    Your registration has been securely logged in our system.
                    A foundation representative will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Full Name <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Age <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("age")}
                        type="number"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.age ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter your age"
                      />
                      {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Phone Number <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        WhatsApp Number <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("whatsapp")}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter WhatsApp number"
                      />
                      {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Email Address <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        District <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("district")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.district ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter your district"
                      />
                      {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        State <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("state")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter your state"
                      />
                      {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Country <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("country")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.country ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter your country"
                      />
                      {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                     className="group/btn relative flex w-full md:w-auto items-center justify-center overflow-hidden rounded-[0px] bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5 font-bold text-white shadow-[0_8px_25px_-8px_rgba(245,158,11,0.6)] transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.8)] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      ) : (
                        <>
                          Submit Application <Send size={16} />
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
    </main>
  );
}
