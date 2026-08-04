"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Target, Users, Send, Star, X, ArrowRight } from "lucide-react";
import { addTestimonial } from "../../services/api";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const founderStory = [
    t("about.founder_story_1"),
    t("about.founder_story_2"),
    t("about.founder_story_3"),
    t("about.founder_story_4"),
    t("about.founder_story_5"),
    t("about.founder_story_6"),
    t("about.founder_story_7"),
    t("about.founder_story_8"),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      const res = await addTestimonial({ rating, name, email, message });
      if (res.success) {
        setSuccessMsg("Testimonial submitted successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setRating(5);
      } else {
        alert(res.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to submit testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 bg-white">
      {/* Corporate Foundation Header */}
      <section className="pt-25 pb-0 relative overflow-hidden bg-[#FAFAF9]">
        {/* Luxurious Background Elements */}
        {/* <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-amber-200/50 to-orange-200/30 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-300/30 to-orange-300/30 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div> */}

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full min-h-[150px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-amber-500"></span>
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-700 text-xs font-normal tracking-[0.2em] uppercase border border-amber-200/50 shadow-sm">
              {t("about.our_journey")}
            </span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-amber-500"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight text-center font-normal"
          >
            {t("about.about")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 font-normal">
              {t("about.us")}
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Featured Insight Section - Unified Corporate Card */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row group"
          >
            {/* Image Side */}
            <div className="w-full lg:w-5/12 relative min-h-[400px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                style={{
                  backgroundImage: "url('founder.jpeg')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-gray-900/10"></div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 leading-none">
                    49.1K+
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {t("about.lives_transformed")}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-7/12 p-10 lg:p-16 xl:p-20 flex flex-col justify-center bg-gray-50/50">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-700 text-xs font-semibold mb-8 uppercase tracking-wider shadow-sm w-max">
                {t("about.our_story")}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {t("about.foundation_title")}
              </h2>

              <div className="space-y-6 text-xl text-gray-600 font-light leading-relaxed text-justify">
                <p>{t("about.foundation_p1")}</p>
                <p>
                  {t("about.foundation_p2_1")}{" "}
                  <strong className="text-black font-bold">
                    {t("about.foundation_p2_2")}
                  </strong>
                  {t("about.foundation_p2_3")}
                </p>

                <div className="mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">
                    {t("about.core_belief_title")}
                  </p>
                  <p className="text-gray-500 text-base m-0">
                    {t("about.core_belief_desc")}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <span className="text-brand-primary text-xl font-bold">
                        SK
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        Sri Kandhaguru
                      </h4>
                      <p className="text-brand-primary font-medium text-xs tracking-wide uppercase mt-1">
                        {t("about.founder_role")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 rounded-l-[100px] z-0 hidden lg:block"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Image */}
            <div className="w-full lg:w-5/12 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white bg-slate-100">
                <img
                  src="kandhaguru.jpg"
                  alt="Sri Kandhaguru Guruji"
                  className="w-full h-[500px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber-400/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-blue-400/10 rounded-full filter blur-3xl"></div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-amber-500"></div>
                <span className="text-amber-600 font-bold text-xs tracking-[0.25em] uppercase">
                  {t("about.founders_message")}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-4xl font-black font-normal text-slate-900 mb-8 leading-[1.15] tracking-tight">
                {t("about.life_journey_title1")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  {t("about.life_journey_title2")}
                </span>
              </h2>

              <div className="relative mb-10">
                <span className="absolute -top-6 -left-2 text-7xl text-slate-200 font-serif leading-none opacity-60">
                  "
                </span>
                <p className="text-xl text-slate-600 font-light leading-relaxed italic pl-8 relative z-10 text-justify">
                  {t("about.life_journey_preview")}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="px-8 py-4 bg-brand-primary text-white font-bold text-sm tracking-widest uppercase rounded-[0px] hover:bg-brand-primary transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-brand-primary/20 flex items-center gap-3 group cursor-pointer"
                >
                  {t("about.read_full_story")}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Corporate Layout */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex-1 bg-gray-50 border-t-4 border-brand-primary p-10 lg:p-14 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 flex items-center justify-center text-brand-primary rounded-md">
                  <Eye size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
                  {t("about.our_vision")}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg font-light text-justify">
                {t("about.vision_desc")}
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="flex-1 bg-gray-900 border-t-4 border-brand-accent p-10 lg:p-14 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gray-800 border border-gray-700 flex items-center justify-center text-brand-accent rounded-md">
                  <Target size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight uppercase">
                  {t("about.our_mission")}
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg font-light text-justify">
                {t("about.mission_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
              {t("about.what_we_do")}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {t("about.how_we_make_diff")}
            </h3>
            <div className="w-16 h-1 bg-brand-primary/20 mx-auto mt-6 rounded-full"></div>
            <p className="text-gray-600 mt-6 text-lg font-light leading-relaxed">
              {t("about.what_we_do_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {t("about.srv_edu")}
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                {t("about.srv_edu_desc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {t("about.srv_charity")}
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                {t("about.srv_charity_desc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {t("about.srv_wellness")}
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                {t("about.srv_wellness_desc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3 }}
              className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {t("about.srv_global")}
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                {t("about.srv_global_desc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Form Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
              {t("about.share_exp")}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {t("about.submit_testimonial")}
            </h3>
            <div className="w-16 h-1 bg-brand-primary/20 mx-auto mt-6 rounded-full"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white p-8 md:p-12 rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.1)] border border-gray-100"
          >
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                {successMsg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  {t("about.your_rating")}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-transparent text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t("about.full_name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("about.ph_name")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t("about.email_address")}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("about.ph_email")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t("about.your_message")}
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("about.ph_message")}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary text-white font-bold py-4 px-8 rounded-[0px] shadow-lg hover:bg-brand-primary/90 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {loading ? t("about.submitting") : t("about.submit_testimonial")}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      {/* Sidebar for Founder Story */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[80]"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[550px] bg-white shadow-2xl z-[90] flex flex-col overflow-y-auto"
            >
              <div className="relative h-64 shrink-0 bg-gray-200 overflow-hidden">
                <img
                  src="kandhaguru.jpg"
                  alt="Sri Kandhaguru Guruji"
                  className="w-full h-full object-cover "
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent pointer-events-none"></div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/30 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20 group"
                >
                  <X
                    size={20}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>
                <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                  <h2 className="text-2xl font-black text-white mb-2 font-semibold tracking-tight leading-tight">
                    {t("about.life_journey_title1")} {t("about.life_journey_title2")}
                  </h2>
                </div>
              </div>

              <div className="p-8 md:p-12 flex-grow bg-white">
                <div className="prose prose-slate max-w-none space-y-6">
                  {founderStory.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-gray-700 text-lg leading-relaxed font-medium text-justify whitespace-pre-wrap"
                    >
                      {idx === 0 ? (
                        <span className="first-letter:text-7xl first-letter:font-black first-letter:text-brand-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                          {paragraph}
                        </span>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full py-4 rounded-[0px] bg-brand-primary text-white font-bold tracking-widest uppercase hover:bg-brand-primary transition-colors shadow-lg cursor-pointer text-sm"
                >
                  {t("about.close")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
