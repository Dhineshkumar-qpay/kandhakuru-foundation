"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  ArrowRight,
  UserCheck,
  Shirt,
  BookOpen,
  Calendar,
  MapPin,
  Bird,
  Moon,
  Sun,
  Flame,
  Users,
  Sparkles,
  Activity,
  Heart,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <KriyaYogam />
      <SpiritualPhilosophy />
      <RoleOfReligions />
      <Programs />
      <Eligibility />
      <Gallery />
      <Testimonials />
    </>
  );
}

// Hero section

function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video autoPlay muted loop playsInline width="100%" height="auto">
          <source src="banner/home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-2 z-10 text-center text-white pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Sri Kandhaguru Foundation
          </h1>

          <h2 className="text-2xl md:text-3xl text-brand-accent font-medium mb-8">
            The Way of Life
          </h2>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Guide visitors toward inner peace, self-realization, and holistic
            well-being through the timeless wisdom of Shiva Kriya Yogam.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-brand-primary text-white px-8 py-4 rounded-full font-medium hover:bg-brand-primary/90 transition-all hover:scale-105 shadow-xl shadow-brand-primary/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Join Program <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
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
        <Link
          href="#about"
          className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </Link>
      </motion.div>
    </section>
  );
}

// KriyaYogam

function KriyaYogam() {
  return (
    <section
      id="kriya-yogam"
      className="py-24 bg-brand-primary/5 relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-2 md:px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
              The Way of Life
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
              Kriya Yogam
            </h3>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent"></div>

              <p>
                Kriya Yogam is more than a set of techniques-it is a way of
                life.
              </p>
              <p>
                When practiced with sincerity and consistency, it sharpens the
                mind, opens the heart, and harmonizes the practitioner with the
                universe.
              </p>
              <p>
                This path becomes a lifelong companion, bringing peace, joy, and
                a deep sense of connection that transcends the ordinary. Through
                dedication, Kriya Yogam leads to profound inner transformation.
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
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800')",
                  }}
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

// SpiritualPhilosophy

const floatingParticles = [
  { top: "10%", left: "20%", dur: "3s" },
  { top: "30%", left: "80%", dur: "4s" },
  { top: "70%", left: "15%", dur: "2.5s" },
  { top: "85%", left: "75%", dur: "3.5s" },
  { top: "45%", left: "50%", dur: "5s" },
  { top: "15%", left: "60%", dur: "4.5s" },
  { top: "60%", left: "90%", dur: "3.2s" },
  { top: "25%", left: "40%", dur: "2.8s" },
];

