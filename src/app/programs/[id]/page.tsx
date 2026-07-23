"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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
} from "lucide-react";
import {
  getEventDetails,
  getImageVideoUrl,
  addBooking,
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
  const isOnline = program?.deliverymode?.toLowerCase() === "online";
  const participantsCount = isOnline ? "1" : watch("participants") || "1";
  const amount = program
    ? Number(program.registrationfee) * Number(participantsCount)
    : 0;

  const onSubmit = async (data: FormValues) => {
    if (isOnline && (!data.bookingdate || !data.bookingtime)) {
      setToastMessage(
        "Booking date and time are required for online programs.",
      );
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
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
        ishealthissue: data.ishealthissue,
        healthissues: data.ishealthissue ? data.healthissues : null,
        deliverymode: program?.deliverymode || "offline",
        participants: isOnline ? 1 : Number(data.participants),
        adultcount: isOnline ? 1 : Number(data.adultcount),
        childrencount: isOnline ? 0 : Number(data.childrencount),
        totalamount: amount,
        remarks: data.remarks || "",
        bookingdate: isOnline ? data.bookingdate : null,
        bookingtime: isOnline ? data.bookingtime : null,
      };

      const response = await addBooking(payload);

      if (response.success) {
        setIsSuccess(true);
        reset();
        setTimeout(() => {
          setIsSuccess(false);
          setIsDialogOpen(false);
        }, 3000);
      } else {
        console.error("Booking failed:", response.message);
        setToastMessage(response.message || "Booking failed");
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
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
    <main className="bg-[#FAFAF9] min-h-screen pt-20 pb-24 relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

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
              className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden"
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
              className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Key Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <Tag className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                    Category
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {program.category}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <CreditCard className="w-8 h-8 text-amber-500 mb-4 group-hover:scale-110 group-hover:text-orange-500 transition-all duration-300" />
                  <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                    Registration
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{program.registrationfee}
                  </p>
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
                      Program Type
                    </h4>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {program.programtype || "General"}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

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
                    Event Schedule
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
                    Instructions
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
                    Benefits
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
                    Things To Bring
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
              className="bg-white p-1 rounded-xl shadow-2xl sticky top-28 bg-gradient-to-b from-amber-400 to-orange-500"
            >
              <div className="bg-white rounded-[10px] p-8 h-full">
                {program.status === "active" &&
                program.eventtype?.toLowerCase() !== "completed" &&
                program.eventtype?.toLowerCase() !== "cancelled" &&
                program.registrationactive ? (
                  <div className="flex justify-center mb-8">
                    <div className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-center border border-green-200 shadow-sm">
                      Registration is Active
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider text-center border border-gray-200 shadow-sm">
                      Registration Closed
                    </div>
                  </div>
                )}

                <div className="space-y-8 mb-10">
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                      <Calendar size={22} />
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                        {program.leveltype === "level2" ? "From Date" : "Date"}
                      </h5>
                      <p className="font-semibold text-gray-900">
                        {new Date(program.eventdate ?? "").toLocaleDateString(
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

                    {program.leveltype === "level2" && (
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          To Date
                        </h5>
                        <p className="font-semibold text-gray-900">
                          {new Date(
                            program.eventtodate ?? "",
                          ).toLocaleDateString(undefined, {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  {(program.starttime ||
                    program.endtime ||
                    program.duration) && (
                    <div className="flex gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-amber-100">
                        <Clock size={22} />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                          {program.starttime ? "Time" : "Duration"}
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
                          Location
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
                          Eligibility
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
                          Dress Code
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
                        Register Now
                      </span>
                      <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left ease-out duration-300"></div>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="block w-full py-5 text-center bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed text-lg"
                    >
                      Registration Closed
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
                    Program Registration Application
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{program.title}</p>
                </div>
                {!isSuccess && (
                  <div className="text-right mr-8">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                      Amount
                    </p>
                    <p className="text-2xl font-bold text-amber-500">
                      ₹{amount}
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
                    Registration Submitted
                  </h5>
                  <p className="text-gray-600 font-light max-w-md">
                    Your registration has been securely logged in our system. A
                    foundation representative will contact you shortly.
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
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
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
                        Phone Number{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        WhatsApp Number{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("whatsapp")}
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter WhatsApp number"
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
                        Gender
                      </label>
                      <select
                        {...register("gender")}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.gender ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Occupation
                      </label>
                      <input
                        {...register("occupation")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.occupation ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter your occupation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                        Email Address{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
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
                        State <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        {...register("state")}
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.state ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        placeholder="Enter your state"
                      />
                      {errors.state && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.state.message}
                        </p>
                      )}
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
                          Participants{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("participants")}
                          type="number"
                          min="1"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.participants ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        />
                        {errors.participants && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.participants.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Adults <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("adultcount")}
                          type="number"
                          min="0"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.adultcount ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
                        />
                        {errors.adultcount && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.adultcount.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Children <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("childrencount")}
                          type="number"
                          min="0"
                          className={`w-full px-4 py-3 rounded-xl border ${errors.childrencount ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50/50"} focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm`}
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
                          Booking Date{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("bookingdate")}
                          type="date"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                          Booking Time{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <input
                          {...register("bookingtime")}
                          type="time"
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
                      Is anyone having health issues?
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
                              placeholder="Name"
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
                                placeholder="Issue"
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
                      Remarks
                    </label>
                    <textarea
                      {...register("remarks")}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:bg-white transition-all text-sm resize-none"
                      placeholder="Any additional remarks..."
                    ></textarea>
                  </div>

                  <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn relative flex w-full md:w-auto items-center justify-center overflow-hidden rounded-[0px] bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-bold text-white shadow-[0_8px_25px_-8px_rgba(245,158,11,0.6)] transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.8)] cursor-pointer"
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
