"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, MonitorPlay, CheckCircle2, Headphones, Laptop, Clock } from "lucide-react";
import { getEvents, getImageVideoUrl } from "../../services/api";
import { EventModel } from "../../models/event_model";

export default function ProgramsPage() {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents(1);
  }, []);

  const fetchEvents = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await getEvents(pageNum);
      if (response.success && response.data?.events) {
        if (pageNum === 1) {
          setEvents(response.data.events);
        } else {
          setEvents((prev) => [...prev, ...response.data.events]);
        }
        setHasNextPage(response.data.meta.hasNextPage);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchEvents(nextPage);
  };
  return (
    <main className="pt-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center mx-auto"
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
              Explore Our Offerings
            </h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Spiritual Programs
            </h1>
           
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-gray-50 pt-8 pb-4">
        <div className="container mx-auto px-4 max-w-7xl flex justify-center">
          <div className="inline-flex bg-white border border-gray-200 p-1.5 rounded-full shadow-sm">
            <button
              onClick={() => setActiveTab('domestic')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'domestic'
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Domestic Programs
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === 'international'
                  ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              International Programs
            </button>
          </div>
        </div>
      </section>

      {/* Programs Grid Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {activeTab === 'domestic' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
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
                    <h4 className="text-xl font-bold text-gray-900 mb-6 line-clamp-2 group-hover:text-brand-primary transition-colors">
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

              {hasNextPage && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-primary/90 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'international' && (
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] overflow-hidden border border-gray-200 shadow-xl"
              >
                {/* Header */}
                <div className="p-8 text-center border-b border-gray-100">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <MonitorPlay className="w-8 h-8 text-brand-primary" />
                    <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                      Online Program
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium">
                    One-to-one or group sessions as per your preferred timing.
                  </p>
                </div>

                {/* Body */}
                <div className="p-6 md:p-10">
                  <div className="bg-amber-50/40 rounded-3xl border border-amber-100/50 p-6 md:p-10 flex flex-col md:flex-row gap-10 md:gap-14">
                    
                    {/* Left: Illustration Mockup */}
                    <div className="w-full md:w-5/12 flex items-center justify-center relative">
                      <div className="relative w-full aspect-square max-w-[280px] bg-white rounded-3xl border border-amber-100 shadow-sm flex flex-col items-center justify-center overflow-hidden group">
                        <div className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl border border-amber-100 shadow-sm animate-bounce" style={{ animationDuration: '3s' }}>
                          <Clock className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl border border-amber-100 shadow-sm animate-bounce" style={{ animationDuration: '4s' }}>
                          <Calendar className="w-6 h-6 text-brand-primary" />
                        </div>
                        <Laptop className="w-24 h-24 text-brand-primary/80 mb-4 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                        <div className="w-24 h-24 bg-brand-primary/5 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] mix-blend-multiply group-hover:scale-125 transition-transform duration-500"></div>
                        <p className="text-brand-primary font-bold tracking-widest text-sm uppercase relative z-10">Virtual Session</p>
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full md:w-7/12 flex flex-col justify-center">
                      <h4 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Online Kriya Yogam Program
                      </h4>

                      <ul className="space-y-4 mb-10">
                        {[
                          "Learn from the comfort of your home",
                          "Flexible timing as per your convenience",
                          "Personalized guidance",
                          "One-to-one or group sessions"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0" />
                            <span className="text-gray-700 font-semibold text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="flex items-center justify-center gap-3 w-full py-4 px-6 text-center bg-brand-primary text-white font-bold text-lg rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:-translate-y-1">
                        <Calendar className="w-6 h-6" />
                        Book Your Slot
                      </button>

                      <div className="mt-8 flex items-center justify-center gap-3 text-gray-600 bg-white py-3 px-6 rounded-xl border border-gray-100 shadow-sm w-fit mx-auto">
                        <Headphones className="w-6 h-6 text-brand-primary" />
                        <span className="font-semibold text-gray-800">For Enquiries: <a href="tel:+911234567890" className="text-brand-primary hover:underline">+91 12345 67890</a></span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
