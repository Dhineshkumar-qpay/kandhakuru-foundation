"use client";

import { useState, useEffect } from "react";
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
} from "../services/api";
import { EventModel } from "../models/event_model";
import {
  GalleryModel,
  VideoModel,
  BannerModel,
} from "../models/image_video_model";
import { TestimonialModel } from "../models/contact_model";
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
    </>
  );
}

// Hero section

function Hero() {
  const [heroImages, setHeroImages] = useState<string[]>([
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2xj-V--K9M8rbnjDBiONg42HzmlWGDqA901Poz0OETFvAUJxo",
    "https://scontent.fmaa2-2.fna.fbcdn.net/v/t51.82787-15/733831259_18059112200778949_178341886422952852_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=s1080x1350&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=P616qBrMYe8Q7kNvwGcEvVB&_nc_oc=Adrk3qpNSXUKGtZe4dKSeCGOMF0fzM6D2hzDzW-o5PVc7XaL-YNJNRgYHiWu5EHzSSFtzv_dcx-f-UcVTL6i5frI&_nc_zt=23&_nc_ht=scontent.fmaa2-2.fna&_nc_gid=BETKhbRkD0-4r0vRSckmpA&_nc_ss=7b2a8&oh=00_AQDCzvauezlAVjPQhvJGE2ItPMuBH8GGQ4xOHaHgJ_hOsQ&oe=6A5E7BB3",
    "https://scontent.fmaa2-4.fna.fbcdn.net/v/t51.82787-15/735238499_18058841468778949_2465957740438833201_n.jpg?stp=dst-jpg_tt6&cstp=mx1440x1416&ctp=s1440x1416&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-7HUPVxPBOgQ7kNvwFt6qVq&_nc_oc=Adrmioa_ICXvvQ1qCHj3o0TdBdAfVGAlxo1ZtqL67iDfmvrZT1MVsLtELDBLmBn79R7WTxFF_zBL3yPkzzr1tCqC&_nc_zt=23&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=-qAeNjVcNLXWXdqpcl2VdA&_nc_ss=7b2a8&oh=00_AQASh2yv5gnz1cyO3u85L7yux5mAQgebzvDkhnXz_I3aZw&oe=6A5E7E4D",
  ]);

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

      <div className="container mx-auto px-4 lg:px-8 z-10 text-white pt-20 h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
              The Way of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Kriya Yogam
              </span>
            </h1>

            <p className="text-lg md:text-lg text-white/90 mb-10 leading-relaxed drop-shadow-md max-w-2xl mx-auto lg:mx-0">
              Guide visitors toward inner peace, self-realization, and holistic
              well-being through the timeless wisdom of Shiva Kriya Yogam.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/contact"
                className="bg-brand-primary text-white px-8 py-4 rounded-[0rem] font-medium hover:bg-brand-primary/90 transition-all hover:scale-105 shadow-xl shadow-brand-primary/30 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Join Us <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-[0rem] font-medium hover:bg-white/20 transition-all hover:scale-105 shadow-xl w-full sm:w-auto justify-center flex"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end hidden md:flex"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-[0_0_50px_rgba(251,191,36,0.3)] backdrop-blur-md group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent z-20 mix-blend-overlay pointer-events-none"></div>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex]}
                  alt="Spiritual Journey"
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover object-center z-10"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
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
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/07/16/46/44/360_F_716464441_DvxUkPchxMPozb2zAFof1DHEze2dxKHG.jpg')",
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
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src="https://scontent.fmaa2-4.fna.fbcdn.net/v/t51.82787-15/732026674_18059112143778949_8418241914655641321_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=s1080x1350&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=fNUe62sblx8Q7kNvwHto6RT&_nc_oc=AdorVC5vgCRIpcX7dK8okbbqX-gShmgL0CITRM3YboJcsSeEByBFPggXaO0qixZQl8hBuSdhiV1y8RkhDYq47ZET&_nc_zt=23&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=bWCk6oBXQFqtMSzW1K7tPA&_nc_ss=7b2a8&oh=00_AQCP6M20aMxBgTTpF0vVs0qXIjXydOAmp4OoyG0i3X4jNA&oe=6A5E70C5"
                  alt="Spiritual path"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src="https://scontent.fmaa2-1.fna.fbcdn.net/v/t51.82787-15/703474180_18052060787778949_8457861926810728480_n.jpg?stp=dst-jpg_tt6&cstp=mx1079x721&ctp=s1079x721&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rr34U8XjS3AQ7kNvwGTUKJI&_nc_oc=AdoAHGg9fTHLPKnouseZtPVNhzTzKwPNvXJaC7G6dZmOSQsmGM56Id_sLoC95V2Ip29qTImMT222JTL6syz1q7c1&_nc_zt=23&_nc_ht=scontent.fmaa2-1.fna&_nc_gid=wRvhZKYCnSBd515i8y7-pA&_nc_ss=7b2a8&oh=00_AQDDiBEtDXIDsrXfRoMSBefL6h03fSb9tqmZiUa-Aq1qKA&oe=6A5E7966"
                  alt="Meditation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="space-y-4 lg:-translate-y-8">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src="https://scontent.fmaa2-3.fna.fbcdn.net/v/t51.82787-15/581966390_18028738976778949_2554845895955878752_n.jpg?stp=dst-jpegr_tt6&cstp=mx1440x1080&ctp=s1440x1080&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JDd93tpvO08Q7kNvwESuiZ7&_nc_oc=AdqZ5ughy3BkZiTPz-8QnYLzze4CoAEfhXXCixwGnpN5eRgKcVm4Iok_X7RKxnwV-LgxYF3ba5WOXTmY9hfb64cL&_nc_zt=23&se=-1&_nc_ht=scontent.fmaa2-3.fna&_nc_gid=K7RcVl4vfzumzuRVzG0Bcg&_nc_ss=7b2a8&oh=00_AQC-m1r9iXqvajnHAWgC7wl_m6hRUgFmjw-Xe-yzfp7bpQ&oe=6A5E903F"
                  alt="Divine connection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg group">
                <img
                  src="https://scontent.fmaa2-4.fna.fbcdn.net/v/t39.30808-6/487097612_122198317190129648_108626807348356310_n.jpg?stp=dst-jpg_tt6&cstp=mx1366x2048&ctp=s1366x2048&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qQ8am27LUQsQ7kNvwFWFT45&_nc_oc=AdquWX3wlSotAdhUOCFMvjnhCf2l3EKZR__0uAz1dJ0dlub31fns4W6I-bSmtPGV-gyoS0EVmmkZaFuAz8L-AnD7&_nc_zt=23&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=AIBK6FNmOcQQHnV5GN1Edg&_nc_ss=7b2a8&oh=00_AQCLzVov-if6lOq50isrlSfsQph8tQcMW23QfuelVoitRw&oe=6A5E8940"
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
        const response = await getEvents(1,"offline");
        if (response.success && response.data?.events) {
          setEvents(response.data.events.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to load events", error);
      }
    };
    fetchEvents();
  }, []);

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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex-grow flex flex-col">
                  <h4 className="text-2xl font-bold text-foreground mb-6 line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {program.title}
                  </h4>

                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex items-start gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                      <span className="font-medium">
                        {new Date(program.eventdate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">
                        {program.address}, {program.city}, {program.state}
                      </span>
                    </div>
                  </div>

                  {program.status === "active" ? (
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
    {
      text: "Minimum Age: 12+ Years",
      icon: <UserCheck className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      text: "Open to All Backgrounds",
      icon: <Users className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      text: "No Prior Yoga Experience Required",
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
    },
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
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="text-sm font-semibold tracking-widest text-amber-700 uppercase">
                Participation
              </span>
              <div className="h-px w-20 bg-gradient-to-r from-amber-300 to-transparent"></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-8">
              Who Can Attend <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                Our Program?
              </span>
            </h2>

            <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
              Our programs are open to everyone. Anyone above 12 years of age is
              eligible to participate and learn Shiva Kriya Yogam.
            </p>

            <div className="bg-white/90 backdrop-blur-xl border border-white p-10 rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-orange-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <ul className="space-y-8 relative z-10">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-6 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.04)] group-hover/item:scale-110 group-hover/item:bg-amber-100 transition-all duration-300">
                      {req.icon}
                    </div>
                    <span className="text-xl font-medium text-slate-800 tracking-wide group-hover/item:text-amber-700 transition-colors">
                      {req.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Dress Code) */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-orange-300/20 rounded-[3rem] blur-3xl transform -rotate-3 scale-105 animate-[pulse_4s_ease-in-out_Infinity]"></div>

            <div className="relative bg-white/80 backdrop-blur-2xl border border-white p-10 md:p-14 rounded-[1rem] shadow-[0_20px_50px_-15px_rgba(217,119,6,0.15)] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-6 flex items-center gap-4 relative z-10">
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
          </div>
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
                    src={getImageVideoUrl(video.thumbnail)}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                    <Play className="w-6 h-6 text-white ml-1 fill-white" />
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
                          {new Date(video.createdAt).toLocaleDateString()}
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
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
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
              className="relative max-w-3xl w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                src={activeVideo}
                className="w-full h-full"
              ></video>
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

  const books = [
    {
      title: "ஸ்ரீ மகாவதார் பாபாஜியின் சிவ கிரியா யோகம்",
      language: "Tamil",
      price: "₹399",
      image:
        "https://rukminim2.flixcart.com/image/1280/1280/xif0q/book/o/m/5/shree-mahavatar-babaji-s-shiva-kriya-yogam-original-imahfgekkfqtpwyq.jpeg?q=90",
      link: "/shop",
    },
    {
      title: "SHREE MAHAVATAR BABAJI’S SHIVA KRIYA YOGAM",
      language: "English",
      price: "₹399",
      image:
        "https://rukminim2.flixcart.com/image/1280/1280/xif0q/book/d/3/z/shree-mahavatar-babaji-s-shiva-kriya-yogam-original-imahfgc8pyk2phjw.jpeg?q=90",
      link: "/shop",
    },
  ];

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
              View Full Store <ArrowRight size={16} />
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
              className="bg-white border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row group"
            >
              <div className="w-full sm:w-2/5 bg-gray-50 relative border-b sm:border-b-0 sm:border-r border-gray-100 p-4 flex items-center justify-center">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full max-h-64 object-contain transform group-hover:scale-105 transition-transform duration-500 shadow-sm"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="inline-block bg-gray-100 text-gray-600 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest mb-4">
                    {book.language} Edition
                  </div>
                  <h3
                    className={`font-bold text-gray-900 leading-tight mb-4 ${book.language === "Tamil" ? "text-xl" : "text-lg"}`}
                  >
                    {book.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-brand-primary">
                    {book.price}
                  </span>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        openLogin();
                      } else {
                        router.push(book.link);
                      }
                    }}
                    className="flex items-center gap-2 bg-brand-primary text-white font-bold py-2 px-6 rounded-[0px] hover:bg-brand-primary transition-colors text-sm"
                  >
                    <ShoppingCart size={16} /> Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
