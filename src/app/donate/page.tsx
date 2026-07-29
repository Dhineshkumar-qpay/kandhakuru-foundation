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
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { addDonor } from "../../services/api";

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

  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("India");
  const [pannumber, setPannumber] = useState("");
  const [aadhaarnumber, setAadhaarnumber] = useState("");
  const [passportnumber, setPassportnumber] = useState("");
  const [donortype, setDonortype] = useState("domestic");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [error, setError] = useState("");

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
              <span>Sacred Offerings</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 mb-6 tracking-tight leading-tight "
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
                className="px-10 py-4 rounded-[0px] bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2 cursor-pointer"
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
      <section ref={formRef} className="py-24 relative overflow-hidden bg-[#FAFAF9]">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none"></div>

            <div className="text-center mb-10 relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-orange-500 text-white shadow-xl shadow-brand-primary/30 mb-4 transform -rotate-3">
                <Heart size={28} className="fill-white/20" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-500">Secure Donation</span>
              </h2>
              <p className="text-gray-600 font-medium text-base max-w-md mx-auto leading-relaxed">
                Your generous contribution helps us continue our sacred mission
                and serve the community.
              </p>
            </div>

            <div className="space-y-8 relative z-10">
              {/* Cause Selection */}
              <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100/50">
                <label className="flex items-center gap-3 text-sm font-black text-gray-900 mb-5 uppercase tracking-widest">
                  <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">1</span>
                  Select Cause
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSelectedCause("kovil")}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-400 ${
                      selectedCause === "kovil"
                        ? "border-brand-primary bg-white shadow-lg shadow-brand-primary/15 transform scale-[1.02]"
                        : "border-transparent bg-white shadow-sm hover:shadow-md hover:border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedCause === "kovil"
                          ? "border-brand-primary bg-brand-primary/10"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      {selectedCause === "kovil" && (
                        <motion.div
                          layoutId="cause-dot"
                          className="w-2.5 h-2.5 bg-brand-primary rounded-full shadow-sm"
                        ></motion.div>
                      )}
                    </div>
                    <span
                      className={`font-extrabold text-base transition-colors ${selectedCause === "kovil" ? "text-brand-primary" : "text-gray-700"}`}
                    >
                      Kovil Kattada Thiruppani
                    </span>
                  </div>
                  <div
                    onClick={() => setSelectedCause("annadhanam")}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-400 ${
                      selectedCause === "annadhanam"
                        ? "border-brand-primary bg-white shadow-lg shadow-brand-primary/15 transform scale-[1.02]"
                        : "border-transparent bg-white shadow-sm hover:shadow-md hover:border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedCause === "annadhanam"
                          ? "border-brand-primary bg-brand-primary/10"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      {selectedCause === "annadhanam" && (
                        <motion.div
                          layoutId="cause-dot"
                          className="w-2.5 h-2.5 bg-brand-primary rounded-full shadow-sm"
                        ></motion.div>
                      )}
                    </div>
                    <span
                      className={`font-extrabold text-base transition-colors ${selectedCause === "annadhanam" ? "text-brand-primary" : "text-gray-700"}`}
                    >
                      Annadhanam Contribution
                    </span>
                  </div>
                </div>
              </div>

              {/* Donor Information */}
              <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100/50">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-3">
                  <label className="flex items-center gap-3 text-sm font-black text-gray-900 uppercase tracking-widest">
                    <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">2</span>
                    Donor Details
                  </label>
                  <select
                    value={donortype}
                    onChange={(e) => setDonortype(e.target.value)}
                    className="px-5 py-3 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-bold text-gray-900 text-sm cursor-pointer"
                  >
                    <option value="domestic">Domestic (Indian Citizen)</option>
                    <option value="international">
                      International (Foreign Citizen)
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 placeholder:text-gray-400 text-sm md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Country *"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                  {donortype === "domestic" ? (
                    <div className="flex gap-4 w-full">
                      <input
                        type="text"
                        placeholder="PAN Number"
                        value={pannumber}
                        onChange={(e) => setPannumber(e.target.value)}
                        className="w-1/2 px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 uppercase placeholder:text-gray-400 placeholder:normal-case text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Aadhaar Number"
                        value={aadhaarnumber}
                        onChange={(e) => setAadhaarnumber(e.target.value)}
                        className="w-1/2 px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 uppercase placeholder:text-gray-400 placeholder:normal-case text-sm"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Passport Number *"
                      value={passportnumber}
                      onChange={(e) => setPassportnumber(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 placeholder:text-gray-400 text-sm uppercase placeholder:normal-case"
                    />
                  )}
                  <textarea
                    placeholder="Full Address (Optional)"
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-semibold text-gray-900 placeholder:text-gray-400 text-sm md:col-span-2 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100/50">
                <label className="flex items-center gap-3 text-sm font-black text-gray-900 mb-5 uppercase tracking-widest">
                  <span className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center">3</span>
                  Donation Amount
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleAmountClick(amt)}
                      className={`py-3 px-2 rounded-xl font-bold transition-all border-2 cursor-pointer ${
                        amount === amt
                          ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30 scale-[1.05]"
                          : "bg-white text-gray-700 border-transparent shadow-sm hover:shadow-md hover:border-gray-200 hover:text-brand-primary"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="Enter Custom Amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full px-5 py-4 pl-12 pr-5 rounded-xl border-2 border-transparent bg-white shadow-sm hover:shadow-md focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all font-black text-gray-900 placeholder:text-gray-400 text-lg"
                  />
                </div>
              </div>

              <div className="pt-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-center font-bold text-sm shadow-sm flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} className="text-red-500" />
                    {error}
                  </div>
                )}
                <button
                  onClick={() => {
                    setError("");
                    if (
                      !fullname ||
                      !mobile ||
                      !email ||
                      !country ||
                      (!amount && !customAmount)
                    ) {
                      setError(
                        "Please fill all required fields and select an amount.",
                      );
                      return;
                    }
                    if (
                      donortype === "domestic" &&
                      !pannumber &&
                      !aadhaarnumber
                    ) {
                      setError(
                        "Please provide either PAN or Aadhaar number for domestic donation.",
                      );
                      return;
                    }
                    if (donortype === "international" && !passportnumber) {
                      setError(
                        "Please provide Passport number for international donation.",
                      );
                      return;
                    }

                    const donationAmount = amount || Number(customAmount);
                    if (donationAmount > 200000) {
                      setShowContactDialog(true);
                      return;
                    }

                    setIsSidebarOpen(true);
                  }}
                  className="w-full py-4 rounded-[0px] bg-gradient-to-r from-brand-primary to-orange-500 text-white font-black uppercase tracking-widest text-base hover:from-orange-500 hover:to-brand-primary transition-all duration-500 shadow-[0_10px_30px_rgb(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgb(245,158,11,0.4)] hover:-translate-y-1 flex justify-center items-center gap-3 group cursor-pointer"
                >
                  <ShieldCheck
                    size={24}
                    className="text-white/80 group-hover:text-white transition-colors"
                  />
                  <span>
                    Donate Securely{" "}
                    {amount || customAmount ? `| ₹${amount || customAmount}` : ""}
                  </span>
                </button>
              </div>
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

      {/* Payment Right Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[70] flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-gray-900">
                  Complete Donation
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 flex-grow flex flex-col gap-8">
                <div className="text-center space-y-4">
                  <p className="text-gray-600 font-medium">
                    Scan the QR Code below to pay
                  </p>
                  <div className="bg-gray-50 rounded-xl border-2 border-gray-100 inline-block">
                    <img
                      src="/payment-qr.jpeg"
                      alt="Payment QR"
                      className="w-48 h-full object-contain rounded-xl shadow-sm"
                    />
                  </div>
                  <p className="text-2xl font-black text-brand-primary">
                    ₹{amount || customAmount}
                  </p>
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-500" /> Upload
                    Screenshot
                  </h3>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-xl bg-white hover:bg-blue-50/50 transition-colors cursor-pointer relative overflow-hidden group">
                    {paymentScreenshot ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <img
                          src={URL.createObjectURL(paymentScreenshot)}
                          alt="Screenshot"
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                          Change
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-blue-500">
                        <Upload className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm font-medium">
                          Click to upload screenshot
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPaymentScreenshot(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 sticky bottom-0 bg-white">
                <button
                  onClick={async () => {
                    if (!paymentScreenshot) {
                      alert("Please upload your payment screenshot");
                      return;
                    }
                    try {
                      setIsSubmitting(true);
                      const submitData = new FormData();
                      submitData.append(
                        "cause",
                        selectedCause === "kovil" ? "temple" : "food",
                      );
                      submitData.append("fullname", fullname);
                      submitData.append("mobile", mobile);
                      submitData.append("email", email);
                      submitData.append("address", address);
                      submitData.append("country", country);
                      submitData.append("donortype", donortype);
                      submitData.append(
                        "amount",
                        (amount || customAmount).toString(),
                      );

                      if (donortype === "domestic") {
                        submitData.append("pannumber", pannumber);
                        submitData.append("aadhaarnumber", aadhaarnumber);
                      } else {
                        submitData.append("passportnumber", passportnumber);
                      }

                      submitData.append("image", paymentScreenshot);

                      const result = await addDonor(submitData);

                      if (result.success) {
                        setIsSidebarOpen(false);
                        setShowSuccessAnimation(true);
                        setTimeout(() => {
                          setShowSuccessAnimation(false);
                          setFullname("");
                          setMobile("");
                          setEmail("");
                          setAddress("");
                          setPannumber("");
                          setAadhaarnumber("");
                          setPassportnumber("");
                          setAmount("");
                          setCustomAmount("");
                          setPaymentScreenshot(null);
                        }, 3000);
                      } else {
                        alert(result.message || "Submission failed");
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Failed to submit donation. Please try again.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary text-white font-bold py-4 rounded-[0px] hover:bg-brand-primary/90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit Donation"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Dialog Overlay */}
      <AnimatePresence>
        {showContactDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center"
            >
              <button
                onClick={() => setShowContactDialog(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                Large Donation Request
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                For donations exceeding ₹2,00,000, we prefer to handle the
                process personally. Please contact our support team to proceed.
              </p>
              <a
                href="tel:+919842023346"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                Call +91 98420 23346
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Blur */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.6,
              }}
              className="relative z-10 flex flex-col items-center bg-white p-12 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(34,197,94,0.2)] border border-green-50 max-w-md w-full mx-4 text-center"
            >
              <div className="relative mb-8">
                {/* Outer Ring Pulse */}
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-green-200 rounded-full blur-xl"
                />

                {/* SVG Tick */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      "0px 10px 20px -5px rgba(34, 197, 94, 0.3)",
                      "0px 20px 40px -5px rgba(34, 197, 94, 0.5)",
                      "0px 10px 20px -5px rgba(34, 197, 94, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-32 h-32 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center"
                >
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-3xl font-black text-gray-900 mb-3 tracking-tight"
              >
                Donation Successful!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-gray-500 font-medium text-lg"
              >
                Thank you for your generous contribution.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
