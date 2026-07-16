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
    src: "https://scontent.fmaa2-4.fna.fbcdn.net/v/t39.30808-6/486718075_122198317136129648_5350356878139007208_n.jpg?stp=dst-jpg_tt6&cstp=mx1366x2048&ctp=s1366x2048&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=w7hfLEAUgNwQ7kNvwFHB4FG&_nc_oc=Adr6Rzb8Nx4SCH9IGxb9t8_MMcSxjQdy-WjuPvLfgg84tsRBouIVSVb3aYeRSuYzc6aRYORDpRl6IhKLjSz_VfLv&_nc_zt=23&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=SuLbm6f_c_zizeMVCn_Dog&_nc_ss=7b2a8&oh=00_AQC_WgYl0sZuanJyujYT3sFs9x5EqcZRfB5azmWYQYglUg&oe=6A5E8C0A",
    alt: "Program Session",
  },
  {
    id: 2,
    category: "Meditation",
    src: "https://scontent.fmaa2-4.fna.fbcdn.net/v/t39.30808-6/487144762_122198317124129648_6170654583762633426_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=s2048x1536&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=k-f9MkVDsAoQ7kNvwHaUDby&_nc_oc=AdqxEGUDPC1iLIsnZoDqZcEsomOBjQeOgDM_Pe2W2xOPG9WGZe3QQ8RSqac1lyqtbkgZRuuxsZweJVLhV1-XGN88&_nc_zt=23&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=PQGjp7eiF-T-cIV3uHGVrA&_nc_ss=7b2a8&oh=00_AQD9HJxUQpROeRKJ90P-G7mezb-9qkMiSrh8q90am1c86g&oe=6A5E6AFD",
    alt: "Meditation Practice",
  },
  {
    id: 3,
    category: "Foundation Activities",
    src: "https://scontent.fmaa2-4.fna.fbcdn.net/v/t39.30808-6/469692607_122181950810129648_2961953229839701786_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x853&ctp=s1280x853&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=dJeF9244EW0Q7kNvwH3PWPH&_nc_oc=AdrvBmHKGgLtvX_ClSdn6uISdh-EVleO-OQWrzusAczSaCjIL2bF38d2mZNv1hwG-21QrS5OrU31l5iEwaQ6OYs_&_nc_zt=23&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=nP4Tsn9zL25ZlENlmPXhrQ&_nc_ss=7b2a8&oh=00_AQCJff750pKJd4cwM_KeY9IBO1_S42VH2tvuyP5MlKduFQ&oe=6A5E8491",
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
    src: "https://scontent.fmaa2-3.fna.fbcdn.net/v/t51.82787-15/567970680_18025851623778949_2345957150328352155_n.webp?stp=dst-jpg_tt6&cstp=mx1440x810&ctp=s1440x810&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jDLFqYI08TIQ7kNvwF8JAkH&_nc_oc=AdoIHhQVZPF4Ufa8VG3l6QlsLCu4zUFiQYZLmkmnUqvSUkjSZ7odg7goLQziOaSF1w90p6g8bpWROUXUMIJPeIxs&_nc_zt=23&_nc_ht=scontent.fmaa2-3.fna&_nc_gid=reyFRjjkOZ40n89A-ptuyQ&_nc_ss=7b2a8&oh=00_AQDZf76V024ASOXGsik0wTMyt6G2uKGpKbRmyBtGv7PyYw&oe=6A5E7761",
    alt: "Level II Program",
  },
  {
    id: 6,
    category: "Meditation",
    src: "https://scontent.fmaa2-3.fna.fbcdn.net/v/t39.30808-6/486811595_122198317178129648_7700598055592410884_n.jpg?stp=dst-jpg_tt6&cstp=mx1366x2048&ctp=s1366x2048&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=uHRgGVjaTYsQ7kNvwEsfhWh&_nc_oc=AdpgM8uc0iXSO6-tqRP9I2-v846rAQtvXnp6ygbh7_u0PdpZ5qQ19_hcHsRjZF0WpUEK_p81Nq3JIcLdV6D8MhvQ&_nc_zt=23&_nc_ht=scontent.fmaa2-3.fna&_nc_gid=saxax4DdERNIXW4Z7HUCVQ&_nc_ss=7b2a8&oh=00_AQDfhk0dzNtI2-6vO6qgh_bJVoYEe756l08e40tmftzfsg&oe=6A5E6BC0",
    alt: "Peaceful Meditation",
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
