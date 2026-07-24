"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Utensils,
  ChevronDown,
  ShieldCheck,
  Building2,
  ArrowRight,
  Landmark,
  Leaf,
  Globe2,
  CheckCircle2,
  CreditCard,
  Building,
  Smartphone,
  Quote,
  Users,
  BookOpen,
} from "lucide-react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const predefinedAmounts = [100, 250, 500, 1000, 5000, 10000];

const faqs = [
  {
    question: "How will my donation be used?",
    answer:
      "Your donation will be directly allocated to the cause you select. Temple construction funds go towards building materials and artisans, while Annadhanam funds are used to purchase groceries and serve fresh meals to devotees and the needy daily.",
  },
  {
    question: "Can I donate for a specific cause?",
    answer:
      "Yes, you can choose either 'Kovil Kattada Thiruppani' or 'Annadhanam Contribution' from the dropdown in the donation form.",
  },
  {
    question: "Are online payments secure?",
    answer:
      "Absolutely. We use industry-standard 256-bit encryption and trusted payment gateways to ensure your transaction is 100% secure and private.",
  },
  {
    question: "Will I receive a donation receipt?",
    answer:
      "Yes, you will receive a digital receipt on your provided email address immediately upon successful payment. This receipt can be used for 80G tax exemptions where applicable.",
  },
];

