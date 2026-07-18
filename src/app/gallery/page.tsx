"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronRight } from "lucide-react";
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
          {/* Professional Minimalist Filters */}
          <div className="flex flex-wrap gap-4 md:gap-8 justify-center mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`pb-2 px-1 text-sm md:text-base font-semibold transition-all duration-300 border-b-2 ${
                activeCategory === null
                  ? "border-brand-primary text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.categoryid}
                onClick={() => setActiveCategory(category.categoryid)}
                className={`pb-2 px-1 text-sm md:text-base font-semibold transition-all duration-300 border-b-2 ${
                  activeCategory === category.categoryid
                    ? "border-brand-primary text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-200"
                }`}
              >
                {category.categoryname}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]"
          >
            <AnimatePresence>
              {images.map((image, index) => {
                const styleClass = (() => {
                  switch (index % 7) {
                    case 0:
                      return "col-span-1 md:col-span-1 row-span-1 md:row-span-2";
                    case 1:
                      return "col-span-1 md:col-span-2 row-span-1 md:row-span-1";
                    case 2:
                      return "col-span-2 md:col-span-1 row-span-1 md:row-span-1";
                    case 3:
                      return "col-span-1 md:col-span-1 row-span-1 md:row-span-1";
                    case 4:
                      return "col-span-1 md:col-span-2 row-span-2 md:row-span-2";
                    case 5:
                      return "col-span-2 md:col-span-2 row-span-2 md:row-span-2";
                    case 6:
                      return "col-span-2 md:col-span-2 row-span-1 md:row-span-1";
                    default:
                      return "col-span-1 row-span-1";
                  }
                })();

                return (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`group relative overflow-hidden bg-black rounded-xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${styleClass}`}
                    onClick={() =>
                      setSelectedImage(getImageVideoUrl(image.image))
                    }
                  >
                    <img
                      src={getImageVideoUrl(image.image)}
                      alt={image.title}
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

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
