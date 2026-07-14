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
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <KriyaYogam />
      <SpiritualPhilosophy />
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
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517482811402-990db86d2fc0?auto=format&fit=crop&q=80&w=2000')",
        }}
      >
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
            Guide visitors toward inner peace, self-realization, and holistic
            well-being through the timeless wisdom of Shiva Kriya Yogam.
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
function SpiritualPhilosophy() {
  const religions = [
    {
      name: "Christianity",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      name: "Islam",
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      name: "Buddhism",
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    { name: "Hinduism", color: "bg-rose-100 text-rose-800 border-rose-200" },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-2 md:px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-primary/5 rounded-3xl p-8 md:p-16 border border-brand-primary/10 relative overflow-hidden"
        >
          {/* Decorative watermark icon */}
          <div className="absolute -right-10 -top-10 text-brand-primary/5">
            <BookOpen size={300} strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
                Spiritual Philosophy
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                The Role of Religions in Connecting with the Divine
              </h3>
            </div>

            <div className="text-center max-w-3xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <p>
                We respectfully acknowledge that every religion provides a
                unique and sacred path toward divine realization.
              </p>
              <p>
                Whether it is the path of love in{" "}
                <span className="font-semibold">Christianity</span>, the
                devotion in <span className="font-semibold">Islam</span>, the
                mindfulness of <span className="font-semibold">Buddhism</span>,
                or the cosmic understanding in{" "}
                <span className="font-semibold">Hinduism</span>—all are valid
                expressions of humanity's search for Truth.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {religions.map((religion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-6 py-3 rounded-full border font-semibold ${religion.color}`}
                >
                  {religion.name}
                </motion.div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-accent/20 text-center">
              <p className="text-xl font-medium text-gray-800">
                <span className="text-brand-primary font-bold">
                  Sanatana Dharma
                </span>{" "}
                preserves ancient yogic wisdom while deeply respecting all
                faiths. Kriya Yogam is a universal science that anyone from any
                background can practice to enhance their own spiritual journey.
              </p>
            </div>
          </div>
        </motion.div>
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
      <div className="container mx-auto px-2 md:px-4">
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
              <Link href={`/programs/${program.id}`} className="flex flex-col h-full">
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
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-2 md:px-4 max-w-7xl">
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
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Who Can Attend our program?
            </h3>
            <p className="text-gray-600 text-lg">
              Our programs are open to everyone. Anyone above{" "}
              <span className="font-bold text-brand-primary">
                12 years of age
              </span>{" "}
              is eligible to participate and learn Shiva Kriya Yogam.
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
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Dress Code
            </h3>
            <p className="text-gray-600 text-lg mb-4">
              Traditional and comfortable wear is recommended for ease of
              practice.
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
                        <p className="text-white font-medium text-lg tracking-tight">{image.alt}</p>
                        <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mt-1">{image.category}</p>
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  return (
    <section className="py-24 bg-brand-primary/5 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-brand-primary/10">
        <Quote size={120} />
      </div>

      <div className="container mx-auto px-2 md:px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Participant Experiences
          </h3>
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
                  <Star
                    key={i}
                    className="w-6 h-6 fill-brand-accent text-brand-accent"
                  />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-10 italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div>
                <h4 className="text-xl font-bold text-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-brand-secondary mt-1">
                  {testimonials[currentIndex].role}
                </p>
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
                    currentIndex === idx
                      ? "bg-brand-primary w-8"
                      : "bg-brand-primary/30"
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
