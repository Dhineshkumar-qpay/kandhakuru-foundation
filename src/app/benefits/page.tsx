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
import { useLanguage } from "../../i18n/LanguageContext";

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const { t } = useLanguage();

  const benefitsList = [
    { icon: Brain, pointsCount: 6 },
    { icon: HeartPulse, pointsCount: 6 },
    { icon: Shield, pointsCount: 4 },
    { icon: Briefcase, pointsCount: 7 },
    { icon: TrendingUp, pointsCount: 6 },
    { icon: Sparkles, pointsCount: 6 },
    { icon: Ban, pointsCount: 6 }
  ].map((item, index) => {
    const points = [];
    for (let i = 0; i < item.pointsCount; i++) {
      points.push(t(`benefits.list.${index}.points.${i}`));
    }
    return {
      title: t(`benefits.list.${index}.title`),
      icon: item.icon,
      intro: t(`benefits.list.${index}.intro`),
      points,
      outro: t(`benefits.list.${index}.outro`),
    };
  });

  return (
    <div className="bg-white">
      {/* Hero Header */}
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
              {t("benefits.label")}
            </span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-amber-500"></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight text-center font-normal"
          >
            {t("benefits.title_prefix")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 font-normal">
              {t("benefits.title_suffix")}
            </span>
          </motion.h1>
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
              viewport={{ once: true, margin: "-50px" }}
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
                    {t("benefits.floating_title")}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {t("benefits.floating_subtitle")}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full lg:w-7/12"
            >
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-8 leading-tight">
                {t("benefits.heading_prefix")}
                <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-400">
                  {t("benefits.heading_highlight")}
                </span>
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-gray-600 font-light leading-relaxed text-justify">
                <p>{t("benefits.intro_1")}</p>
                <p>{t("benefits.intro_2")}</p>

                <div className="mt-12 p-8 bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                    {t("benefits.disclaimer_title")}
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed">
                    {t("benefits.disclaimer_text")}
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
              {t("benefits.tabs_subtitle")}
            </h2>
            <h3 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight">
              {t("benefits.tabs_title")}
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

                    <p className="text-xl text-gray-600 leading-relaxed mb-10 font-light text-justify">
                      {benefitsList[activeTab].intro}
                    </p>

                    <div className="bg-gray-50/80 rounded-2xl p-8 mb-10 border border-gray-100 flex-grow">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                        {t("benefits.key_outcomes")}
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
