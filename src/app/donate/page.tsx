"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Heart,
  Utensils,
  BookOpen,
  HeartPulse,
  TreePine,
  Building2,
  ChevronDown,
  CheckCircle2,
  Quote,
  Users,
  Calendar,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

// --- Data Structures ---

const donationCategories = [
  {
    id: "annadhanam",
    title: "Annadhanam (Food Donation)",
    description: "Sponsor meals for devotees and people in need.",
    icon: Utensils,
    color: "from-orange-400 to-red-500",
    buttonText: "Donate Food",
  },
  {
    id: "spiritual",
    title: "Spiritual Programs",
    description: "Support Shiva Kriya Yogam and meditation programs.",
    icon: Sparkles,
    color: "from-amber-400 to-orange-500",
    buttonText: "Support Programs",
  },
  {
    id: "education",
    title: "Education Support",
    description: "Help provide educational assistance to underprivileged children.",
    icon: BookOpen,
    color: "from-blue-400 to-indigo-500",
    buttonText: "Donate for Education",
  },
  {
    id: "medical",
    title: "Medical Assistance",
    description: "Contribute towards healthcare and emergency medical support.",
    icon: HeartPulse,
    color: "from-rose-400 to-pink-500",
    buttonText: "Donate for Medical Care",
  },
  {
    id: "environment",
    title: "Tree Plantation",
    description: "Support environmental conservation initiatives.",
    icon: TreePine,
    color: "from-emerald-400 to-green-500",
    buttonText: "Donate",
  },
  {
    id: "general",
    title: "General Trust Donation",
    description: "Contribute to the overall activities of the foundation.",
    icon: Building2,
    color: "from-amber-500 to-yellow-500",
    buttonText: "Donate to Trust",
  },
];

const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

const reasonsToDonate = [
  "Feed the Hungry",
  "Spread Spiritual Knowledge",
  "Support Community Welfare",
  "Build a Better Future",
  "Tax Benefit (80G applicable)",
];

const impactStats = [
  { label: "Meals Served", value: "50,000+", icon: Utensils },
  { label: "Programs Conducted", value: "1,200+", icon: Calendar },
  { label: "Lives Impacted", value: "100,000+", icon: Users },
  { label: "Volunteers", value: "500+", icon: Heart },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Regular Donor",
    content:
      "Contributing to the Annadhanam program brings immense peace to my heart. The foundation's work is truly divine.",
  },
  {
    name: "Priya Sharma",
    role: "Volunteer & Donor",
    content:
      "The spiritual programs organized here have transformed my life. I donate so others can experience the same joy.",
  },
  {
    name: "Anand M.",
    role: "Supporter",
    content:
      "Seeing the positive impact on underprivileged children's education makes every contribution worthwhile.",
  },
];

const faqs = [
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes, all donations made to Sri KandhaGuru Foundation are eligible for tax deduction under Section 80G of the Income Tax Act.",
  },
  {
    question: "Can I donate for a specific cause?",
    answer: "Absolutely. You can select your preferred cause (e.g., Annadhanam, Education, Medical) in the donation form below.",
  },
  {
    question: "Will I receive a receipt for my donation?",
    answer: "Yes, a digital receipt will be sent to your registered email address immediately after a successful transaction.",
  },
  {
    question: "Are international donations accepted?",
    answer: "Currently, we accept domestic contributions. For international donations, please contact our support team for specialized routing.",
  },
];

