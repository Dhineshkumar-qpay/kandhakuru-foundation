"use client";

import { Play, ArrowRight, Video, X, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allVideos = [
  {
    id: 1,
    title: "Introduction to Shiva Kriya Yogam",
    description: "Discover the ancient roots and profound benefits of this sacred meditative practice.",
    thumbnail: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=800",
    duration: "12:45",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    category: "Foundation",
    instructor: "Sri Guruji",
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=150",
    date: "Oct 12, 2025"
  },
  {
    id: 2,
    title: "The Power of Deep Meditation",
    description: "Learn how to quiet your mind and connect with your inner divine consciousness.",
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
    duration: "08:30",
    videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
    category: "Meditation",
    instructor: "Sri Guruji",
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=150",
    date: "Nov 05, 2025"
  },
  {
    id: 3,
    title: "Understanding Sanatana Dharma",
    description: "Explore the eternal truths and universal principles guiding our spiritual journey.",
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    duration: "15:20",
    videoUrl: "https://www.youtube.com/embed/86mCBZhnO-Y",
    category: "Philosophy",
    instructor: "Sri Guruji",
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=150",
    date: "Dec 21, 2025"
  },
  {
    id: 4,
    title: "Guru Purnima Celebrations 2025",
    description: "Experience the divine grace and blessings from our latest spiritual gathering.",
    thumbnail: "https://images.unsplash.com/photo-1526413232644-8a40f411b01e?auto=format&fit=crop&q=80&w=800",
    duration: "45:10",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    category: "Events",
    instructor: "Sri Guruji",
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=150",
    date: "Jan 15, 2026"
  },
  {
    id: 5,
    title: "Benefits of Daily Chanting",
    description: "Unlock the vibrational healing power of ancient mantras and sounds.",
    thumbnail: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&q=80&w=800",
    duration: "10:05",
    videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
    category: "Practices",
    instructor: "Sri Guruji",
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=150",
    date: "Feb 02, 2026"
  },
  {
    id: 6,
    title: "Q&A Session with Guruji",
    description: "Answers to common spiritual questions from seekers around the world.",
    thumbnail: "https://images.unsplash.com/photo-1604944985226-79173ebfc486?auto=format&fit=crop&q=80&w=800",
    duration: "55:30",
    videoUrl: "https://www.youtube.com/embed/86mCBZhnO-Y",
    category: "Satsang",
    instructor: "Sri Guruji",
    avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=150",
    date: "Mar 10, 2026"
  }
];

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
          <nav className="flex text-sm font-medium text-slate-500 mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/60">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-slate-900 font-semibold">Video Library</span>
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
                Video <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">Library</span>
              </h1>
              <p className="mt-6 text-slate-600 text-sm leading-relaxed font-light">
                Explore our comprehensive collection of talks, guided meditations, and spiritual discourses designed to elevate your consciousness and bring inner peace.
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
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group flex flex-col cursor-pointer bg-white/80 backdrop-blur-xl border border-white rounded-[0px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              onClick={() => setActiveVideo(video.videoUrl)}
            >
              {/* Thumbnail Section */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                    <Play className="w-6 h-6 text-white ml-1 fill-white" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm tracking-wide">
                    {video.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <Play className="w-3 h-3" /> {video.duration}
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
                      <img src={video.avatar} alt={video.instructor} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{video.instructor}</span>
                        <span className="text-[10px] text-slate-400">{video.date}</span>
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
              <iframe
                width="100%"
                height="100%"
                src={`${activeVideo}?autoplay=1`}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
