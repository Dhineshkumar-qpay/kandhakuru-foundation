"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronRight } from "lucide-react";
import Link from "next/link";

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
  {
    id: 7,
    category: "Foundation Activities",
    src: "https://scontent.fmaa2-3.fna.fbcdn.net/v/t51.82787-15/733963966_18058841408778949_4876287375100716463_n.jpg?stp=dst-jpg_tt6&cstp=mx1440x1416&ctp=s1440x1416&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=YdoOmW25eZsQ7kNvwHGO-Jm&_nc_oc=AdoY-1ZF4bPLTkY1Ox1Ic78CvvzdnMa9m09V1v3ttmF-l8tLsBLXo5nNIBHaZXyK-ensTc_rN7mkrWLmas_JkhGn&_nc_zt=23&_nc_ht=scontent.fmaa2-3.fna&_nc_gid=Qx203spLgmOioTAnFbB-Tw&_nc_ss=7b2a8&oh=00_AQBQWtjJjF6_lVeO3CCVY0Di8RzVe5YQ2FozwbOg8L7l7w&oe=6A5CE8C0",
    alt: "Foundation Outreach",
  },
  {
    id: 8,
    category: "Spiritual Gatherings",
    src: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800",
    alt: "Community Event",
  },
  {
    id: 9,
    category: "Meditation",
    src: "https://scontent.fmaa2-3.fna.fbcdn.net/v/t39.30808-6/486811595_122198317178129648_7700598055592410884_n.jpg?stp=dst-jpg_tt6&cstp=mx1366x2048&ctp=s1366x2048&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=uHRgGVjaTYsQ7kNvwFyYPPd&_nc_oc=AdoXcsK9HknZSP2Jw6iTLnvjnv2jC9D5_I4Z2ghk86CPQIhGrYn4prFHroSRvPwJgjJ8wYLoKkK0Sg_RlGe9FxjG&_nc_zt=23&_nc_ht=scontent.fmaa2-3.fna&_nc_gid=N9wcmWLk-vm2GnJOle5JoA&_nc_ss=7b2a8&oh=00_AQB9LiQa6bItHNi5xNVVLXjfGjKJuLjNoz7mHhpdFGjHlw&oe=6A5CE200",
    alt: "Deep Focus",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      {/* Main Gallery Area */}
      <section className="py-16">
        <div className="container mx-auto pt-20 px-4 max-w-7xl">
          {/* Professional Minimalist Filters */}
          <div className="flex flex-wrap gap-4 md:gap-8 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-2 px-1 text-sm md:text-base font-semibold transition-all duration-300 border-b-2 ${
                  activeCategory === category
                    ? "border-brand-primary text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
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
                  className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm rounded-2xl hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 break-inside-avoid"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-end">
                        <div>
                          <p className="text-white font-bold text-xl tracking-tight">
                            {image.alt}
                          </p>
                          <p className="text-brand-primary text-xs font-bold uppercase tracking-wider mt-1.5">
                            {image.category}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-brand-primary hover:border-brand-primary transition-colors">
                          <ZoomIn size={20} />
                        </div>
                      </div>
                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Professional Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-brand-primary z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged gallery image"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-gray-800/50"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
