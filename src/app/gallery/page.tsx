"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import {
  getCategories,
  getGallery,
  getImageVideoUrl,
} from "../../services/api";
import { CategoryModel, GalleryModel } from "../../models/image_video_model";
import { useLanguage } from "../../i18n/LanguageContext";

export default function GalleryPage() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryModel[]>([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCats();
  }, []);

  const fetchImages = async (pageNum: number, catId: number | null) => {
    if (pageNum === 1) setLoading(true);
    try {
      const res = await getGallery(pageNum, catId);
      if (res.success && res.data) {
        const galleryArr = Array.isArray(res.data)
          ? res.data
          : res.data.images || [];
        if (pageNum === 1) {
          setImages(galleryArr);
        } else {
          setImages((prev) => [...prev, ...galleryArr]);
        }

        const hasNext = res.data.meta
          ? res.data.meta.hasNextPage
          : galleryArr.length === 50;
        setHasMore(hasNext);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (pageNum === 1) setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchImages(1, activeCategory);
  }, [activeCategory]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage, activeCategory);
  };

  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white border-b border-gray-100">
        {/* Ambient Background Elements */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-orange-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4">
              <span className="bg-brand-primary/10 text-brand-primary font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest border border-brand-primary/20">
                {t("gallery.visual_journey")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              {t("gallery.captured")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-500">{t("gallery.moments")}</span>
            </h1>
            <p className="text-lg text-gray-600 mx-auto leading-relaxed font-medium">
              {t("gallery.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="py-16 relative z-20 -mt-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Professional Modern Filters */}
          <div className="bg-white/80 backdrop-blur-xl p-2 md:p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-200/50 flex flex-wrap gap-2 justify-center mb-12 max-w-fit mx-auto relative z-30">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === null
                ? "bg-gradient-to-r from-brand-primary to-orange-500 text-white shadow-lg shadow-brand-primary/25"
                : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              {t("gallery.all_highlights")}
            </button>
            {categories.map((category) => (
              <button
                key={category.categoryid}
                onClick={() => setActiveCategory(category.categoryid)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === category.categoryid
                  ? "bg-gradient-to-r from-brand-primary to-orange-500 text-white shadow-lg shadow-brand-primary/25"
                  : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {category.categoryname}
              </button>
            ))}
          </div>

          {/* Staggered Grid */}
          <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[240px]">
            {loading && page === 1 ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`shimmer-${index}`}
                  className="bg-white border border-gray-100 rounded-3xl animate-pulse w-full h-full flex items-center justify-center shadow-sm"
                >
                  <ImageIcon className="text-gray-300 w-12 h-12" />
                </div>
              ))
            ) : (
              <>
                {images.map((image, index) => {
                  let spanClasses = "col-span-1 row-span-1";

                  // Staggered pattern logic
                  if (index % 7 === 0) {
                    spanClasses = "col-span-2 row-span-2";
                  } else if (index % 5 === 0) {
                    spanClasses = "col-span-2 row-span-1 md:col-span-2 md:row-span-1";
                  } else if (index % 3 === 0) {
                    spanClasses = "col-span-1 row-span-2 md:col-span-1 md:row-span-2";
                  }

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
                      key={image.id}
                      className={`group relative overflow-hidden bg-gray-100 rounded-3xl cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-gray-200/50 ${spanClasses}`}
                      onClick={() => setSelectedImage(getImageVideoUrl(image.image))}
                    >
                      <img
                        src={getImageVideoUrl(image.image)}
                        alt={image.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Premium Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-3 shadow-sm">
                            {image.categoryname}
                          </span>
                          <h3 className="text-white font-black text-xl leading-snug drop-shadow-md line-clamp-2">
                            {image.title}
                          </h3>
                        </div>
                      </div>

                      <div className="absolute top-5 right-5 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-white border border-white/40 shadow-lg">
                        <ZoomIn size={20} />
                      </div>
                    </motion.div>
                  )
                })}
              </>
            )}
          </div>

          {!loading && images.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t("gallery.no_images")}</h3>
              <p className="text-gray-500 font-medium">{t("gallery.try_selecting")}</p>
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-16">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-10 py-4 bg-white text-brand-primary border-2 border-brand-primary font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-colors shadow-[0_8px_20px_rgb(0,0,0,0.04)] disabled:opacity-50"
              >
                {loading ? t("gallery.loading") : t("gallery.load_more")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-4 rounded-full z-50 backdrop-blur-xl border border-white/10 shadow-2xl"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8
              }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged gallery image"
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
