"use client";

import { motion } from "framer-motion";
import { UserCheck, Shirt, Info } from "lucide-react";

export default function Eligibility() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Eligibility Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-primary/5 rounded-3xl p-8 border border-brand-primary/10 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
              <UserCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Who Can Attend?</h3>
            <p className="text-gray-600 text-lg">
              Our programs are open to everyone. Anyone above <span className="font-bold text-brand-primary">12 years of age</span> is eligible to participate and learn Shiva Kriya Yogam.
            </p>
          </motion.div>

          {/* Dress Code Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-brand-secondary/5 rounded-3xl p-8 border border-brand-secondary/10 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-16 h-16 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary mb-6">
              <Shirt size={32} />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Dress Code</h3>
            <p className="text-gray-600 text-lg mb-4">
              Traditional and comfortable wear is recommended for ease of practice.
            </p>
            <ul className="text-gray-700 font-medium space-y-2">
              <li className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                Vesti & Shirt
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                Track Pants & T-Shirt
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
