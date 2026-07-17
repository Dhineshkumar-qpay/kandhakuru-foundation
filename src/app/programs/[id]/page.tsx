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
} from "lucide-react";
import { getEventDetails } from "../../../services/api";
import { EventDetailData } from "../../../models/event_model";

export default function ProgramDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const [program, setProgram] = useState<EventDetailData | null>(null);
  const [loading, setLoading] = useState(true);

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
            backgroundImage: `url('http://localhost:3003${program.image}')`,
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end pb-24">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm transition-all mb-8 text-sm font-semibold uppercase tracking-widest border border-white/20"
              >
                <ArrowLeft size={16} /> Back to Programs
              </Link>
            </motion.div> */}

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
      <div className="container mx-auto px-4 max-w-6xl -mt-16 relative z-20">
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
                    <Link
                      href="/contact#register"
                      className="relative flex items-center justify-center w-full py-5 font-bold text-white rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-[0_8px_25px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.8)] overflow-hidden group/btn"
                    >
                      <span className="relative z-10 text-lg">
                        Register Now
                      </span>
                      <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left ease-out duration-300"></div>
                    </Link>
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
    </main>
  );
}
