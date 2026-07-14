"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisionMission() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="vision-mission" className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 rounded-l-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 lg:gap-16"
        >
          {/* Vision Card */}
          <motion.div variants={itemVariants} className="group h-full">
            <div className="h-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(230,126,34,0.1)] transition-all duration-500 relative overflow-hidden z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                <Eye size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-3xl font-bold mb-6 text-foreground">Our Vision</h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a world where every individual has access to essential resources and support, ensuring that basic needs such as food, shelter, healthcare, and education are met. We envision a compassionate and equitable society where the foundation&apos;s efforts empower individuals and communities to thrive with dignity and purpose.
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div variants={itemVariants} className="group h-full">
            <div className="h-full bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgb(46,125,50,0.1)] transition-all duration-500 relative overflow-hidden z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-8 group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-500">
                <Target size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                To disseminate the teachings of Kriya Yogam, fostering spiritual growth, inner peace, and holistic well-being. We are dedicated to guiding individuals toward self-realization through authentic Kriya Yogam practices rooted in ancient wisdom.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