// --- Animation Variants ---
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const formRef = useRef<HTMLDivElement>(null);

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount("");
  };

  const scrollToForm = (categoryId: string = "general") => {
    setSelectedCategory(categoryId);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans selection:bg-brand-primary/20">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-white to-[#FFFDF7] z-10" />
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-brand-primary/5 blur-[120px] mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-brand-accent/5 blur-[100px] mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/50 text-brand-primary font-semibold text-sm mb-6 border border-amber-200/50">
              <Heart size={16} className="fill-brand-primary" />
              <span>Make a Difference Today</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
            >
              Support Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Mission</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Your generous contribution helps us serve humanity through spiritual education, food donation, social welfare, and charitable initiatives.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center gap-4">
              <button
                onClick={() => scrollToForm("general")}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary to-orange-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-brand-primary/30 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                Donate Now <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Donation Categories */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose a Cause</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Select a specific initiative you'd like to support. 100% of your donation directly funds these programs.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {donationCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-[#FFFDF7] rounded-[2rem] p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-amber-200 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-5 rounded-bl-[100px] transition-transform group-hover:scale-110`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                  <cat.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed h-12">{cat.description}</p>
                <button
                  onClick={() => scrollToForm(cat.id)}
                  className="w-full py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-200 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-colors flex justify-center items-center gap-2"
                >
                  {cat.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form & Sidebar Section */}
      <section ref={formRef} className="py-20 bg-[#FFFDF7]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Donation Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-amber-500/5 border border-amber-100/50"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Make a Donation</h2>
              
              <div className="space-y-10">
                {/* Cause Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Select Cause</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 py-4 px-5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all cursor-pointer"
                    >
                      {donationCategories.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Donation Amount</label>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {predefinedAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleAmountClick(amt)}
                        className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl font-bold transition-all border ${
                          amount === amt
                            ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20"
                            : "bg-white text-gray-700 border-gray-200 hover:border-brand-primary/50 hover:bg-amber-50"
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 py-4 pl-10 pr-5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Donor Details</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" placeholder="Full Name *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />
                    <input type="tel" placeholder="Mobile Number *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />
                    <input type="email" placeholder="Email Address *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all md:col-span-2" />
                    <input type="text" placeholder="Address *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all md:col-span-2" />
                    
                    <input type="text" placeholder="City *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />
                    <input type="text" placeholder="State *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />
                    <input type="text" placeholder="Country *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />
                    <input type="text" placeholder="Pincode *" required className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />

                    <input type="text" placeholder="PAN Number (Optional for 80G)" className="w-full bg-gray-50 border border-gray-200 py-3.5 px-5 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all md:col-span-2 uppercase" />
                  </div>
                </div>

                <button className="w-full py-5 rounded-xl bg-gradient-to-r from-brand-primary to-orange-600 text-white font-bold text-lg shadow-[0_8px_25px_-8px_rgba(230,126,34,0.6)] hover:shadow-[0_12px_30px_-8px_rgba(230,126,34,0.8)] transition-all hover:-translate-y-1 flex justify-center items-center gap-2">
                  <ShieldCheck size={22} /> Proceed to Pay {amount || customAmount ? `₹${amount || customAmount}` : ""}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck size={14} /> 100% Secure & Encrypted Payment
                </p>
              </div>
            </motion.div>

            {/* Right: Why Donate & Stats */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-[2rem] p-8 shadow-xl shadow-amber-500/5 border border-amber-100/50"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HeartPulse className="text-brand-primary" /> Why Donate?
                </h3>
                <ul className="space-y-4">
                  {reasonsToDonate.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-secondary shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-700 font-medium">{reason}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-gradient-to-br from-brand-primary to-orange-600 rounded-[2rem] p-8 text-white shadow-xl shadow-brand-primary/20"
              >
                <h3 className="text-xl font-bold mb-8">Our Impact</h3>
                <div className="space-y-6">
                  {impactStats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <stat.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-extrabold">{stat.value}</div>
                        <div className="text-sm font-medium text-white/80">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Words from our Donors</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#FFFDF7] p-8 rounded-3xl border border-amber-100 relative"
              >
                <Quote className="absolute top-8 right-8 text-amber-200/50 w-16 h-16" />
                <p className="text-gray-700 italic relative z-10 mb-8 font-medium">"{test.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-bold text-lg">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{test.name}</h4>
                    <p className="text-xs text-brand-primary font-bold uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#FFFDF7]">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600 leading-relaxed font-medium"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50/50" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Every Contribution Counts</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Your kindness can change a life today. Join us in our journey of serving humanity with love and compassion.
            </p>
            <button
              onClick={() => scrollToForm("general")}
              className="px-10 py-5 rounded-full bg-gray-900 text-white font-bold text-xl hover:bg-brand-primary transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Donate Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