function SpiritualPhilosophy() {
  const religions = [
    {
      name: "Christianity",
      desc: "The path of unconditional love and grace",
      icon: <Bird className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      name: "Islam",
      desc: "The path of absolute devotion and surrender",
      icon: <Moon className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      name: "Buddhism",
      desc: "The path of mindfulness and inner peace",
      icon: <Sun className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
      name: "Hinduism",
      desc: "The path of cosmic understanding and dharma",
      icon: <Flame className="w-8 h-8" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-[#FAFAF9]">
      {/* Luxurious Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-amber-200 to-orange-100 blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-amber-300 to-orange-200 blur-3xl opacity-40 animate-pulse"></div>
      </div>

      {/* Floating Particles (Hydration safe) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/40 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]"
            style={{
              top: particle.top,
              left: particle.left,
              animationDuration: particle.dur,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300"></div>
            <span className="text-sm font-semibold tracking-widest text-amber-700 uppercase">
              Spiritual Philosophy
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-8 tracking-tight">
            One Truth,{" "}
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Many Divine Paths
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-16 px-4 max-w-3xl mx-auto">
            We respectfully acknowledge that every religion provides a unique
            and sacred path toward divine realization. They are all valid
            expressions of humanity's eternal search for Truth.
          </p>

          {/* Highlight Quote Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative group mx-auto max-w-4xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-amber-100 rotate-180 opacity-50" />
              <p className="text-xl md:text-2xl text-slate-800 font-medium italic relative z-10 leading-relaxed text-center">
                "Sanatana Dharma preserves ancient yogic wisdom while deeply
                respecting all faiths. Kriya Yogam is a universal science that
                transcends boundaries."
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Religions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {religions.map((religion, index) => (
            <motion.div
              key={religion.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 rounded-3xl blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-amber-600 mb-6 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] group-hover:scale-110 group-hover:text-amber-500 transition-all duration-500 border border-amber-100/50">
                  {religion.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-wide">
                  {religion.name}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light text-sm">
                  {religion.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// RoleOfReligions
function RoleOfReligions() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-4">
              <span className="text-sm font-semibold tracking-widest text-brand-primary uppercase">
                Divine Connection
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-brand-primary to-transparent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              The Role of Religions in Connecting with the Divine
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Every religion offers a unique path to connect with the Divine. Sincere devotion, regardless of faith, leads to spiritual realization. Figures like Jesus, Muhammad, Buddha, and Ramakrishna Paramahamsa have demonstrated how following a spiritual path can transcend our limits, guiding us to the Divine. While religions like Christianity, Islam, and Buddhism were founded by visionaries, Hinduism stands apart as Sanatana Dharma, an "eternal" path with no single founder.
              </p>
              
              <div className="bg-brand-primary/5 border-l-4 border-brand-primary p-6 rounded-r-2xl">
                <p>
                  In ancient times, Rishis, through deep meditation, channeled divine wisdom that became the Vedas. These texts explored the relationship between Brahma (the Creator) and the individual soul (Purusha), which was simplified into the Upanishads.
                </p>
              </div>
              
              <p>
                The essence of these teachings, including the famous <span className="font-semibold text-gray-900">"Tat Tvam Asi"</span> (You are that), was further distilled into the Bhagavad Gita. In the Gita, Krishna represents divine consciousness, and Arjuna symbolizes the individual consciousness. The Gita teaches paths of realization through Jnana Yoga, Karma Yoga, Bhakti Yoga, and Raja Yoga.
              </p>
            </div>
          </motion.div>
          
          {/* Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 h-full relative mt-12 lg:mt-0"
          >
            {/* Background decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="space-y-4 lg:translate-y-8">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=600" 
                  alt="Spiritual path" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600" 
                  alt="Meditation" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            
            <div className="space-y-4 lg:-translate-y-8">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" 
                  alt="Divine connection" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg group">
                <img 
                  src="https://img.magnific.com/free-photo/focused-young-indian-man-meditating-lotus-pose_1262-12658.jpg?semt=ais_hybrid&w=740&q=80" 
                  alt="Yoga practice" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Programs

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

function Programs() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-[1920px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
              Join Us
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Upcoming Programs
            </h3>
            <p className="text-lg text-gray-600">
              Take the first step towards spiritual transformation by joining
              our upcoming events and sessions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/programs"
              className="hidden md:inline-flex items-center gap-2 text-brand-secondary font-semibold hover:text-brand-primary transition-colors"
            >
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
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
            >
              <Link
                href={`/programs/${program.id}`}
                className="flex flex-col h-full"
              >
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
                  <h4 className="text-2xl font-bold text-foreground mb-6 line-clamp-2 group-hover:text-brand-primary transition-colors">
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
  );
}

// Eligibility
function Eligibility() {
  const requirements = [
    { text: "Minimum Age: 12+ Years", icon: <UserCheck className="w-6 h-6" strokeWidth={1.5} /> },
    { text: "Open to All Backgrounds", icon: <Users className="w-6 h-6" strokeWidth={1.5} /> },
    { text: "No Prior Yoga Experience Required", icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} /> },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-[#FFFDF8]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-amber-100/60 to-orange-50/20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-orange-100/40 to-amber-50/20 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-multiply"></div>
      </div>

      {/* Floating Particles (Hydration safe) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[
          { top: "15%", left: "10%", dur: "3.5s" },
          { top: "45%", left: "85%", dur: "4.2s" },
          { top: "75%", left: "20%", dur: "2.8s" },
          { top: "80%", left: "70%", dur: "5s" },
          { top: "25%", left: "50%", dur: "4.5s" },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/40 rounded-full animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            style={{
              top: particle.top,
              left: particle.left,
              animationDuration: particle.dur,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="text-sm font-semibold tracking-widest text-amber-700 uppercase">
                Participation
              </span>
              <div className="h-px w-20 bg-gradient-to-r from-amber-300 to-transparent"></div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-8 tracking-tight leading-tight">
              Who Can Attend <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                Our Program?
              </span>
            </h2>

            <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
              Our programs are open to everyone. Anyone above 12 years of age is
              eligible to participate and learn Shiva Kriya Yogam.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="bg-white/90 backdrop-blur-xl border border-white p-10 rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-orange-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <ul className="space-y-8 relative z-10">
                {requirements.map((req, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                    className="flex items-center gap-6 group/item"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.04)] group-hover/item:scale-110 group-hover/item:bg-amber-100 transition-all duration-300">
                      {req.icon}
                    </div>
                    <span className="text-xl font-medium text-slate-800 tracking-wide group-hover/item:text-amber-700 transition-colors">
                      {req.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column (Dress Code) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-orange-300/20 rounded-[3rem] blur-3xl transform -rotate-3 scale-105 animate-[pulse_4s_ease-in-out_Infinity]"></div>

            <div className="relative bg-white/80 backdrop-blur-2xl border border-white p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(217,119,6,0.15)] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 flex items-center gap-4 relative z-10">
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                  <Shirt className="w-8 h-8" strokeWidth={2} />
                </div>
                Dress Code
              </h3>

              <p className="text-slate-600 font-light text-xl mb-12 leading-relaxed relative z-10">
                Traditional and comfortable clothing is recommended for ease of
                practice and meditation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 relative z-10">
                <div className="bg-white/95 border border-amber-100/60 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-amber-200/50 shadow-[0_4px_20px_-5px_rgba(251,191,36,0.2)]">
                    <img
                      src="https://png.pngtree.com/png-vector/20221210/ourmid/pngtree-south-indian-man-wearing-veshti-dhoti-png-image_6482891.png"
                      alt="vesti"
                      className="w-12 h-12 object-contain"
                    />
                    
                  </div>
                  <h4 className="text-center text-lg font-semibold text-slate-800">
                    Vesti & Shirt
                  </h4>
                  <p className="text-center text-sm text-slate-500 mt-2 font-light">
                    Traditional wear
                  </p>
                </div>

                <div className="bg-white/95 border border-amber-100/60 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-amber-200/50 shadow-[0_4px_20px_-5px_rgba(251,191,36,0.2)]">
                    <img
                      src="https://e7.pngegg.com/pngimages/850/938/png-clipart-tracksuit-t-shirt-nike-pants-adidas-track-suit-sport-sneakers.png"
                      alt="vesti"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <h4 className="text-center text-lg font-semibold text-slate-800">
                    Track Pants & T-Shirt
                  </h4>
                  <p className="text-center text-sm text-slate-500 mt-2 font-light">
                    Comfortable fit
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/80 border border-amber-200/50 p-6 rounded-2xl flex items-start gap-4 relative z-10 shadow-inner">
                <Heart
                  className="w-8 h-8 text-amber-500 shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <p className="text-base text-amber-900/90 font-medium leading-relaxed">
                  Please wear clean, modest, and comfortable clothing suitable
                  for meditation and yoga practice.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Gallery

const categories = [
  "All",
  "Programs",
  "Meditation",
  "Foundation Activities",
  "Spiritual Gatherings",
];

const galleryImages = [
  {
    id: 1,
    category: "Programs",
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    alt: "Program Session",
  },
  {
    id: 2,
    category: "Meditation",
    src: "https://img.magnific.com/free-photo/focused-young-indian-man-meditating-lotus-pose_1262-12658.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Meditation Practice",
  },
  {
    id: 3,
    category: "Foundation Activities",
    src: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=800",
    alt: "Foundation Activity",
  },
  {
    id: 4,
    category: "Spiritual Gatherings",
    src: "https://scontent.fmaa2-4.fna.fbcdn.net/v/t51.82787-15/731232742_18058841333778949_4401756343962784014_n.jpg?stp=dst-jpegr_tt6&cstp=mx1440x1419&ctp=s1440x1419&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=P6C60Jy2cQ0Q7kNvwEzL6Vx&_nc_oc=AdoJvn7IOy_nDh4MY_FsCm2JUM2VMvCJcxeDBRTF7FV4dumAHcXJNXWcgW6lO6yMwR1ZQGWMOa7c5cU-AI9HtZJh&_nc_zt=23&se=-1&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=wuB7V5xi0Hw_SwfLFKFjgA&_nc_ss=7b2a8&oh=00_AQCV7jFOzbhqc0Szl9qgiMhUYjWK4BfLazdWobF5ry2rKg&oe=6A5C0570",
    alt: "Gathering",
  },
  {
    id: 5,
    category: "Programs",
    src: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=800",
    alt: "Level II Program",
  },
  {
    id: 6,
    category: "Meditation",
    src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    alt: "Peaceful Meditation",
  },
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-gray-100 pb-8">
          <div className="max-w-xl">
            <h2 className="text-xs font-bold tracking-widest text-brand-primary uppercase mb-2">
              Visual Archives
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Our Gallery
            </h3>
          </div>

          {/* Professional Minimalist Filters */}
          <div className="flex flex-wrap gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-2 text-sm font-semibold transition-all duration-300 border-b-2 ${
                  activeCategory === category
                    ? "border-brand-primary text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-[4/3] w-full h-full relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image.src}')` }}
                  ></div>

                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-end">
                      <div>
                        <p className="text-white font-medium text-lg tracking-tight">
                          {image.alt}
                        </p>
                        <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mt-1">
                          {image.category}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                        <ZoomIn size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Professional Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-gray-800 p-3 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged gallery image"
                className="max-w-full max-h-full object-contain shadow-2xl border border-gray-800"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Testimonials

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Software Engineer",
    text: "Shiva Kriya Yogam has completely transformed my approach to life and work. I've found an inner peace that allows me to handle stress with grace. The mental clarity I've gained is truly priceless.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Entrepreneur",
    text: "The teachings at Sri Kandhaguru Foundation are profound yet practical. They don't ask you to leave your worldly duties, but instead teach you how to perform them with a spiritual center. Highly recommended.",
    rating: 5,
  },
  {
    id: 3,
    name: "Dr. Ananya Reddy",
    role: "Physician",
    text: "As a doctor, I was initially skeptical, but the physical and mental benefits of this practice are undeniable. It enhances immunity and brings a deep sense of balance to both body and mind.",
    rating: 5,
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-brand-primary"></span>
              Testimonials
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900">
              Voices of Transformation
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative group"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-gray-100 group-hover:text-brand-primary/10 transition-colors duration-300" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 relative z-10 min-h-[120px]">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-brand-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