export default function DonatePage() {
  const [selectedCause, setSelectedCause] = useState("kovil");
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
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

  const scrollToForm = (causeId: string = "kovil") => {
    setSelectedCause(causeId);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans selection:bg-amber-500/20 text-gray-800">
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-orange-50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590050762110-8c2cb5792900?q=80&w=2000&auto=format&fit=crop"
            alt="South Indian Temple"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7] via-orange-100/90 to-orange-50/90 z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-700 font-bold text-xs uppercase tracking-widest mb-6 border border-amber-500/30 backdrop-blur-sm"
            >
              <Heart size={14} className="fill-amber-600" />
              <span>Sacred Offerings</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
            >
              Support Sacred Services Through Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Generous Donation
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Every contribution helps preserve ancient temples, uphold our
              spiritual heritage, and provide nourishing food to devotees and
              those in need.
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                onClick={() => scrollToForm("kovil")}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Donate Now <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Donation Causes Cards */}
      <section className="py-20 relative -mt-16 z-30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cause 1: Temple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-2 shadow-xl shadow-gray-200/50 border border-amber-100 group flex flex-col"
            >
              <div className="h-64 rounded-2xl overflow-hidden relative">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLwOFofqD8Q1ctHekCES98N5-u-WGNWdogcosBXqObmTJr4Pl_wQqL-AIu&s=10"
                  alt="Temple Construction"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
                      <Landmark size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      Temple Construction &
                      <br />
                      Renovation
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  Support the monumental task of constructing and renovating
                  sacred temple spaces, ensuring our spiritual heritage stands
                  tall for generations.
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" /> Temple
                    Construction
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" /> Temple
                    Renovation
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    Preservation of Heritage
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    Spiritual Service
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("kovil")}
                  className="w-full py-4 rounded-xl bg-amber-50 text-amber-700 font-bold hover:bg-amber-500 hover:text-white transition-colors border border-amber-200 hover:border-transparent"
                >
                  Donate for Temple
                </button>
              </div>
            </motion.div>

            {/* Cause 2: Annadhanam */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-2 shadow-xl shadow-gray-200/50 border border-green-100 group flex flex-col"
            >
              <div className="h-64 rounded-2xl overflow-hidden relative">
                <img
                  src="https://static.tildacdn.one/tild3439-6231-4462-b566-363337303932/IMG_4675.JPG"
                  alt="Annadhanam"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shrink-0">
                      <Utensils size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      Annadhanam
                      <br />
                      Contribution
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  Join the highest form of charity by sponsoring fresh,
                  nutritious meals for visiting devotees, spiritual seekers, and
                  the underprivileged.
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> Feed
                    Devotees
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> Serve
                    Humanity
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> Daily
                    Annadhanam
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> Sacred
                    Charity
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("annadhanam")}
                  className="w-full py-4 rounded-xl bg-green-50 text-green-700 font-bold hover:bg-green-600 hover:text-white transition-colors border border-green-200 hover:border-transparent"
                >
                  Donate for Food
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Main Form Section */}
      <section ref={formRef} className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-orange-400 to-green-500"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                Make a Secure Donation
              </h2>
              <p className="text-gray-500 font-medium">
                Please fill out the details below to complete your sacred
                offering.
              </p>
            </div>

            <div className="space-y-10">
              {/* Cause Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  1. Select Cause
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCause === "kovil" ? "border-amber-500 bg-amber-50/50" : "border-gray-100 hover:border-amber-200 bg-gray-50"}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedCause === "kovil" ? "border-amber-500" : "border-gray-300"}`}
                    >
                      {selectedCause === "kovil" && (
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-bold text-gray-800">
                      Kovil Kattada Thiruppani
                    </span>
                  </label>
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCause === "annadhanam" ? "border-green-500 bg-green-50/50" : "border-gray-100 hover:border-green-200 bg-gray-50"}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedCause === "annadhanam" ? "border-green-500" : "border-gray-300"}`}
                    >
                      {selectedCause === "annadhanam" && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-bold text-gray-800">
                      Annadhanam Contribution
                    </span>
                  </label>
                </div>
              </div>

              {/* Donor Information */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                  2. Donor Details
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    className="w-full bg-white border-2 border-gray-100 py-3.5 px-5 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    className="w-full bg-white border-2 border-gray-100 py-3.5 px-5 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    className="w-full bg-white border-2 border-gray-100 py-3.5 px-5 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="PAN Number (Optional for 80G)"
                    className="w-full bg-white border-2 border-gray-100 py-3.5 px-5 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium uppercase"
                  />
                  <input
                    type="text"
                    placeholder="Full Address (Optional)"
                    className="w-full bg-white border-2 border-gray-100 py-3.5 px-5 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium"
                  />
                  <textarea
                    placeholder="Prayer / Dedication Message (Optional)"
                    rows={3}
                    className="w-full bg-white border-2 border-gray-100 py-3.5 px-5 rounded-xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium md:col-span-2 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  3. Donation Amount
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleAmountClick(amt)}
                      className={`py-3 px-2 rounded-xl font-bold transition-all border-2 ${
                        amount === amt
                          ? selectedCause === "annadhanam"
                            ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-600/20"
                            : "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20"
                          : "bg-white text-gray-700 border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="Enter Custom Amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full bg-white border-2 border-gray-100 text-gray-900 py-4 pl-10 pr-5 rounded-xl font-bold focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-lg"
                  />
                </div>
              </div>

              <button className="w-full py-5 rounded-[0px] bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary transition-all shadow-xl hover:shadow-2xl flex justify-center items-center gap-3 group cursor-pointer">
                <ShieldCheck
                  size={24}
                  className="text-white-400 group-hover:scale-110 transition-transform"
                />
                Donate Securely{" "}
                {amount || customAmount ? `( ₹${amount || customAmount} )` : ""}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Donate & Progress Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Why Support Us?
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                title: "Support Temple Construction",
                icon: Landmark,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                title: "Feed the Needy through Annadhanam",
                icon: Utensils,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                title: "Preserve Spiritual Heritage",
                icon: BookOpen,
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                title: "Participate in Divine Service",
                icon: Heart,
                color: "text-rose-600",
                bg: "bg-rose-50",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#FFFDF7] rounded-3xl p-10 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
              Our Current Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-gray-800">
                    Temple Renovation Fund
                  </span>
                  <span className="text-amber-600 font-extrabold">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-amber-500 h-3 rounded-full"
                  ></motion.div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                  <Users size={16} /> 1,240 Devotees Supported
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-gray-800">
                    Monthly Annadhanam Goal
                  </span>
                  <span className="text-green-600 font-extrabold">82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "82%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-green-600 h-3 rounded-full"
                  ></motion.div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                  <Utensils size={16} /> 45,000 Meals Sponsored
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trust Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200/60">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: ShieldCheck,
                title: "Secure Payments",
                desc: "256-bit SSL encryption",
                color: "text-emerald-600",
                bg: "bg-emerald-100/50",
              },
              {
                icon: Globe2,
                title: "Transparent Usage",
                desc: "100% funds go to cause",
                color: "text-blue-600",
                bg: "bg-blue-100/50",
              },
              {
                icon: Heart,
                title: "Trusted Non-Profit",
                desc: "Registered NGO",
                color: "text-rose-600",
                bg: "bg-rose-100/50",
              },
              {
                icon: Building2,
                title: "80G Tax Benefit",
                desc: "Valid tax exemptions",
                color: "text-amber-600",
                bg: "bg-amber-100/50",
              },
            ].map((trust, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center ${trust.bg} ${trust.color} group-hover:scale-110 transition-transform`}
                >
                  <trust.icon size={26} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    {trust.title}
                  </h4>
                  <p className="text-gray-500 text-sm font-medium">
                    {trust.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 bg-[#FFFDF7]">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
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
                  <span className="font-bold text-gray-900 text-lg">
                    {faq.question}
                  </span>
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
    </div>
  );
}
