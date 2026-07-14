"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    id: 1,
    title: "Shiva Kriya Yogam (Level I)",
    date: "09 August 2026",
    location: "Hotel Zion, Near Race Course, Bangalore",
    status: "open",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Shiva Kriya Yogam (Level II)",
    date: "12–13 September 2026",
    location: "Rathna Residency, VOC Park Road, Near Bus Stand, Erode",
    status: "open",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Sivanodu Shivarathiri",
    date: "Coming Soon",
    location: "To be announced",
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1604944985226-79173ebfc486?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">Join Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Upcoming Programs</h3>
            <p className="text-lg text-gray-600">
              Take the first step towards spiritual transformation by joining our upcoming events and sessions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="#register" className="hidden md:inline-flex items-center gap-2 text-brand-secondary font-semibold hover:text-brand-primary transition-colors">
              View All Programs <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('${program.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {program.status === 'open' ? (
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
                <h4 className="text-2xl font-bold text-foreground mb-6 line-clamp-2">{program.title}</h4>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{program.date}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{program.location}</span>
                  </div>
                </div>
                
                {program.status === 'open' ? (
                  <Link 
                    href="#register"
                    className="block w-full py-3 px-6 text-center bg-white border-2 border-brand-primary text-brand-primary font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-colors duration-300"
                  >
                    Register Now
                  </Link>
                ) : (
                  <button 
                    disabled
                    className="block w-full py-3 px-6 text-center bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
