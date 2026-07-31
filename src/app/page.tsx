"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getEvents,
  getGallery,
  getImageVideoUrl,
  getVideos,
  getTestimonials,
  getBanners,
  getProducts,
  isYouTubeUrl,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  addToCart,
  getVideoTestimonials,
  BASEURL,
} from "../services/api";
import { ProductModel } from "../models/product_model";
import { EventModel } from "../models/event_model";
import {
  GalleryModel,
  VideoModel,
  BannerModel,
} from "../models/image_video_model";
import {
  TestimonialModel,
  VideoTestimonialModel,
} from "../models/contact_model";
import {
  CheckCircle2,
  Loader2,
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
  Play,
  Video,
  ShoppingCart,
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
      <BookShopPreview />
      <Gallery />
      <Videos />
      <Testimonials />
      <VideoTestimonials />
    </>
  );
}

// Hero section

function Hero() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBanners();
        if (res.success && res.data && res.data.length > 0) {
          setHeroImages(
            res.data.map((b: BannerModel) => getImageVideoUrl(b.image)),
          );
        }
      } catch (error) {
        console.error("Failed to load banners", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Background Video & Overlays */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="banner/home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 z-10 text-white pt-24 h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 lg:gap-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-3/5 text-center lg:text-left pt-10 lg:pt-0"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-semibold text-white tracking-tight mb-6 leading-[1.1] drop-shadow-xl">
              The Way of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500">
                Kriya Yogam
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium border-l-2 border-amber-400/50 pl-6">
              Guide your soul toward inner peace and holistic well-being through
              the timeless, transformative wisdom of Shiva Kriya Yogam.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-[0px] font-bold hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Begin Journey <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="bg-white/5 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-[0px] font-bold hover:bg-white/10 hover:border-white/40 transition-all hover:-translate-y-1 flex items-center w-full sm:w-auto justify-center"
              >
                Discover More
              </Link>
            </div>
          </motion.div>

          {/* Right Image Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end hidden md:flex"
          >
            <div className="relative w-64 h-[300px] md:w-80 md:h-[380px] lg:w-[350px] lg:h-[450px] rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-20 pointer-events-none"></div>

              {heroImages.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={heroImages[currentImageIndex]}
                    alt="Spiritual Journey"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-center z-10"
                  />
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 bg-white/5 backdrop-blur-md z-10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                </div>
              )}

              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 z-30 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl transform rotate-[-5deg]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Divine Peace</p>
                    <p className="text-white/70 text-xs">Join our community</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white"
      >
        <Link
          href="#kriya-yogam"
          className="flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
            Explore
          </span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-amber-500/80 to-transparent rounded-full"></div>
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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-8">
              Kriya Yogam
            </h3>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed relative text-justify">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary via-brand-secondary to-transparent "></div>

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
                    backgroundImage: "url('babaji.jpg')",
                    objectFit: "contain",
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
      {/* Professional Fixed Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center opacity-70 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('about.jpeg')",
        }}
      ></div>

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
        <div className="flex flex-col items-center">
          {/* Main Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl bg-white/60 backdrop-blur-3xl border border-white/50 p-10 md:p-16 rounded-[0rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] mb-20 text-center relative overflow-hidden"
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <span className="inline-block py-1.5 px-4 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-amber-200/50 shadow-sm">
                Spiritual Philosophy
              </span>

              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                One Truth,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 font-light">
                  Many Paths
                </span>
              </h2>

              <p className="text-lg md:text-xl text-slate-700 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                We respectfully acknowledge that every religion provides a
                unique and sacred path toward divine realization. They are all
                valid expressions of humanity's eternal search for Truth.
              </p>

              <div className="relative px-8 py-8 bg-white/50 rounded-2xl border border-white/60 italic text-slate-800 font-medium shadow-[inset_0_2px_15px_rgba(255,255,255,0.7)]">
                <Quote className="absolute top-4 left-4 w-6 h-6 text-amber-500/30 rotate-180" />
                "Sanatana Dharma preserves ancient yogic wisdom while deeply
                respecting all faiths. Kriya Yogam is a universal science that
                transcends boundaries."
                <Quote className="absolute bottom-4 right-4 w-6 h-6 text-amber-500/30" />
              </div>
            </div>
          </motion.div>

          {/* Religions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {religions.map((religion, index) => (
              <motion.div
                key={religion.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.7 }}
                className="group h-full"
              >
                <div className="relative h-full bg-white/40 backdrop-blur-2xl border border-white/60 p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/60 hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-amber-50/50 flex items-center justify-center text-amber-600 mb-6 shadow-sm border border-white group-hover:scale-110 group-hover:text-orange-500 transition-all duration-500 relative z-10">
                    {religion.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight relative z-10">
                    {religion.name}
                  </h3>

                  <p className="text-slate-600 leading-relaxed font-light text-sm relative z-10">
                    {religion.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
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

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              The Role of Religions in Connecting with the Divine
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify">
              <p>
                Every religion offers a unique path to connect with the Divine.
                Sincere devotion, regardless of faith, leads to spiritual
                realization. Figures like Jesus, Muhammad, Buddha, and
                Ramakrishna Paramahamsa have demonstrated how following a
                spiritual path can transcend our limits, guiding us to the
                Divine. While religions like Christianity, Islam, and Buddhism
                were founded by visionaries, Hinduism stands apart as Sanatana
                Dharma, an "eternal" path with no single founder.
              </p>

              <div className="bg-brand-primary/5 border-l-4 border-brand-primary p-6 rounded-r-2xl">
                <p>
                  In ancient times, Rishis, through deep meditation, channeled
                  divine wisdom that became the Vedas. These texts explored the
                  relationship between Brahma (the Creator) and the individual
                  soul (Purusha), which was simplified into the Upanishads.
                </p>
              </div>

              <p>
                The essence of these teachings, including the famous{" "}
                <span className="font-semibold text-gray-900">
                  "Tat Tvam Asi"
                </span>{" "}
                (You are that), was further distilled into the Bhagavad Gita. In
                the Gita, Krishna represents divine consciousness, and Arjuna
                symbolizes the individual consciousness. The Gita teaches paths
                of realization through Jnana Yoga, Karma Yoga, Bhakti Yoga, and
                Raja Yoga.
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
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="drivine-1.jpg"
                  alt="Spiritual path"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="drivine-2.jpg"
                  alt="Meditation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="space-y-4 lg:-translate-y-8">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="drivine-3.jpg"
                  alt="Divine connection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg group">
                <img
                  src="drivine-4.jpg"
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

function Programs() {
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents("offline", "level1");
        if (response.success && response.data?.events) {
          setEvents(response.data.events.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to load events", error);
      }
    };
    fetchEvents();
  }, []);

  if (events.length === 0) return null;

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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4">
              Our Programs
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
              className="text-brand-primary font-bold hover:text-brand-secondary transition-colors inline-flex items-center gap-1 text-sm uppercase tracking-wider group"
            >
              View All Programs{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
            >
              <Link
                href={`/programs/${program.id}`}
                className="flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('${getImageVideoUrl(program.image)}')`,
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {/* Highlight City Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-white/50 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10 group-hover:-translate-y-1 transition-transform duration-300">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                    <span className="text-[11px] font-black tracking-widest uppercase text-brand-primary">
                      {program.city}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 flex-grow flex flex-col relative bg-white">
                  {/* Floating Date Badge */}
                  <div className="absolute -top-8 left-6 md:left-8 bg-brand-primary text-white p-2 rounded-2xl shadow-xl flex flex-col items-center justify-center min-w-[4rem] group-hover:-translate-y-1 transition-transform duration-300 border-2 border-white">
                    <span className="text-lg font-black leading-none">
                      {new Date(program.eventdate).getDate()}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
                      {new Date(program.eventdate).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-gray-900 mt-6 mb-4 line-clamp-2 group-hover:text-brand-primary transition-colors leading-snug">
                    {program.title}
                  </h4>

                  <div className="space-y-3 mb-6 flex-grow border-t border-gray-100 pt-4">
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-1 group-hover:text-brand-primary transition-colors" />
                      <span className="text-sm font-medium leading-relaxed">
                        {program.address},{" "}
                        <span className="text-gray-900 font-bold">
                          {program.city}
                        </span>
                        , {program.state}
                      </span>
                    </div>
                  </div>

                  {program.status === "active" ? (
                    <span className="block w-full py-3 px-6 text-center bg-gray-50 border border-gray-200 text-brand-primary font-bold rounded-xl group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all duration-300 shadow-sm uppercase tracking-wider text-xs">
                      View Details
                    </span>
                  ) : (
                    <span className="block w-full py-3 px-6 text-center bg-gray-100 text-gray-400 font-bold rounded-xl uppercase tracking-wider text-xs">
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
    {
      text: "Minimum Age: 12+ Years",
      icon: <UserCheck className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
      text: "Open to All Backgrounds",
      icon: <Users className="w-5 h-5" strokeWidth={2.5} />,
    },
    {
      text: "No Prior Yoga Experience Required",
      icon: <Sparkles className="w-5 h-5" strokeWidth={2.5} />,
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-slate-50 font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-amber-400/20 to-orange-300/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-400/10 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="px-5 py-2 rounded-full bg-amber-50 border border-amber-200/60 text-xs font-black tracking-[0.2em] text-amber-700 uppercase shadow-sm">
                Participation
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-[1.15]">
              Who Can Attend <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                Our Program?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-lg">
              Our programs are designed for universal access. Anyone above 12
              years of age is eligible to participate and learn the sacred
              science of Shiva Kriya Yogam.
            </p>

            <div className="bg-white/80 backdrop-blur-2xl border border-slate-200/60 p-8 md:p-10 rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative group overflow-hidden">
              <ul className="space-y-5 relative z-10">
                {requirements.map((req, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-5 group/item bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm group-hover/item:text-amber-600 group-hover/item:border-amber-300 group-hover/item:scale-110 transition-all duration-300">
                      {req.icon}
                    </div>
                    <span className="text-lg font-bold text-slate-700 group-hover/item:text-slate-900 transition-colors">
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column (Dress Code) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-300/20 rounded-[3rem] blur-3xl transform -rotate-6 scale-105 pointer-events-none"></div>

            <div className="relative bg-white/90 backdrop-blur-3xl border border-slate-200/60 p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                  <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-900/20">
                    <Shirt className="w-7 h-7" strokeWidth={2} />
                  </div>
                  Dress Code
                </h3>
              </div>

              <p className="text-slate-600 font-medium text-lg mb-10 leading-relaxed">
                Traditional and comfortable clothing is strictly recommended to
                ensure ease of practice, meditation, and respect for the ashram
                environment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 border border-slate-200 shadow-sm">
                    <img
                      src="https://png.pngtree.com/png-vector/20221210/ourmid/pngtree-south-indian-man-wearing-veshti-dhoti-png-image_6482891.png"
                      alt="vesti"
                      className="w-16 h-16 object-contain drop-shadow-sm"
                    />
                  </div>
                  <h4 className="text-center text-base font-bold text-slate-900">
                    Vesti & Shirt
                  </h4>
                  <p className="text-center text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                    Traditional
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-24 h-24 mx-auto bg-white rounded-3xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 border border-slate-200 shadow-sm">
                    <img
                      src="https://e7.pngegg.com/pngimages/850/938/png-clipart-tracksuit-t-shirt-nike-pants-adidas-track-suit-sport-sneakers.png"
                      alt="Tracksuit"
                      className="w-16 h-16 object-contain drop-shadow-sm"
                    />
                  </div>
                  <h4 className="text-center text-base font-bold text-slate-900">
                    Track Pants & Tee
                  </h4>
                  <p className="text-center text-xs text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                    Comfortable
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
                <Heart
                  className="w-6 h-6 text-amber-600 shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <p className="text-sm text-amber-900 font-bold leading-relaxed">
                  Please wear clean, modest, and comfortable clothing. Tight or
                  revealing outfits are not permitted during the sessions.
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

function Gallery() {
  const [images, setImages] = useState<GalleryModel[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await getGallery(1, null);
        if (response.success && response.data) {
          const galleryArr = Array.isArray(response.data)
            ? response.data
            : response.data.images || response.data.gallery || [];
          setImages(galleryArr.slice(0, 10));
        }
      } catch (error) {
        console.error("Failed to load gallery", error);
      }
    };
    fetchGallery();
  }, []);

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-b border-gray-100 pb-8">
          <div className="max-w-xl">
            <h2 className="text-xs font-bold tracking-widest text-brand-primary uppercase mb-2">
              Visual Archives
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Our Gallery
            </h3>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <Link
              href="/gallery"
              className="text-brand-primary font-bold hover:text-brand-secondary transition-colors inline-flex items-center gap-1 text-sm uppercase tracking-wider group"
            >
              View All{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Gallery Grid - Corporate Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:auto-rows-[250px]">
          <AnimatePresence>
            {images.map((image, index) => {
              // Bento Box Grid Logic
              let spanClass =
                "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto"; // Default small square
              if (index === 0)
                spanClass =
                  "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto";
              // Featured Large
              else if (index === 3 || index === 4)
                spanClass =
                  "md:col-span-2 md:row-span-1 aspect-[2/1] md:aspect-auto"; // Wide

              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm rounded-xl hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 ${spanClass}`}
                  onClick={() =>
                    setSelectedImage(getImageVideoUrl(image.image))
                  }
                >
                  <img
                    src={getImageVideoUrl(image.image)}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-end">
                      <div>
                        <p className="text-white font-bold text-xl tracking-tight">
                          {image.title}
                        </p>
                        <p className="text-brand-primary text-xs font-bold uppercase tracking-wider mt-1.5">
                          {image.categoryname}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-brand-primary hover:border-brand-primary transition-colors">
                        <ZoomIn size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
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
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-gray-800 p-3 rounded-full z-50"
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

function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialModel[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();
        if (response.success && response.data) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
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
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative group"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-gray-100 group-hover:text-brand-primary/10 transition-colors duration-300" />

              <div className="flex gap-1 mb-6">
                {[...Array(Math.floor(testimonial.rating) || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 relative z-10 min-h-[120px] text-justify">
                "{testimonial.message}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-brand-secondary">Reviewer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Videos
function Videos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoModel[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos(1, null);
        if (response.success && response.data && response.data.videos) {
          setVideos(response.data.videos.slice(0, 10));
        }
      } catch (error) {
        console.error("Failed to load videos", error);
      }
    };
    fetchVideos();
  }, []);

  if (videos.length === 0) return null;

  return (
    <section className="py-20 relative overflow-hidden bg-[#FAFAF9]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-amber-200/50 to-orange-100/20 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-orange-200/40 to-amber-100/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-amber-900/5 pb-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-amber-600"></span>
              Sacred Teachings
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Video Library
            </h3>
          </div>

          <Link
            href="/videos"
            className="text-brand-primary font-bold hover:text-brand-secondary transition-colors inline-flex items-center gap-1 text-sm uppercase tracking-wider group"
          >
            View Full Library
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group flex flex-col cursor-pointer bg-white/80 backdrop-blur-xl border border-white rounded-[0px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              onClick={() => setActiveVideo(getImageVideoUrl(video.video))}
            >
              {/* Thumbnail Section */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-90 transition-opacity duration-300">
                  <img
                    src={
                      isYouTubeUrl(video.video)
                        ? getYouTubeThumbnailUrl(video.video)
                        : ""
                    }
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                    <Play className="w-5 h-5 text-white ml-1 fill-white" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm tracking-wide">
                    {video.categoryname}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xl leading-tight mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400">
                          {new Date(video.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>
                      </div>
                    </div>
                    <span className="text-amber-600 font-semibold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Watch <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/45 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white hover:bg-white/10 transition-all bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-full z-50"
              onClick={() => setActiveVideo(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="relative max-w-3xl w-full aspect-video bg-black rounded-[0px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {isYouTubeUrl(activeVideo) ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(activeVideo)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <video
                  width="100%"
                  height="100%"
                  controls
                  autoPlay
                  src={activeVideo || ""}
                  className="w-full h-full"
                ></video>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Book Shop Preview
function BookShopPreview() {
  const { isLoggedIn, openLogin } = useAuth();
  const router = useRouter();

  const [books, setBooks] = useState<ProductModel[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null,
  );
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);
  const [buyingNowId, setBuyingNowId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getProducts("book");
        if (response.success && response.data) {
          setBooks(response.data.slice(0, 2));
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  if (books.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-bold uppercase tracking-widest text-xs mb-3 block border-l-2 border-brand-primary pl-2">
              Official Publications
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Spiritual Wisdom in Print
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors"
            >
              View Shop <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {books.map((book, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row group cursor-pointer"
              onClick={() => setSelectedProduct(book)}
            >
              <div className="w-full sm:w-2/5 bg-gray-50 relative border-b sm:border-b-0 sm:border-r border-gray-100 p-4 flex items-center justify-center">
                <img
                  src={getImageVideoUrl(book.image)}
                  alt={book.productname}
                  className="w-full max-h-64 object-contain transform group-hover:scale-105 transition-transform duration-500 shadow-sm"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 leading-tight mb-2 text-lg line-clamp-2">
                    {book.productname}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {book.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    {book.sellingprice && book.sellingprice > 0 ? (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{book.price}
                        </span>
                        <span className="text-2xl font-extrabold text-brand-primary">
                          ₹{book.sellingprice}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-extrabold text-brand-primary">
                        ₹{book.price}
                      </span>
                    )}
                  </div>
                  <button
                    disabled={addingToCartId === book.id}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (!isLoggedIn) {
                        openLogin();
                      } else {
                        try {
                          setAddingToCartId(book.id);
                          await addToCart({ productid: book.id });
                          window.dispatchEvent(new Event("cartUpdated"));
                          window.dispatchEvent(new Event("openCart"));
                        } catch (error) {
                          console.error(error);
                        } finally {
                          setAddingToCartId(null);
                        }
                      }
                    }}
                    className="flex items-center gap-2 bg-brand-primary text-white font-bold py-2 px-6 rounded-[0px] hover:bg-brand-primary/90 transition-colors text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {addingToCartId === book.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <ShoppingCart size={16} />
                    )}
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            ></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[0px] shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 relative">
                <img
                  src={getImageVideoUrl(selectedProduct.image)}
                  alt={selectedProduct.productname}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-2 inline-block bg-brand-primary/10 px-3 py-1 rounded-full w-fit">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {selectedProduct.productname}
                </h2>

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex flex-col">
                    {selectedProduct.sellingprice &&
                      selectedProduct.sellingprice > 0 ? (
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black text-gray-900">
                          ₹{selectedProduct.sellingprice}
                        </span>
                        <span className="text-lg text-gray-400 line-through font-medium">
                          ₹{selectedProduct.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-black text-gray-900">
                        ₹{selectedProduct.price}
                      </span>
                    )}
                  </div>
                  {selectedProduct.sellingprice &&
                    selectedProduct.sellingprice > 0 &&
                    selectedProduct.price > selectedProduct.sellingprice ? (
                    <span className="bg-red-50 text-red-600 font-bold px-2 py-1 rounded text-sm">
                      {Math.round(
                        ((selectedProduct.price -
                          selectedProduct.sellingprice) /
                          selectedProduct.price) *
                        100,
                      )}
                      % OFF
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                {selectedProduct.size && (
                  <>
                    <div className="mb-2">
                      Size : <strong>{selectedProduct.size}</strong>
                    </div>
                  </>
                )}

                <div className="prose prose-sm text-gray-600 mb-8 flex-grow">
                  <p className="leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  {selectedProduct.benefits &&
                    selectedProduct.benefits.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-900 mb-3">
                          Benefits:
                        </h4>
                        <ul className="space-y-2">
                          {selectedProduct.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2
                                size={16}
                                className="text-brand-primary shrink-0 mt-1"
                              />
                              <div>
                                <span className="font-bold text-gray-800">
                                  {benefit.title}
                                </span>
                                {benefit.description && (
                                  <span className="text-gray-600 ml-1">
                                    - {benefit.description}
                                  </span>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <button
                    disabled={addingToCartId === selectedProduct.id}
                    onClick={async () => {
                      if (!isLoggedIn) {
                        openLogin();
                      } else {
                        try {
                          setAddingToCartId(selectedProduct.id);
                          await addToCart({ productid: selectedProduct.id });
                          window.dispatchEvent(new Event("cartUpdated"));
                          window.dispatchEvent(new Event("openCart"));
                          setSelectedProduct(null);
                        } catch (error) {
                          console.error(error);
                        } finally {
                          setAddingToCartId(null);
                        }
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary font-bold py-4 rounded-[0px] hover:bg-brand-primary/5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {addingToCartId === selectedProduct.id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <ShoppingCart size={20} />
                    )}
                    {addingToCartId === selectedProduct.id
                      ? "Adding..."
                      : "Add to Cart"}
                  </button>
                  <button
                    disabled={buyingNowId === selectedProduct.id}
                    onClick={async () => {
                      if (!isLoggedIn) {
                        openLogin();
                      } else {
                        try {
                          setBuyingNowId(selectedProduct.id);
                          await addToCart({ productid: selectedProduct.id });
                          window.dispatchEvent(new Event("cartUpdated"));
                          router.push(`/checkout`);
                        } catch (error) {
                          console.error(error);
                          setBuyingNowId(null);
                        }
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-4 rounded-[0px] hover:bg-brand-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer disabled:opacity-75"
                  >
                    {buyingNowId === selectedProduct.id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : null}
                    {buyingNowId === selectedProduct.id
                      ? "Processing..."
                      : "Buy Now"}
                    {!buyingNowId || buyingNowId !== selectedProduct.id ? (
                      <ArrowRight size={20} />
                    ) : null}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Video Testimonials
function VideoTestimonials() {
  const [videoTestimonials, setVideoTestimonials] = useState<
    VideoTestimonialModel[]
  >([]);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideoTestimonials = async () => {
      try {
        const response = await getVideoTestimonials();
        if (response.success && response.data) {
          setVideoTestimonials(response.data);
        }
      } catch (error) {
        console.error("Failed to load video testimonials", error);
      }
    };
    fetchVideoTestimonials();
  }, []);

  if (videoTestimonials.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|youtubecomwatchv=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <section className="py-24 bg-[#FAFAF9] relative overflow-hidden border-t border-gray-100">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-amber-600"></span>
              Real Stories
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Video Experiences
            </h3>
          </div>

          {videoTestimonials.length > 3 && (
            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-sm hover:shadow-md"
                aria-label="Scroll left"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all shadow-sm hover:shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {videoTestimonials.map((testimonial, index) => {
            const videoId = getYouTubeId(testimonial.videourl);
            const isPlaying = activeVideoId === testimonial.id;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex-none w-[85vw] sm:w-[20rem] md:w-[22rem] snap-center bg-white rounded-[1rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.15)] overflow-hidden group transition-all duration-500 flex flex-col"
              >
                <div
                  className="aspect-[16/10] w-full bg-slate-900 relative cursor-pointer overflow-hidden flex-shrink-0"
                  onClick={() => setActiveVideoId(testimonial.id)}
                >
                  {isPlaying ? (
                    <iframe
                      src={getYouTubeEmbedUrl(testimonial.videourl, true)}
                      title={testimonial.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full absolute inset-0 border-0"
                    ></iframe>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10 pointer-events-none"></div>
                      {videoId ? (
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                          alt={testimonial.title}
                          className="w-full h-full object-cover absolute inset-0 z-0 transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : null}

                      <div className="absolute top-5 left-5 z-20 pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 shadow-sm">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                            Experience
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                          <Play className="w-5 h-5 text-white ml-1 fill-white" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-start relative bg-white">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-amber-500/10 group-hover:text-amber-500/20 transition-colors duration-300" />
                  <h5 className="font-bold text-slate-900 text-lg md:text-xl mb-4 line-clamp-2 pr-8 leading-tight group-hover:text-amber-600 transition-colors">
                    {testimonial.title}
                  </h5>
                  <p className="text-slate-500 leading-relaxed font-light text-sm line-clamp-3 italic">
                    "{testimonial.description}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
