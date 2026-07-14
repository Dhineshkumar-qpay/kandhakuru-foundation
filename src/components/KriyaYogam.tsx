"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function KriyaYogam() {
  return (
    <section id="kriya-yogam" className="py-24 bg-brand-primary/5 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">The Way of Life</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-8">Kriya Yogam</h3>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent"></div>
              
              <p>
                Kriya Yogam is more than a set of techniques—it is a way of life.
              </p>
              <p>
                When practiced sincerely and consistently, it sharpens the mind, opens the heart, harmonizes the practitioner with the universe, and leads to profound inner transformation.
              </p>
              <p>
                It is an ancient, scientific spiritual path that awakens your dormant energies, allowing you to experience your true divine nature while still living actively in the world.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Outer rotating ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute inset-0 border-2 border-brand-primary/20 rounded-full border-dashed"
              ></motion.div>
              
              {/* Inner rotating ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute inset-4 border-2 border-brand-secondary/20 rounded-full border-dashed"
              ></motion.div>
              
              {/* Center Image */}
              <div className="absolute inset-8 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800')" }}
                ></div>
                <div className="absolute inset-0 bg-brand-primary/20 mix-blend-multiply"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
