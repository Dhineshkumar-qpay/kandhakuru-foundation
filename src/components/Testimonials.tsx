"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Software Engineer",
    text: "Shiva Kriya Yogam has completely transformed my approach to life and work. I've found an inner peace that allows me to handle stress with grace. The mental clarity I've gained is truly priceless.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Entrepreneur",
    text: "The teachings at Sri Kandhaguru Foundation are profound yet practical. They don't ask you to leave your worldly duties, but instead teach you how to perform them with a spiritual center. Highly recommended.",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. Ananya Reddy",
    role: "Physician",
    text: "As a doctor, I was initially skeptical, but the physical and mental benefits of this practice are undeniable. It enhances immunity and brings a deep sense of balance to both body and mind.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-brand-primary/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-brand-primary/10">
        <Quote size={120} />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Participant Experiences</h3>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-brand-primary/10 text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-brand-accent text-brand-accent" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-10 italic">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div>
                <h4 className="text-xl font-bold text-foreground">{testimonials[currentIndex].name}</h4>
                <p className="text-brand-secondary mt-1">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "bg-brand-primary w-8" : "bg-brand-primary/30"
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
