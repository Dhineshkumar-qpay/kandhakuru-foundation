"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Tag } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Shiva Kriya Yogam (Level II)",
      date: "Sept 12, 13",
      duration: "Two Days Program",
      location: "Rathna Residency, VOC park road, Near Busstand, Erode",
    },
    {
      id: 2,
      title: "Sivanodu Shivarathiri",
      date: "Upcoming",
      duration: "Special Event",
      location: "To be announced",
    }
  ];

  return (
    <main className="pt-10 bg-[#FAFAF9] min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-amber-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-orange-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center mx-auto"
          >
            <h2 className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-3">
              Join Our Gatherings
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Upcoming Events
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Participate in our special gatherings and spiritual events to connect, celebrate, and deepen your practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-500 flex flex-col md:flex-row relative"
              >
                {/* Decorative side bar */}
                <div className="w-full md:w-3 bg-gradient-to-b from-amber-400 to-orange-500 h-2 md:h-auto shrink-0"></div>

                <div className="p-8 flex-grow flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                        <span className="font-semibold text-gray-800">
                          {event.date} <span className="text-gray-400 font-normal mx-1">|</span> {event.duration}
                        </span>
                      </div>
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium leading-relaxed">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
