"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  HeartPulse,
  Shield,
  Briefcase,
  TrendingUp,
  Sparkles,
  Ban,
  ChevronRight,
} from "lucide-react";

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const benefitsList = [
    {
      title: "Mental Clarity",
      icon: Brain,
      intro:
        "Modern life often fills the mind with constant thoughts, stress, distractions, and emotional overload. Kriya Yogam helps calm the mind through controlled breathing and meditation.",
      points: [
        "Improved concentration and focus",
        "Better decision-making abilities",
        "Enhanced memory and mental alertness",
        "Reduced stress and mental fatigue",
        "Greater emotional stability",
        "Increased mindfulness and awareness of the present moment",
      ],
      outro:
        "A clear mind allows individuals to approach personal and professional challenges with confidence and balance.",
    },
    {
      title: "Physical Health",
      icon: HeartPulse,
      intro:
        "Kriya Yogam promotes harmony between the body and mind by encouraging proper breathing, relaxation, and balanced living.",
      points: [
        "Improve overall energy levels",
        "Enhance breathing efficiency",
        "Promote better posture and body awareness",
        "Support healthy sleep patterns",
        "Reduce physical tension caused by stress",
        "Encourage healthier lifestyle habits",
      ],
      outro:
        "While Kriya Yogam can support general wellness, it is not intended to replace professional medical treatment.",
    },
    {
      title: "Disease-Resistant Immunity",
      icon: Shield,
      intro:
        "Chronic stress can weaken the body's natural defense mechanisms. Meditation and mindful breathing may help the body manage stress more effectively.",
      points: [
        "Help reduce stress-related hormonal imbalance",
        "Support the body's natural healing processes",
        "Promote relaxation and recovery",
        "Encourage a healthier immune response as part of an overall healthy lifestyle",
      ],
      outro:
        "A strong immune system depends on many factors, including nutrition, exercise, sleep, and medical care. Kriya Yogam should be considered a supportive practice rather than a guaranteed method of preventing illness.",
    },
    {
      title: "Progress in Profession",
      icon: Briefcase,
      intro:
        "Kriya Yogam does not directly create career success, but it can help develop qualities that contribute to professional growth.",
      points: [
        "Focus and productivity",
        "Leadership qualities",
        "Emotional intelligence",
        "Communication skills",
        "Problem-solving ability",
        "Patience during difficult situations",
        "Confidence and self-discipline",
      ],
      outro:
        "These personal qualities can positively influence career development and workplace performance.",
    },
    {
      title: "Increase in Income",
      icon: TrendingUp,
      intro:
        "Kriya Yogam does not directly increase financial income. However, by improving clarity, discipline, and decision-making, it may help individuals perform more effectively in their careers or businesses.",
      points: [
        "Better work performance",
        "Increased motivation",
        "Improved time management",
        "Enhanced creativity",
        "Smarter financial and career decisions",
        "Greater consistency in achieving personal goals",
      ],
      outro:
        "Financial growth ultimately depends on many external factors, including skills, opportunities, and effort.",
    },
    {
      title: "Awakening of the Soul",
      icon: Sparkles,
      intro:
        "One of the primary goals of Kriya Yogam is spiritual awakening and self-realization.",
      points: [
        "Develop deeper self-awareness",
        "Experience inner peace",
        "Discover greater purpose in life",
        "Strengthen compassion and kindness",
        "Feel a deeper connection with themselves and the universe",
        "Explore higher states of consciousness",
      ],
      outro:
        "Many spiritual traditions describe this journey as moving beyond the limitations of the ego toward a more profound understanding of one's true nature.",
    },
    {
      title: "Removal of Unwanted Thoughts & Negative Energy",
      icon: Ban,
      intro:
        'In spiritual traditions, "negative energy" often refers to negative emotional and mental patterns such as fear, anger, anxiety, stress, resentment, and excessive worry.',
      points: [
        "Reduce mental restlessness",
        "Manage anxiety and stress",
        "Improve emotional balance",
        "Let go of negative thinking patterns",
        "Develop a more positive outlook on life",
        "Cultivate inner calm and resilience",
      ],
      outro:
        "This process supports emotional well-being and helps create a more peaceful and balanced mind.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1920')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold mb-6 uppercase tracking-[0.2em] rounded-full shadow-lg"
          >
            Transformation & Growth
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            The Power of
            <span className="text-brand-primary block mt-2"> Kriya Yogam</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1.5 bg-brand-primary mb-6 rounded-full shadow-sm"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-sm"
          >
            A holistic spiritual practice combining conscious breathing,
            meditation, and inner awareness to unlock your highest potential.
          </motion.p>
        </div>
      </section>

      {/* Featured Insight Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 rounded-bl-[100px] -z-10"></div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className="w-full lg:w-5/12 relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                  style={{
                    backgroundImage: "url('babaji.jpg')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-80"></div>
              </div>

              {/* Floating element */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden md:flex"
              >
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                    Inner Peace
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    Holistic well-being
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              className="w-full lg:w-7/12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                An Integrated Approach to{" "}
                <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-400">
                  Wellness
                </span>
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                <p>
                  When practiced regularly under proper guidance, Kriya Yogam
                  may contribute significantly to physical, mental, emotional,
                  and spiritual well-being.
                </p>
                <p>
                  Our methods allow you to systematically dismantle stress,
                  optimize cognitive functions, and anchor yourself in profound
                  peace—equipping you with the resilience needed to excel in
                  today's fast-paced environment.
                </p>

                <div className="mt-12 p-8 bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                    Disclaimer
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed">
                    Individual experiences vary. This should be viewed as a
                    complementary wellness practice rather than a replacement
                    for medical care.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Corporate Tabs Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100 relative">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">
              Holistic Benefits
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              7 Pillars of Transformation
            </h3>
            <div className="w-16 h-1 bg-brand-primary/20 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {benefitsList.map((benefit, index) => {
                const Icon = benefit.icon;
                const isActive = activeTab === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-300 text-left group ${
                      isActive
                        ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-brand-primary/10 ring-1 ring-brand-primary/5"
                        : "hover:bg-white/60 border border-transparent hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-110"
                          : "bg-white border border-gray-200 text-gray-400 group-hover:text-brand-primary"
                      }`}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                    </div>
                    <span
                      className={`font-semibold text-lg flex-grow transition-colors ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"}`}
                    >
                      {benefit.title}
                    </span>
                    {isActive && (
                      <ChevronRight
                        size={20}
                        className="text-brand-primary shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content Display Area */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white h-full relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10"></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full relative z-10"
                  >
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center border border-brand-primary/20">
                        {(() => {
                          const ActiveIcon = benefitsList[activeTab].icon;
                          return <ActiveIcon size={32} strokeWidth={1.5} />;
                        })()}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        {benefitsList[activeTab].title}
                      </h3>
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed mb-10 font-light">
                      {benefitsList[activeTab].intro}
                    </p>

                    <div className="bg-gray-50/80 rounded-2xl p-8 mb-10 border border-gray-100 flex-grow">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                        Key Outcomes
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                        {benefitsList[activeTab].points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 group/item"
                          >
                            <div className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover/item:bg-brand-primary transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary group-hover/item:bg-white transition-colors"></div>
                            </div>
                            <span className="text-gray-700 font-medium text-[15px] leading-snug">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto border-t border-gray-100 pt-8">
                      <p className="text-lg text-gray-500 italic font-light leading-relaxed">
                        &quot;{benefitsList[activeTab].outro}&quot;
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
