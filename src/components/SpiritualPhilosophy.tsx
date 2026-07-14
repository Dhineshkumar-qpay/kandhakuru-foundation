"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function SpiritualPhilosophy() {
  const religions = [
    { name: "Christianity", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { name: "Islam", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    { name: "Buddhism", color: "bg-orange-100 text-orange-800 border-orange-200" },
    { name: "Hinduism", color: "bg-rose-100 text-rose-800 border-rose-200" }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-primary/5 rounded-3xl p-8 md:p-16 border border-brand-primary/10 relative overflow-hidden"
        >
          {/* Decorative watermark icon */}
          <div className="absolute -right-10 -top-10 text-brand-primary/5">
            <BookOpen size={300} strokeWidth={1} />
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">Spiritual Philosophy</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                The Role of Religions in Connecting with the Divine
              </h3>
            </div>
            
            <div className="text-center max-w-3xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <p>
                We respectfully acknowledge that every religion provides a unique and sacred path toward divine realization.
              </p>
              <p>
                Whether it is the path of love in <span className="font-semibold">Christianity</span>, the devotion in <span className="font-semibold">Islam</span>, the mindfulness of <span className="font-semibold">Buddhism</span>, or the cosmic understanding in <span className="font-semibold">Hinduism</span>—all are valid expressions of humanity's search for Truth.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {religions.map((religion, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-6 py-3 rounded-full border font-semibold ${religion.color}`}
                >
                  {religion.name}
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-accent/20 text-center">
              <p className="text-xl font-medium text-gray-800">
                <span className="text-brand-primary font-bold">Sanatana Dharma</span> preserves ancient yogic wisdom while deeply respecting all faiths. Kriya Yogam is a universal science that anyone from any background can practice to enhance their own spiritual journey.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
