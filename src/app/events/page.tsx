"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { getEvents, getImageVideoUrl } from "../../services/api";
import Link from "next/link";
import { EventModel } from "../../models/event_model";

export default function EventsPage() {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents(undefined, "level2");
        if (response.success && response.data?.events) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="pt-15 bg-[#FAFAF9] min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center mx-auto"
          >
            <h2 className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-2">
              Join Our Gatherings
            </h2>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Upcoming Events
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading events...
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No upcoming events found.
              </div>
            ) : (
              events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={`/programs/${event.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-amber-200 transition-all duration-500 flex flex-col md:flex-row min-h-[220px]"
                  >
                    {/* Image Section */}
                    <div className="relative w-full md:w-2/5 shrink-0 bg-gray-50 overflow-hidden h-56 md:h-auto">
                      <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors z-10" />

                      <img
                        src={getImageVideoUrl(event.image)}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />

                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-white/95 backdrop-blur-sm shadow-sm border border-gray-100 rounded-lg px-3 py-1.5 flex flex-col items-center">
                          <span className="text-brand-primary font-bold text-lg leading-tight">
                            {new Date(event.eventdate).getDate()}
                          </span>

                          <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                            {new Date(event.eventdate).toLocaleString(
                              "default",
                              {
                                month: "short",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider rounded-md">
                          {event.category || "Spiritual"}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-brand-primary transition-colors mb-3">
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-5">
                          {event.description}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2.5 text-gray-600 text-sm">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4 text-brand-primary" />
                          </div>

                          <span className="font-medium">
                            {new Date(event.eventdate).toLocaleDateString()}{" "}
                            {event.eventtodate && "-"}{" "}
                            {new Date(event.eventtodate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 text-gray-600 text-sm">
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-brand-primary" />
                          </div>

                          <span className="font-medium truncate pr-2">
                            {event.city || "Venue TBD"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="w-full md:w-16 bg-gray-50 group-hover:bg-brand-primary transition-colors duration-500 flex items-center justify-center py-4 md:py-0 border-t md:border-t-0 md:border-l border-gray-100">
                      <div className="flex md:flex-col items-center gap-2 text-gray-400 group-hover:text-white transition-colors duration-500">
                        <span className="md:hidden font-bold text-sm">
                          View Details
                        </span>

                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
