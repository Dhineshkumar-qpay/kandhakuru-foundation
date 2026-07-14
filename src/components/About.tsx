"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 to-transparent mix-blend-multiply"></div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl -z-10"></div>
            
            {/* Stat badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 rounded-2xl shadow-xl border border-brand-primary/10"
            >
              <p className="text-4xl font-bold text-brand-primary mb-1">50k+</p>
              <p className="text-sm text-gray-600 font-medium">Lives Transformed</p>
            </motion.div>
          </motion.div>
          
          {/* Content side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
              Our Story
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-foreground">
              About Sri Kandhaguru Foundation
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Sri Kandhaguru Foundation was established in 2022 by Sri Kandhaguru under the divine guidance of Guru Mouna Siddhar to spread the sacred teachings of Mahaavatar Babaji Shiva Kriya Yogam.
              </p>
              <p>
                The foundation has transformed the lives of more than 50,000 people by guiding them toward spiritual awakening, mental clarity, self-development, and enlightened living. Our mission is to make the ancient wisdom accessible to seekers in the modern world.
              </p>
              <p>
                Through systematic practices and continuous guidance, we help individuals balance their material and spiritual lives, leading to a state of complete harmony.
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <div className="w-full h-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-2xl font-bold">SK</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">Sri Kandhaguru</h4>
                  <p className="text-brand-secondary font-medium">Founder & Spiritual Guide</p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
