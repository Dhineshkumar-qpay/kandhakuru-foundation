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

export default function ProgramsPage() {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [activeTab, setActiveTab] = useState<"domestic" | "international">(
    "domestic",
  );
  const [loading, setLoading] = useState(false);

  const [onlineEvents, setOnlineEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    fetchEvents(1, "offline");
    fetchOnlineEvents();
  }, []);

  const fetchEvents = async (pageNum: number, deliverymode: string = "offline") => {
    setLoading(true);
    try {
      const response = await getEvents(pageNum, deliverymode);
      if (response.success && response.data?.events) {
        if (pageNum === 1) {
          setEvents(response.data.events);
        } else {
          setEvents((prev) => [...prev, ...response.data.events]);
        }
        setHasNextPage(response.data.meta?.hasNextPage || false);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchEvents(nextPage, "offline");
  };

  const fetchOnlineEvents = async () => {
    try {
      const response = await getEvents(1, "online");
      if (response.success && response.data?.events) {
        setOnlineEvents(response.data.events);
      }
    } catch (error) {
      console.error("Failed to fetch online events", error);
    }
  };

  const renderOnlineEventsList = () => (
    <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto w-full mt-8">
      {onlineEvents.map((prog, idx) => (
        <motion.div
          key={prog.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row cursor-pointer min-h-[280px]"
        >
          <div className="relative w-full md:w-1/3 md:max-w-[320px] h-48 md:h-auto shrink-0 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={getImageVideoUrl(prog.image)} alt="image" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          <div className="p-6 md:p-8 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col">
              <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                {prog.title}
              </h4>
              <p className="text-md text-gray-600 mb-4">
                {prog.address}, {prog.city}
              </p>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium">
                  {new Date(prog.eventdate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Link href={`/programs/${prog.id}`}>
              <button className="md:w-auto w-full py-3 px-8 text-center bg-gray-50 border border-gray-200 text-brand-primary text-sm font-bold rounded-[0px] group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors duration-300 shadow-sm whitespace-nowrap cursor-pointer">
                View Details
              </button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderOnlineBookingCards = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 max-w-5xl mx-auto mt-16 pt-16 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="xl:col-span-1 bg-white border border-gray-200 shadow-sm flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-none bg-brand-primary/10 flex items-center justify-center">
              <MonitorPlay className="w-4 h-4 text-brand-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              Online Program
            </h3>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
            Virtual
          </span>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 lg:gap-12 flex-grow">
          {/* Left: Illustration Mockup - Corporate style */}
          <div className="w-full md:w-5/12 flex items-center justify-center relative">
            <div className="w-full h-full min-h-[200px] bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center p-6 relative overflow-hidden group">
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                  <Laptop
                    className="w-12 h-12 text-brand-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded shadow-sm border border-gray-100">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] font-semibold text-gray-600 uppercase">
                      Flexible
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded shadow-sm border border-gray-100">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-[10px] font-semibold text-gray-600 uppercase">
                      Any Date
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-7/12 flex flex-col justify-center">
            <h4 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
              Online Kriya Yogam
            </h4>
            <p className="text-sm text-gray-500 mb-6">
              One-to-one or group sessions as per your preferred timing.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Learn from the comfort of your home",
                "Flexible timing as per your convenience",
                "Personalized guidance",
                "One-to-one or group sessions",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 bg-brand-primary text-white font-semibold text-sm rounded-[0px] hover:bg-brand-primary transition-colors shadow-sm cursor-pointer">
                Book Your Slot
              </button>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Headphones className="w-4 h-4 text-gray-400" />
                <span className="font-medium">
                  Enquiries:{" "}
                  <a
                    href="tel:+911234567890"
                    className="text-brand-primary hover:underline"
                  >
                    +91 9842023346
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <main className="pt-10 bg-gray-50 min-h-screen">
      {/* Header & Tabs Section */}
      <section className="bg-white border-b border-gray-200 py-6 md:py-8">
        <div className="mt-10 container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <h2 className="text-xs md:text-sm font-semibold tracking-[0.2em] text-brand-primary uppercase mb-1">
              Explore Our Offerings
            </h2>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Spiritual Programs
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex bg-gray-50 border border-gray-200 p-1 rounded-[0px] shadow-inner"
          >
            <button
              onClick={() => setActiveTab("domestic")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[0px] text-sm font-bold transition-all duration-300 ${
                activeTab === "domestic"
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/10601/10601146.png"
                alt="Domestic"
                className={`w-4 h-4 `}
              />
              Domestic Programs
            </button>
            <button
              onClick={() => setActiveTab("international")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[0px] text-sm font-bold transition-all duration-300 ${
                activeTab === "international"
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3192/3192970.png"
                alt="International"
                className={`w-4 h-4 `}
              />
              International Programs
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
                  Offline Programs
                </h3>
                 <p className="text-gray-500 text-center mt-2">
                  Programs conducted at different places on different dates.
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-brand-primary transition-colors">
                          {program.title}
                        </h4>

                        <div className="space-y-3 mb-6 flex-grow">
                          <div className="flex items-start gap-3 text-gray-600">
                            <Calendar className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">
                              {new Date(program.eventdate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-start gap-3 text-gray-600">
                            <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">
                              {program.address}, {program.city}, {program.state}
                            </span>
                          </div>
                        </div>

                        {program.status === "active" ? (
                          <span className="block w-full py-2.5 px-4 text-center bg-white border border-brand-primary text-brand-primary text-sm font-bold rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                            View Details
                          </span>
                        ) : (
                          <span className="block w-full py-2.5 px-4 text-center bg-gray-100 text-gray-400 text-sm font-bold rounded-xl">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {hasNextPage && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-primary/90 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}

              {onlineEvents.length > 0 && (
                <div className="mt-20 mb-8 border-t border-gray-200 pt-12">
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight text-center">
                    Online Programs
                  </h3>
                  <p className="text-gray-500 text-center mt-2">
                    Join our online sessions from anywhere in the world.
                  </p>
                </div>
              )}
              
              {renderOnlineEventsList()}
              {renderOnlineBookingCards()}
            </>
          )}

          {activeTab === "international" && (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight text-center">
                  International Programs (Online Only)
                </h3>
                <p className="text-gray-500 text-center mt-2">
                  Join our online programs from anywhere in the world.
                </p>
              </div>
              
              {renderOnlineEventsList()}
              {renderOnlineBookingCards()}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
