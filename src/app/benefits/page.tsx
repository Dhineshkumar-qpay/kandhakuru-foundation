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
    <div className="pt-10 bg-white">
      {/* Corporate Foundation Header */}
      <section className="pt-24 pb-12 bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Minimalist background elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 translate-x-20"></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold mb-5 uppercase tracking-[0.2em]"
          >
            Transformation & Growth
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight"
          >
            The Power of
            <span className="text-brand-primary"> Kriya Yogam</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-1 bg-brand-primary/20 mb-5 rounded-full"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-light"
          >
            A holistic spiritual practice combining conscious breathing,
            meditation, and inner awareness to unlock your highest potential.
          </motion.p>
        </div>
      </section>

      {/* Featured Insight Section - High End Magazine / Corporate style */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-5/12 relative"
            >
              {/* Refined minimalist image wrapper */}
              <div className="relative rounded-none overflow-hidden aspect-[4/5] shadow-[20px_20px_0px_0px_rgba(230,126,34,0.1)]">
                <div
                  className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-1000"
                  style={{
                    backgroundImage:
                      "url('https://scontent.fmaa2-4.fna.fbcdn.net/v/t51.82787-15/734718470_18058841381778949_3020303764674608277_n.jpg?stp=dst-jpegr_tt6&cstp=mx1440x1419&ctp=s1440x1419&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=OaR7OL7-_e4Q7kNvwFfi3_k&_nc_oc=AdrWTnVjaH2f7krd5XEQvJfbkTI8lGIEE7bhCi80F8uKkAM2ki1xpqYokAGJsRz9GYh-it5YsxkhphA9W5Ozdzni&_nc_zt=23&se=-1&_nc_ht=scontent.fmaa2-4.fna&_nc_gid=zVXgstML8Z6dwp0hAwaJJQ&_nc_ss=7b2a8&oh=00_AQCSHPV0ssp4e3h-2EvkreWL1_m8L8eJp7YcAafJNbKT4g&oe=6A5C0C4F')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-7/12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-l-4 border-brand-primary pl-6 leading-tight">
                An Integrated Approach to Wellness and Professional Excellence
              </h2>

              <div className="space-y-6 text-xl text-gray-600 font-light leading-relaxed pl-7">
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

                <div className="mt-12 p-8 bg-gray-50 border-l-2 border-gray-300">
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">
                    Disclaimer
                  </p>
                  <p className="text-gray-500 text-base">
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
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              7 Pillars of Transformation
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2">
              {benefitsList.map((benefit, index) => {
                const Icon = benefit.icon;
                const isActive = activeTab === index;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-4 px-6 py-5 rounded-xl transition-all duration-300 text-left ${
                      isActive
                        ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100"
                        : "hover:bg-gray-100/80 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-brand-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                    </div>
                    <span
                      className={`font-semibold text-lg flex-grow ${isActive ? "text-brand-primary" : "text-gray-600"}`}
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
              <div className="bg-white rounded-2xl p-8 lg:p-14 shadow-sm border border-gray-100 h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        {(() => {
                          const ActiveIcon = benefitsList[activeTab].icon;
                          return <ActiveIcon size={32} strokeWidth={1.5} />;
                        })()}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {benefitsList[activeTab].title}
                      </h3>
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed mb-10 font-light">
                      {benefitsList[activeTab].intro}
                    </p>

                    <div className="bg-gray-50 rounded-xl p-8 mb-10 border border-gray-100 flex-grow">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                        Key Outcomes
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {benefitsList[activeTab].points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-brand-primary"></div>
                            <span className="text-gray-700 font-medium">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto border-t border-gray-100 pt-8">
                      <p className="text-lg text-gray-500 italic">
                        "{benefitsList[activeTab].outro}"
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
