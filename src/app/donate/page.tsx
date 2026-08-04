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
import { useLanguage } from "../../i18n/LanguageContext";

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
      "Yes, you can choose either '{t(\"donate.kovil_kattada\")}' or 'Annadhanam Contribution' from the dropdown in the donation form.",
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
  const { t } = useLanguage();
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
  
  const faqs = [
    { question: t("donate.q1"), answer: t("donate.a1") },
    { question: t("donate.q2"), answer: t("donate.a2") },
    { question: t("donate.q3"), answer: t("donate.a3") },
    { question: t("donate.q4"), answer: t("donate.a4") },
  ];
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
              <span>{t("donate.sacred_offerings")}</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 mb-6 tracking-tight leading-tight "
            >
              {t("donate.support_sacred")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                {t("donate.generous_donation")}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              {t("donate.hero_desc")}
            </motion.p>
            <motion.div variants={fadeUp}>
              <button
                onClick={() => scrollToForm("kovil")}
                className="px-10 py-4 rounded-[0px] bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2 cursor-pointer"
              >
                {t("donate.donate_now")} <ArrowRight size={20} />
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
                      {t("donate.temple_title")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  {t("donate.temple_desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" /> {t("donate.temple_const")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" /> {t("donate.temple_renov")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    {t("donate.preservation")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-amber-500" />{" "}
                    {t("donate.spiritual_service")}
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("kovil")}
                  className="w-full py-4 rounded-xl bg-amber-50 text-amber-700 font-bold hover:bg-amber-500 hover:text-white transition-colors border border-amber-200 hover:border-transparent"
                >
                  {t("donate.donate_temple")}
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
                      {t("donate.anna_title")}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                  {t("donate.anna_desc")}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> {t("donate.feed_devotees")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> {t("donate.serve_humanity")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> {t("donate.daily_anna")}
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-green-600" /> {t("donate.sacred_charity")}
                  </li>
                </ul>
                <button
                  onClick={() => scrollToForm("annadhanam")}
                  className="w-full py-4 rounded-xl bg-green-50 text-green-700 font-bold hover:bg-green-600 hover:text-white transition-colors border border-green-200 hover:border-transparent"
                >
                  {t("donate.donate_food")}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Main Form Section */}
      <section
        ref={formRef}
        className="relative overflow-hidden py-24 bg-[#F7F7F5]"
      >
        {/* Background accents */}
        <div className="absolute -top-24 left-0 h-96 w-96 rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-[1rem] border border-white/70 bg-white/80 shadow-[0_24px_90px_-20px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
          >
            <div className="grid lg:grid-cols-[0.95fr_1.45fr]">
              {/* Left panel */}
              <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-10 md:px-12 md:py-14 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                    <Heart
                      size={26}
                      className="text-amber-300 fill-amber-300/20"
                    />
                  </div>

                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                    {t("donate.secure_donation")}
                  </span>

                  <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
                    {t("donate.support_mission")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500">
                      {t("donate.sacred_mission")}
                    </span>
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-300 md:text-base">
                    {t("donate.mission_desc")}
                  </p>

                  <div className="mt-10 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {t("donate.step_1")}
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {t("donate.choose_cause")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {t("donate.step_2")}
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {t("donate.enter_donor")}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {t("donate.step_3")}
                      </p>
                      <p className="mt-1 font-medium text-white">
                        {t("donate.confirm_amt")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 rounded-2xl border border-amber-300/15 bg-amber-300/10 px-5 py-5">
                    <p className="text-sm leading-7 text-amber-100">
                      {t("donate.large_donation_note")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="px-6 py-8 sm:px-8 md:px-10 md:py-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {t("donate.donation_form")}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {t("donate.form_desc")}
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Cause */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <label className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {t("donate.cause_selection")}
                    </label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <button
                        onClick={() => setSelectedCause("kovil")}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                          selectedCause === "kovil"
                            ? "border-brand-primary bg-white shadow-[0_10px_30px_-15px_rgba(245,158,11,0.35)]"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            selectedCause === "kovil"
                              ? "border-brand-primary"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedCause === "kovil" && (
                            <motion.div
                              layoutId="cause-dot"
                              className="h-2.5 w-2.5 rounded-full bg-brand-primary"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {t("donate.kovil_kattada")}
                          </p>
                          <p className="text-sm text-slate-500">
                            {t("donate.temple_support")}
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => setSelectedCause("annadhanam")}
                        className={`flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                          selectedCause === "annadhanam"
                            ? "border-brand-primary bg-white shadow-[0_10px_30px_-15px_rgba(245,158,11,0.35)]"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                            selectedCause === "annadhanam"
                              ? "border-brand-primary"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedCause === "annadhanam" && (
                            <motion.div
                              layoutId="cause-dot"
                              className="h-2.5 w-2.5 rounded-full bg-brand-primary"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {t("donate.anna_title")}
                          </p>
                          <p className="text-sm text-slate-500">
                            {t("donate.food_support")}
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Donor details */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <label className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                        {t("donate.donor_details")}
                      </label>
                      <select
                        value={donortype}
                        onChange={(e) => setDonortype(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      >
                        <option value="domestic">
                          {t("donate.domestic_citizen")}
                        </option>
                        <option value="international">
                          {t("donate.intl_citizen")}
                        </option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <input
                        type="text"
                        placeholder={t("donate.full_name")}
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                      <input
                        type="tel"
                        placeholder={t("donate.mobile_number")}
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                      <input
                        type="email"
                        placeholder={t("donate.email_address")}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="md:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                      <input
                        type="text"
                        placeholder={t("donate.country")}
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />

                      {donortype === "domestic" ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
                          <input
                            type="text"
                            placeholder={t("donate.pan_number")}
                            value={pannumber}
                            maxLength={10}
                            onChange={(e) =>
                              setPannumber(
                                e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, ""),
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 uppercase outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                          />
                          <input
                            type="text"
                            placeholder={t("donate.aadhaar_number")}
                            value={aadhaarnumber}
                            maxLength={12}
                            onChange={(e) =>
                              setAadhaarnumber(
                                e.target.value.replace(/[^0-9]/g, ""),
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder={t("donate.passport_number")}
                          value={passportnumber}
                          onChange={(e) => setPassportnumber(e.target.value)}
                          className="md:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 uppercase outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                        />
                      )}

                      <textarea
                        placeholder={t("donate.full_address")}
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="md:col-span-2 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                    <label className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {t("donate.donation_amount")}
                    </label>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => handleAmountClick(amt)}
                          className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all cursor-pointer ${
                            amount === amt
                              ? "border-brand-primary bg-brand-primary text-white shadow-[0_10px_24px_-12px_rgba(245,158,11,0.55)]"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder={t("donate.enter_custom")}
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                      {error}
                    </div>
                  )}

                  {/* CTA */}
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
                    className="mt-2 flex w-full items-center justify-center gap-3 rounded-[0px] bg-gradient-to-r from-brand-primary to-orange-500 px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_16px_40px_-14px_rgba(245,158,11,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-500 hover:to-brand-primary cursor-pointer"
                  >
                    <ShieldCheck size={22} />
                    <span>
                      {t("donate.donate_securely")}{" "}
                      {amount || customAmount
                        ? `| ₹${amount || customAmount}`
                        : ""}
                    </span>
                  </button>
                </div>
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
              {t("donate.why_support")}
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                title: t("donate.support_temple"),
                icon: Landmark,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                title: t("donate.feed_needy"),
                icon: Utensils,
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                title: t("donate.preserve_heritage"),
                icon: BookOpen,
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                title: t("donate.part_divine"),
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
        </div>
      </section>

      {/* 5. Trust Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200/60">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: ShieldCheck,
                title: t("donate.secure_payments"),
                desc: t("donate.ssl_enc"),
                color: "text-emerald-600",
                bg: "bg-emerald-100/50",
              },
              {
                icon: Globe2,
                title: t("donate.trans_usage"),
                desc: t("donate.funds_go"),
                color: "text-blue-600",
                bg: "bg-blue-100/50",
              },
              {
                icon: Heart,
                title: t("donate.trusted_ngo"),
                desc: `${t("donate.registered_ngo")} - 6/2022`,
                color: "text-rose-600",
                bg: "bg-rose-100/50",
              },
              {
                icon: Building2,
                title: t("donate.tax_benefit"),
                desc: t("donate.valid_tax"),
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
              {t("donate.faq")}
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
                  {t("donate.complete_donation")}
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
                    {t("donate.scan_qr")}
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
                    <Upload className="w-5 h-5 text-blue-500" /> {t("donate.upload_ss")}
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
                          {t("donate.click_upload")}
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
                  {isSubmitting ? t("donate.submitting") : t("donate.submit_donation")}
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
                {t("donate.large_req")}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                {t("donate.large_req_desc")}
              </p>
              <a
                href="tel:+919842023346"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                {t("donate.call")}
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
                {t("donate.donation_success")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-gray-500 font-medium text-lg"
              >
                {t("donate.thank_you")}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
