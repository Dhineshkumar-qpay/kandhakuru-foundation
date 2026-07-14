"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517482811402-990db86d2fc0?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-6"
          >
            Welcome to the spiritual journey
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Sri Kandhaguru Foundation
          </h1>
          
          <h2 className="text-2xl md:text-4xl text-brand-accent font-medium mb-8">
            The Way of Life
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Guide visitors toward inner peace, self-realization, and holistic well-being through the timeless wisdom of Shiva Kriya Yogam.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#register"
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-medium hover:bg-brand-primary/90 transition-all hover:scale-105 shadow-xl shadow-brand-primary/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Join Program <ArrowRight size={18} />
            </Link>
            <Link 
              href="#about"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all hover:scale-105 w-full sm:w-auto justify-center flex"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white"
      >
        <Link href="#about" className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </Link>
      </motion.div>
    </section>
  );
}
