"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Leaf, Star, Sparkles, BookOpen } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

interface Siddhar {
  id: string;
  name: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  contributions: string[];
}





export default function SiddhargalPage() {
  const [selectedSiddhar, setSelectedSiddhar] = useState<Siddhar | null>(null);
  const { t } = useLanguage();

  const babaji: Siddhar = {
    id: "babaji",
    name: t("siddhargal.babaji.name"),
    title: t("siddhargal.babaji.title"),
    shortDesc: t("siddhargal.babaji.shortDesc"),
    fullDesc: t("siddhargal.babaji.fullDesc"),
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xip5F1mdZiliGwP6TaHmkKlEMfQQdv_03H6RqYAzqA&s=10",
    contributions: [
      t("siddhargal.babaji.c1"),
      t("siddhargal.babaji.c2"),
      t("siddhargal.babaji.c3"),
      t("siddhargal.babaji.c4")
    ],
  };
  const imageMap: Record<string, string> = {
    "1": "https://babajiskriyayogastore.in/images/medium/siddha-agastyar_MED.jpg",
    "2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeRt7a8B1cf8A7GxJ4pZC3AICJmuFhxZtj_Lmn-iS2PQ&s=10",
    "3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqEV2yDNFbuXwXIdL-1SCbvTXJx_XyQK5IMeQkmnPuA&s",
    "4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMuLzacP_eClrfiqILkBU2z5jiQX3UxaPYlAn3gqUZq7-N2Kt4Qi060jE&s=10",
    "5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3N4AQ5Fu6mpWhR-1IamyB6V1RvYVQTj8YFufrJYjAyg&s=10",
    "6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdcUQAwcIqWjsX2nWQS65HC_Odq5TtWUQnqlQwXjhwbw&s=10",
    "7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRtVEIuNpAyKUIkhfvOQhvnpaSDW0cCbE8nUk6finlUA&s=10",
    "8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GibNk4FXwspCb1r05MhIAWcqVmeah10_3fUC0zhiUA&s=10",
    "9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUjNczMJ8B8f3gKEBLED9Aohvw6nQ5JbjtLHLQoyT7t263S9dJo395sDS7&s=10",
    "10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTJwGR7oFy5nGv-F_rafr-n3qB9ziZNlam5B7Rs_asg&s=10",
    "11": "https://www.tknsiddha.com/medicine/wp-content/uploads/2016/03/idaikkadar-siddhar-songs-temple.png",
    "12": "https://sannidhi.net/wp-content/uploads/2023/04/kamalamuni_siddhar0.png",
    "13": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCNOEOH9zPKw0LtZIMXaA085-vXc9wV3Fe8Y-B_bxf2HjPdYZJTZZ-voKh-gNobKmz3J5bwirErIa92lRU_SzE7bpG_cvo2-MbMEgP6LHRBBKHTIvQPWLBbVpFb9P7_nzXA-pEJ2_tBZiq/s1600/images.jpg",
    "14": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3OwVSroeFogXpIWYJ5A5cc0BxP7E9QRqSTW7n7UX_SHb_nqclmpTC5zKN&s=10",
    "15": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3LP8DeMK52hZ7fZIsDdwOho5cUwsTfwipNYtIYfmNtsd29BFmelPcWME&s=10",
    "16": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQApKe7hK8hcmptTsCEkbCgPC_M53Rf0CGF2GsM6nROeji9RBMJV0zUw&s=10",
    "17": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkA4nOtWATmEpDQNVMFVmOPo74K6LIEHwpnrt1EGeTqhF2m73xvtG57k&s=10",
    "18": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7-efPP_NkWxakO3B33Ckrk1nzxic9_JIVwoTaqWNCe4U3vse"
  };

  const siddhargalList: Siddhar[] = Array.from({ length: 18 }, (_, i) => {
    const id = (i + 1).toString();
    const getCount = (id: string) => {
      if (id === "1" || id === "18") return 4;
      if (id === "4" || id === "12" || id === "17") return 2;
      return 3;
    };
    const count = getCount(id);
    const contributions = [];
    for (let j = 0; j < count; j++) {
      contributions.push(t(`siddhargal.list.id${id}.contributions.${j}`));
    }
    return {
      id,
      name: t(`siddhargal.list.id${id}.name`),
      title: t(`siddhargal.list.id${id}.title`),
      shortDesc: t(`siddhargal.list.id${id}.shortDesc`),
      fullDesc: t(`siddhargal.list.id${id}.fullDesc`),
      image: imageMap[id],
      contributions,
    };
  });
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-300/30 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-300/20 rounded-full blur-[150px] mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-black font-semibold text-slate-900 mb-6 tracking-tight">
              {t("siddhargal.page_title_prefix")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                {t("siddhargal.page_title")}
              </span>
            </h1>
            <p className="text-slate-600 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t("siddhargal.page_subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Babaji Top Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={() => setSelectedSiddhar(babaji)}
          className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-amber-900/5 border border-amber-100/50 mb-20 cursor-pointer group flex flex-col md:flex-row relative hover:shadow-amber-500/10 hover:border-amber-200 transition-all duration-500"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 z-10"></div>
          <div className="w-full md:w-5/12 h-80 md:h-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
            <img
              src={babaji.image}
              alt={babaji.name}
              className="w-full h-full object-fit transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute bottom-6 left-6 z-20 md:hidden">
              <h2 className="text-3xl font-extrabold text-white mb-1">
                {babaji.name}
              </h2>
              <p className="text-amber-400 font-bold">{babaji.title}</p>
            </div>
          </div>
          <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white relative">
            <h2 className="hidden md:block text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {babaji.name}
            </h2>
            <h3 className="hidden md:block text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 mb-6">
              {babaji.title}
            </h3>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              {babaji.shortDesc}
            </p>
            <div className="flex items-center text-amber-600 font-bold gap-3 group-hover:gap-5 transition-all uppercase tracking-widest text-sm bg-amber-50 w-fit px-6 py-3 rounded-[0px] group-hover:bg-amber-100">
              {t("siddhargal.read_lore")} <ArrowRight size={18} />
            </div>
          </div>
        </motion.div>

        {/* 18 Siddhargal Grid */}
        <div>
          <div className="flex items-center justify-center mb-16 relative">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            <h2 className="text-3xl md:text-4xl font-black font-semibold text-slate-900 bg-slate-50 px-8 relative z-10 tracking-tight">
              {t("siddhargal.section_title")}
            </h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {siddhargalList.map((siddhar, index) => (
              <div
                key={siddhar.id}
                onClick={() => setSelectedSiddhar(siddhar)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[10px] border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--color-deepgreen)]/30">
                  {/* Background Decoration */}
                  <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-[var(--color-deepgreen)]/5 blur-3xl group-hover:bg-[var(--color-deepgreen)]/10 transition-all duration-700"></div>

                  <div className="grid lg:grid-cols-[300px_1fr] gap-8 p-8 lg:p-10 relative z-10">
                    {/* Image */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-deepgreen)]/20 to-amber-400/20 blur-xl scale-95 group-hover:scale-105 transition-all duration-700"></div>

                      <div className="relative overflow-hidden rounded-3xl border border-white shadow-xl">
                        <img
                          src={siddhar.image}
                          alt={siddhar.name}
                          className="w-full h-[360px] object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Number */}
                      <div className="absolute top-5 left-5">
                        <div className="h-12 w-12 rounded-2xl bg-white/80 backdrop-blur-lg border border-white shadow flex items-center justify-center font-bold text-slate-700">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <span className="inline-flex w-fit rounded-[0px] border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">
                        {siddhar.title}
                      </span>

                      <h2 className="mt-6 text-4xl font-bold text-slate-900 leading-tight group-hover:text-brand-primary transition-colors">
                        {siddhar.name}
                      </h2>

                      <div className="mt-6 h-px w-24 bg-gradient-to-r from-[var(--color-deepgreen)] to-transparent"></div>

                      <p className="mt-8 text-slate-600 leading-8 text-lg">
                        {siddhar.shortDesc}
                      </p>

                      <div className="mt-10 flex items-center justify-between">
                        <button className="inline-flex items-center gap-3 rounded-[0px] border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-bg-brand-primary hover:bg-brand-primary hover:text-white cursor-pointer">
                          {t("siddhargal.read_bio")}
                          <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </button>

                        <div className="hidden md:flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[var(--color-deepgreen)]"></div>
                          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar Overlay */}
      <AnimatePresence>
        {selectedSiddhar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSiddhar(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-[70] flex flex-col overflow-y-auto"
            >
              <div className="relative h-80 shrink-0">
                <img
                  src={selectedSiddhar.image}
                  alt={selectedSiddhar.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <button
                  onClick={() => setSelectedSiddhar(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/30 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-20 group"
                >
                  <X
                    size={20}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="inline-block px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest rounded-lg mb-4 shadow-lg border border-amber-400">
                    {selectedSiddhar.id === "babaji"
                      ? t("siddhargal.supreme_guru")
                      : `${t("siddhargal.siddhar_num")}${selectedSiddhar.id}`}
                  </span>
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
                    {selectedSiddhar.name}
                  </h2>
                  <h3 className="text-lg font-bold text-amber-400 tracking-wide">
                    {selectedSiddhar.title}
                  </h3>
                </div>
              </div>

              <div className="p-8 flex-grow bg-slate-50">
                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-700 text-lg leading-relaxed font-medium mb-10 text-justify whitespace-pre-wrap">
                    {selectedSiddhar.fullDesc}
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <BookOpen size={18} className="text-amber-500" /> {t("siddhargal.key_contributions")}
                    </h4>
                    <ul className="space-y-4">
                      {selectedSiddhar.contributions.map(
                        (contribution, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                              <Leaf size={12} className="text-amber-600" />
                            </div>
                            <span className="text-slate-700 font-semibold">
                              {contribution}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white">
                <button
                  onClick={() => setSelectedSiddhar(null)}
                  className="w-full py-4 rounded-[0px] bg-brand-primary text-white font-bold tracking-wide hover:bg-brand-primary transition-colors shadow-lg shadow-slate-900/20 cursor-pointer"
                >
                  {t("siddhargal.close_profile")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
