"use client";

import { motion } from "framer-motion";
import { Brain, HeartPulse, Shield, Briefcase, TrendingUp, Sparkles, Ban, Sun } from "lucide-react";

const benefits = [
  { icon: Brain, title: "Mental Clarity", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { icon: HeartPulse, title: "Physical Health", color: "bg-red-50 text-red-600 border-red-100" },
  { icon: Shield, title: "Disease-resistant Immunity", color: "bg-green-50 text-green-600 border-green-100" },
  { icon: Briefcase, title: "Professional Growth", color: "bg-purple-50 text-purple-600 border-purple-100" },
  { icon: TrendingUp, title: "Increased Income", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { icon: Sparkles, title: "Awakening of the Soul", color: "bg-brand-primary/10 text-brand-primary border-brand-primary/20" },
  { icon: Ban, title: "Removal of Negative Thoughts", color: "bg-slate-50 text-slate-600 border-slate-200" },
  { icon: Sun, title: "Positive Energy", color: "bg-amber-50 text-amber-500 border-amber-100" }
];

export default function Benefits() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="benefits" className="py-24 bg-background relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-secondary uppercase mb-3">Transform Your Life</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Benefits of Practice</h3>
            <p className="text-lg text-gray-600">
              When practiced sincerely and consistently, Kriya Yogam brings profound transformation across all aspects of your life.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 relative overflow-hidden">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${benefit.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-foreground group-hover:text-brand-primary transition-colors">
                    {benefit.title}
                  </h4>
                  
                  {/* Subtle hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
