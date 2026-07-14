"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Shiva Kriya Yogam (Level I)",
    date: "09 August 2026",
    location: "Hotel Zion, Near Race Course, Bangalore",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Shiva Kriya Yogam (Level II)",
    date: "12–13 September 2026",
    location: "Rathna Residency, VOC Park Road, Near Bus Stand, Erode",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Sivanodu Shivarathiri",
    date: "Coming Soon",
    location: "To be announced",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1604944985226-79173ebfc486?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ProgramsPage() {
  return (
    <main className="pt-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center mx-auto"
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
              Explore Our Offerings
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Spiritual Programs
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Join our upcoming sessions and events to deepen your practice, connect with the community, and experience profound inner transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
              >
                <Link href={`/programs/${program.id}`} className="flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('${program.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {program.status === "open" ? (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Registering
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Coming Soon
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex-grow flex flex-col">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {program.title}
                    </h4>

                    <div className="space-y-4 mb-8 flex-grow">
                      <div className="flex items-start gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                        <span className="font-medium">{program.date}</span>
                      </div>
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">
                          {program.location}
                        </span>
                      </div>
                    </div>

                    {program.status === "open" ? (
                      <span className="block w-full py-3 px-6 text-center bg-white border-2 border-brand-primary text-brand-primary font-bold rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                        View Details
                      </span>
                    ) : (
                      <span className="block w-full py-3 px-6 text-center bg-gray-100 text-gray-400 font-bold rounded-xl">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
