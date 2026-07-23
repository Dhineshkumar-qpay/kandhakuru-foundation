"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Target, Users, Send, Star } from "lucide-react";
import { addTestimonial } from "../../services/api";

export default function AboutPage() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('about.jpeg')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gray-900/70"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 text-xs font-bold mb-6 uppercase tracking-[0.2em] rounded-full shadow-lg"
          >
            About Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md"
          >
            Empowering Humanity Through
            <br className="hidden md:block" />
            <span className="text-brand-primary"> Ancient Wisdom</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-1.5 bg-brand-primary mb-6 rounded-full shadow-sm"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-sm"
          >
            Dedicated to transforming lives through spiritual awakening, mental
            clarity, and enlightened living since 2022.
          </motion.p>
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
                  backgroundImage:
                    "url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR2xj-V--K9M8rbnjDBiONg42HzmlWGDqA901Poz0OETFvAUJxo')",
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
                    Lives Transformed
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-7/12 p-10 lg:p-16 xl:p-20 flex flex-col justify-center bg-gray-50/50">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-gray-700 text-xs font-semibold mb-8 uppercase tracking-wider shadow-sm w-max">
                Our Story
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Sri Kandhaguru Foundation
              </h2>

              <div className="space-y-6 text-xl text-gray-600 font-light leading-relaxed text-justify">
                <p>
                  Sri Kandhaguru Foundation was established in 2022 by Sri
                  Kandhaguru, a revered spiritual master committed to sharing
                  the sacred teachings of Mahaavatar Babaji Shiva Kriya Yogam.
                  Acting upon the divine guidance of Guru Mouna Siddhar, Sri
                  Kandhaguru founded this organisation with a single purpose —
                  to make the transformative power of Kriya Yogam accessible to
                  all.
                </p>
                <p>
                  Since its inception, the foundation has touched and
                  transformed the lives of more than{" "}
                  <strong className="text-black font-bold">
                    50,000 people
                  </strong>
                  , guiding them toward spiritual awakening, inner balance, and
                  enlightened living. Through the profound practice of Shiva
                  Kriya Yogam, countless individuals have not only experienced
                  deep spiritual growth but have also achieved self-development,
                  mental clarity, and remarkable progress in their personal and
                  professional lives.
                </p>

                <div className="mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">
                    Our Core Belief
                  </p>
                  <p className="text-gray-500 text-base m-0">
                    At Sri Kandhaguru Foundation, we believe that enlightenment
                    is not a distant goal but a living experience available to
                    everyone. Our mission is to continue spreading this ancient,
                    powerful yogic science across the world, helping each seeker
                    discover the limitless potential within.
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
                        Founder & Spiritual Guide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg font-light text-justify">
                To create a world where every individual has access to essential
                resources and support, ensuring that basic needs such as food,
                shelter, healthcare, and education are met. We envision a
                compassionate and equitable society where the foundation's
                efforts in providing these necessities empower individuals and
                communities to thrive, fostering a harmonious environment where
                everyone has the opportunity to live with dignity and purpose.
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
                  Our Mission
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg font-light text-justify">
                To disseminate the teachings of Kriya Yogam, fostering spiritual
                growth, inner peace, and holistic well-being. We are dedicated
                to guiding individuals on their journey towards self-realization
                and enlightenment through authentic Kriya Yogam practices,
                rooted in ancient wisdom and adapted for contemporary needs. Our
                mission is to build a supportive community where practitioners
                can explore and deepen their connection with themselves and the
                world around them.
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
              What We Do
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              How We Make a Difference
            </h3>
            <div className="w-16 h-1 bg-brand-primary/20 mx-auto mt-6 rounded-full"></div>
            <p className="text-gray-600 mt-6 text-lg font-light leading-relaxed">
              Our multifaceted approach ensures that every aspect of human
              growth—spiritual, physical, mental, and social—is nurtured. Here
              is an in-depth look at the foundational pillars of our daily work.
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
                Spiritual Education & Retreats
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                We conduct regular workshops, seminars, and intensive retreats
                focusing on the ancient science of Shiva Kriya Yogam. These
                programs are meticulously designed to teach advanced meditation
                techniques, dynamic breathwork (pranayama), and profound
                spiritual philosophy. Seekers of all levels are given
                personalized guidance to experience true inner silence and
                accelerated spiritual evolution.
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
                Community Service & Charity
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                Our foundation actively participates in massive humanitarian
                efforts. We organize widespread food distribution drives
                (Annadanam), set up free rural health camps, and provide vital
                educational support and scholarships for underprivileged
                children. We believe that translating spiritual values into
                compassionate, tangible action is the highest form of worship.
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
                Holistic Wellness & Ayurveda
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                Beyond spiritual teachings, we strongly emphasize the
                inseparable connection between the mind, body, and spirit. We
                offer comprehensive guidance on ancient Ayurvedic lifestyle
                practices, proper yogic diet (Sattvic food), and mindful daily
                living habits to help individuals achieve vibrant physical
                health, emotional stability, and unparalleled mental clarity.
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
                Global Outreach & Online Programs
              </h4>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                To ensure that geographical boundaries do not limit spiritual
                growth, we have expanded our reach through interactive digital
                platforms. We host weekly global live-streamed guided
                meditations, extensive online courses, and one-on-one virtual
                mentoring sessions, allowing thousands of international seekers
                to easily stay connected and practice from their homes.
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
              Share Your Experience
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Submit a Testimonial
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
                  Your Rating
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary text-white font-bold py-4 px-8 rounded-[0px] shadow-lg hover:bg-brand-primary/90 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {loading ? "Submitting..." : "Submit Testimonial"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
