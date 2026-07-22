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

export default function GalleryPage() {
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
    <div className="bg-white min-h-screen">
      {/* Main Gallery Area */}
      <section className="py-16">
        <div className="container mx-auto pt-20 px-4 max-w-7xl">
          {/* Professional Modern Filters */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${activeCategory === null
                ? "bg-brand-primary text-white shadow-md shadow-brand-primary/30 scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md"
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.categoryid}
                onClick={() => setActiveCategory(category.categoryid)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${activeCategory === category.categoryid
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/30 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md"
                  }`}
              >
                {category.categoryname}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]"
          >
            {loading && page === 1 ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`shimmer-${index}`}
                  className="bg-gray-200 animate-pulse rounded-xl w-full h-full flex items-center justify-center"
                >
                  <ImageIcon className="text-gray-400 w-12 h-12 opacity-50" />
                </div>
              ))
            ) : (
              <>
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden bg-black rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() =>
                      setSelectedImage(getImageVideoUrl(image.image))
                    }
                  >
                    <img
                      src={getImageVideoUrl(image.image)}
                      alt={image.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />

                    {/* Bento Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-white font-bold text-lg md:text-xl tracking-tight leading-tight line-clamp-1">
                          {image.title}
                        </p>
                        <p className="text-gray-300 text-xs font-bold uppercase tracking-wider mt-1 line-clamp-1">
                          {image.categoryname}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-brand-primary text-white font-semibold rounded-full hover:bg-brand-primary/90 transition-colors shadow-lg"
              >
                Load More
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
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, y: -20, rotate: 90 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -20, rotate: -90 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-brand-primary p-4 rounded-full z-50 backdrop-blur-md border border-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={28} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: -40 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.8
              }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center perspective-[1000px]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged gallery image"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/20 ring-1 ring-black/50"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
