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
  ) => {
    setLoading(true);
    try {
      const response = await getEvents(deliverymode);
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
    <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto w-full mt-8">
      {onlineEvents.map((prog, idx) => (
        <motion.div
          key={prog.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row cursor-pointer min-h-[400px]"
        >
          <div className="relative w-full md:w-1/3 md:max-w-[320px] h-48 md:h-auto shrink-0 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={getImageVideoUrl(prog.image)}
                alt="image"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          <div className="p-6 md:p-8 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col">
              <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                {prog.title}
              </h4>
              <p className="text-md text-gray-600 mb-4"><span className="text-sm font-semibold text-stone">Category : </span>{prog.category}</p>
              <div className="flex items-center  text-gray-500">
                <Calendar className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-medium line-clamp-5">
                  {prog.description}
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[0px] text-sm font-bold transition-all duration-300 ${activeTab === "domestic"
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[0px] text-sm font-bold transition-all duration-300 ${activeTab === "international"
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
                              {program.address},{" "}
                              <strong className="text-[var(--color-blue)]">
                                {program.city}
                              </strong>
                              , {program.state}
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
            </>
          )}
        </div>
      </section>
    </main>
  );
}
