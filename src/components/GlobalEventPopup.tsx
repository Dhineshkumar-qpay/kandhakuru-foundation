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
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-[9999] w-72 md:w-80 rounded-xl bg-white shadow-[0_12px_40px_-10px_rgba(0,0,0,0.25)] border border-gray-200 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gray-50/80 backdrop-blur-md border-b border-gray-100 px-3 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-brand-primary/10 flex items-center justify-center">
                <Bell size={13} className="text-brand-primary" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-700">
                Upcoming Event
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 p-1.5 rounded-md transition-colors"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="w-full flex-none snap-center cursor-pointer group flex flex-col bg-white"
                onClick={() => handleEventClick(evt.id)}
              >
                {/* Event Image */}
                <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                  <img
                    src={getImageVideoUrl(evt.image)}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Event Details */}
                <div className="p-4 flex flex-col gap-2.5">
                  <h4 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {evt.title}
                  </h4>

                  <div className="flex flex-col gap-2 mt-0.5 text-xs text-gray-600 font-medium">
                    {evt.eventdate && (
                      <div className="flex items-center gap-2.5">
                        <Calendar size={15} className="text-gray-400" />
                        <span>{new Date(evt.eventdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    )}
                    {evt.city && (
                      <div className="flex items-center gap-2.5">
                        <MapPin size={15} className="text-gray-400" />
                        <span className="line-clamp-1">{evt.city}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar (15 seconds) */}
          <div className="h-1 w-full bg-gray-100">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 15, ease: "linear" }}
              className="h-full bg-brand-primary"
            />
          </div>

          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
               display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
