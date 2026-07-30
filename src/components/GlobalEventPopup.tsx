"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, X, Bell } from "lucide-react";
import { getEvents, getImageVideoUrl } from "../services/api";
import { EventModel } from "../models/event_model";

export default function GlobalEventPopup() {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("eventPopupShown");

    if (!hasShownPopup) {
      const fetchInitialEvent = async () => {
        try {
          const response = await getEvents("offline", "level2");
          if (response.success && response.data?.events?.length > 0) {
            setEvents(response.data.events);

            setTimeout(() => {
              setIsVisible(true);
              sessionStorage.setItem("eventPopupShown", "true");

              setTimeout(() => {
                setIsVisible(false);
              }, 15000);
            }, 1000);
          }
        } catch (error) {
          console.error("Failed to fetch initial event for popup", error);
        }
      };

      fetchInitialEvent();
    }
  }, []);

  const handleEventClick = (id: number) => {
    setIsVisible(false);
    router.push(`/programs/${id}`);
  };

  return (
    <AnimatePresence>
      {isVisible && events.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-72 md:w-80 rounded-2xl p-[2px] shadow-2xl"
        >
          {/* Light-based animated glow outer border */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-orange-500 to-amber-300 bg-[length:200%_auto] animate-gradient opacity-80 z-0"></div>

          <div className="relative bg-white w-full h-full rounded-[15px] overflow-hidden flex flex-col z-10">
            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 z-30 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-gray-700 transition-colors backdrop-blur-md"
            >
              <X size={16} />
            </button>

            <div className="absolute top-4 left-4 z-30 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Bell size={12} className="animate-pulse" /> Upcoming Events
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pt-12 p-3 gap-3">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="w-full flex-none snap-center cursor-pointer group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  onClick={() => handleEventClick(evt.id)}
                >
                  {/* Banner Image */}
                  <div className="relative h-32 w-full bg-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <img
                      src={getImageVideoUrl(evt.image)}
                      alt={evt.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 relative bg-white overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-50 z-0 pointer-events-none"></div>

                    <div className="relative z-10">
                      <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                        {evt.title}
                      </h4>

                      <div className="flex flex-col gap-1.5 text-sm text-gray-600 font-medium">
                        {evt.eventdate && (
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-brand-primary" />
                            <span>{new Date(evt.eventdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        )}
                        {evt.city && (
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-brand-primary" />
                            <span className="line-clamp-1">{evt.city}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar (15 seconds) */}
            <div className="h-1 bg-amber-100 w-full z-20 mt-auto rounded-b-[14px] overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 15, ease: "linear" }}
                className="h-full bg-brand-primary"
              />
            </div>
          </div>

          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @keyframes gradient {
              0% { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
            .animate-gradient {
              animation: gradient 3s linear infinite;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
