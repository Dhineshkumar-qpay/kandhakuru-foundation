"use client";

import {
  Play,
  ArrowRight,
  Video,
  X,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories, getImageVideoUrl, getVideos } from "../../services/api";
import { CategoryModel, VideoModel } from "../../models/image_video_model";

export default function VideosPage() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [page, setPage] = useState(1);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
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

  const fetchVideoList = async (pageNum: number, catId: number | null) => {
    try {
      const res = await getVideos(pageNum, catId);
      if (res.success && res.data && res.data.videos) {
        if (pageNum === 1) {
          setVideos(res.data.videos);
        } else {
          setVideos((prev) => [...prev, ...res.data.videos]);
        }
        setHasMore(
          res.data.meta
            ? res.data.meta.hasNextPage
            : res.data.videos.length === 50,
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchVideoList(1, activeCategory);
  }, [activeCategory]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVideoList(nextPage, activeCategory);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF9] pt-24 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] rounded-full bg-gradient-to-bl from-amber-200/60 to-orange-100/20 blur-[120px]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[100%] rounded-full bg-gradient-to-tr from-orange-200/50 to-amber-100/30 blur-[120px]"></div>
      </div>

      {/* Premium Page Header */}
      <div className="relative z-10 pt-5 pb-12 mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav
            className="flex text-sm font-medium text-slate-500 mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/60">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="hover:text-amber-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-slate-900 font-semibold">
                    Video Library
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-px bg-amber-600"></span>
                <span className="text-sm font-bold tracking-widest text-amber-600 uppercase">
                  Spiritual Wisdom
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 tracking-tight">
                Video{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  Library
                </span>
              </h1>
              <p className="mt-6 text-slate-600 text-sm leading-relaxed font-light">
                Explore our comprehensive collection of talks, guided
                meditations, and spiritual discourses designed to elevate your
                consciousness and bring inner peace.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto flex-shrink-0">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-full p-2 flex items-center border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="pl-4 pr-2 text-slate-400">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search teachings..."
                  className="bg-transparent border-none focus:ring-0 text-slate-700 w-full md:w-64 placeholder:text-slate-400 text-sm"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2.5 transition-colors shadow-md">
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                activeCategory === null
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-white text-slate-600 hover:bg-amber-50"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.categoryid}
                onClick={() => setActiveCategory(category.categoryid)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  activeCategory === category.categoryid
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-amber-50"
                }`}
              >
                {category.categoryname}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group flex flex-col cursor-pointer bg-white/80 backdrop-blur-xl border border-white rounded-[0px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              onClick={() => setActiveVideo(getImageVideoUrl(video.video))}
            >
              {/* Thumbnail Section */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent  group-hover:opacity-90 transition-opacity duration-300">
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

        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors shadow-lg"
            >
              Load More
            </button>
          </div>
        )}
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
    </main>
  );
}
