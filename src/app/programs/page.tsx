"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ArrowRight,
  MonitorPlay,
  CheckCircle2,
  Headphones,
  Laptop,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { getEvents, getImageVideoUrl } from "../../services/api";
import { EventModel } from "../../models/event_model";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ProgramsPage() {
  const { t } = useLanguage();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [activeTab, setActiveTab] = useState<"domestic" | "international">(
    "domestic",
  );
  const [loading, setLoading] = useState(false);

  const [onlineEvents, setOnlineEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    fetchEvents("offline");
    fetchOnlineEvents();
  }, []);

  const fetchEvents = async (
    deliverymode: string = "offline",
    leveltype: string = "level1",
  ) => {
    setLoading(true);
    try {
      const response = await getEvents(deliverymode, leveltype);
      if (response.success && response.data?.events) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOnlineEvents = async () => {
    try {
      const response = await getEvents("online");
      if (response.success && response.data?.events) {
        setOnlineEvents(response.data.events);
      }
    } catch (error) {
      console.error("Failed to fetch online events", error);
    }
  };

  const renderOnlineEventsList = () => (
    <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto w-full mt-8">
      {onlineEvents.map((prog, idx) => (
        <motion.div
          key={prog.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row cursor-pointer min-h-[380px] md:min-h-[420px]"
        >
          {/* Image Section */}
          <div className="relative w-full md:w-2/5 md:min-w-[320px] h-72 md:h-auto shrink-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url('${getImageVideoUrl(prog.image)}')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>

            {/* Online Indicator Badge */}
            <div className="absolute top-6 left-6 bg-green-500/90 backdrop-blur-md border border-green-400/50 px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="text-xs font-black tracking-widest uppercase text-white">
                Online Session
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-lg">
                <MonitorPlay size={18} />
              </div>
              <span className="text-white text-sm font-semibold tracking-wide drop-shadow-md">
                Virtual Access Available
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-10 flex-grow flex flex-col justify-center relative bg-white">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex flex-col max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-brand-primary/20">
                    {prog.category || "General"}
                  </span>
                </div>

                <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                  {prog.title}
                </h4>

                <p className="text-gray-600 leading-relaxed mb-8 line-clamp-4">
                  {prog.description}
                </p>

                <div className="flex items-center gap-8 mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Laptop className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm font-semibold">
                      Live Streaming
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Headphones className="w-5 h-5 text-brand-primary" />
                    <span className="text-sm font-semibold">Interactive</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-start md:justify-end shrink-0 md:mt-0 mt-4">
                <Link href={`/programs/${prog.id}`}>
                  <button className="px-8 py-4 bg-gray-50 border border-gray-200 text-brand-primary text-xs font-black uppercase tracking-widest rounded-2xl group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer">
                    {t("programs.view_details")}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <main className="pt-10 bg-gray-50 min-h-screen">
      {/* Premium Header & Tabs Section */}
      <section className="relative pt-32 pb-16 bg-[#FAFAF9] overflow-hidden border-b border-gray-100">
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-brand-primary/20 to-orange-200/10 blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-200/20 to-brand-primary/10 blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-brand-primary"></span>
              <span className="px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black tracking-[0.2em] uppercase border border-brand-primary/20 shadow-sm">
                {t("programs.explore_offerings")}
              </span>
              <span className="w-10 h-px bg-gradient-to-l from-transparent to-brand-primary"></span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal font-black text-gray-900 tracking-tight mb-6">
              {t("programs.spiritual")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-500">
                {t("programs.programs_title")}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto font-light leading-relaxed mb-12">
              {t("programs.programs_desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex bg-white/80 backdrop-blur-xl border border-gray-200 p-1.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <button
              onClick={() => setActiveTab("domestic")}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === "domestic"
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/10601/10601146.png"
                alt="Domestic"
                className={`w-5 h-5 ${activeTab === "domestic" ? "filter brightness-0 invert" : "opacity-60"}`}
              />
              {t("programs.domestic")}
            </button>
            <button
              onClick={() => setActiveTab("international")}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === "international"
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
              }`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3192/3192970.png"
                alt="International"
                className={`w-5 h-5 ${activeTab === "international" ? "filter brightness-0 invert" : "opacity-60"}`}
              />
              {t("programs.international")}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {activeTab === "domestic" && (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight text-center">
                  {t("programs.offline_prog")}
                </h3>
                <p className="text-gray-500 text-center mt-2">
                  {t("programs.offline_desc")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
                  >
                    <Link
                      href={`/programs/${program.id}`}
                      className="flex flex-col h-full"
                    >
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden shrink-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                          style={{
                            backgroundImage: `url('${getImageVideoUrl(program.image)}')`,
                          }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        {/* Highlight City Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-white/50 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10 group-hover:-translate-y-1 transition-transform duration-300">
                          <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                          <span className="text-[11px] font-black tracking-widest uppercase text-brand-primary">
                            {program.city}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-grow flex flex-col relative bg-white">
                        {/* Floating Date Badge */}
                        <div className="absolute -top-8 left-6 bg-brand-primary text-white p-2 rounded-2xl shadow-xl flex flex-col items-center justify-center min-w-[3.5rem] group-hover:-translate-y-1 transition-transform duration-300 border-2 border-white">
                          <span className="text-base font-black leading-none">
                            {new Date(program.eventdate).getDate()}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
                            {new Date(program.eventdate).toLocaleString(
                              "default",
                              { month: "short" },
                            )}
                          </span>
                        </div>

                        <h4 className="text-lg font-black text-gray-900 mt-6 mb-4 line-clamp-2 group-hover:text-brand-primary transition-colors leading-snug">
                          {program.title}
                        </h4>

                        <div className="space-y-3 mb-6 flex-grow border-t border-gray-100 pt-4">
                          <div className="flex items-start gap-3 text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5 group-hover:text-brand-primary transition-colors" />
                            <span className="text-sm leading-relaxed">
                              {program.address},{" "}
                              <span className="text-gray-900 font-bold">
                                {program.city}
                              </span>
                              , {program.state}
                            </span>
                          </div>
                        </div>

                        {program.status === "active" ? (
                          <span className="block w-full py-2.5 px-4 text-center bg-gray-50 border border-gray-200 text-brand-primary font-bold rounded-xl group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all duration-300 shadow-sm uppercase tracking-wider text-xs">
                            {t("programs.view_details")}
                          </span>
                        ) : (
                          <span className="block w-full py-2.5 px-4 text-center bg-gray-100 text-gray-400 font-bold rounded-xl uppercase tracking-wider text-xs">
                            {t("programs.coming_soon")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {onlineEvents.length > 0 && (
                <div className="mt-20 mb-8 border-t border-gray-200 pt-12">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight text-center">
                    {t("programs.online_prog")}
                  </h3>
                  <p className="text-gray-500 text-center mt-2">
                    {t("programs.online_desc")}
                  </p>
                </div>
              )}

              {renderOnlineEventsList()}
            </>
          )}

          {activeTab === "international" && (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight text-center">
                  {t("programs.intl_online_only")}
                </h3>
                <p className="text-gray-500 text-center mt-2">
                  {t("programs.intl_desc")}
                </p>
              </div>

              {renderOnlineEventsList()}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
