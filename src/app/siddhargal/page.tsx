"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Leaf, Star, Sparkles, BookOpen } from "lucide-react";

interface Siddhar {
  id: string;
  name: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  contributions: string[];
}

const babaji: Siddhar = {
  id: "babaji",
  name: "Mahavatar Babaji",
  title: "The Supreme Guru & Deathless Master",
  shortDesc:
    "The ageless master of Kriya Yoga who has maintained a physical form for centuries to guide humanity's spiritual evolution.",
  fullDesc:
    "Mahavatar Babaji is an immortal yogi who revived the ancient science of Kriya Yoga in the modern age. He is considered a Mahasiddha, one who has transcended the limitations of the physical body. Remaining ever-youthful, he works silently behind the scenes, guiding sincere seekers, saints, and assisting in the spiritual upliftment of the entire world.",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3xip5F1mdZiliGwP6TaHmkKlEMfQQdv_03H6RqYAzqA&s=10",
  contributions: [
    "Revival of the ancient Kriya Yoga",
    "Guidance to Lahiri Mahasaya and other masters",
    "Silent spiritual upliftment of humanity",
    "Mastery over physical laws and immortality",
  ],
};

const siddhargalList: Siddhar[] = [
  {
    id: "1",
    name: "Agastyar (Agastya)",
    title: "Father of Siddha medicine and grammar",
    shortDesc:
      "The foremost of the 18 Siddhars, known for his vast contributions to Tamil grammar and Siddha medicine.",
    fullDesc:
      "Agathiyar is revered as the first Siddhar and the guru of many other Siddhars. He is credited with the creation of the Tamil language, early grammar (Agathiyam), and profound works in alchemy, medicine, and mysticism.",
    image:
      "https://babajiskriyayogastore.in/images/medium/siddha-agastyar_MED.jpg",
    contributions: ["Siddha Medicine", "Tamil Grammar", "Alchemy", "Astrology"],
  },
  {
    id: "2",
    name: "Thirumular",
    title: "Author of Thirumandiram",
    shortDesc:
      "Author of the 'Thirumandhiram', a masterpiece of Shaiva Siddhanta and Tantra.",
    fullDesc:
      "Thirumular was a great mystic and yogi. His work, Thirumandhiram, consists of 3000 verses that detail the path of yoga, tantra, and devotion, forming a core text of Shaiva philosophy.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeRt7a8B1cf8A7GxJ4pZC3AICJmuFhxZtj_Lmn-iS2PQ&s=10",
    contributions: ["Thirumandhiram", "Ashtanga Yoga", "Shaiva Siddhanta"],
  },
  {
    id: "3",
    name: "Bogar",
    title: "Master alchemist of Palani",
    shortDesc:
      "Known for creating the navapashanam idol of Lord Murugan at Palani.",
    fullDesc:
      "Bogar was a master of alchemy and medicine. He is most famous for creating the idol of Lord Murugan at Palani out of Navapashanam (nine poisonous herbs combined to form a master medicine).",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEqEV2yDNFbuXwXIdL-1SCbvTXJx_XyQK5IMeQkmnPuA&s",
    contributions: ["Navapashanam Idol", "Alchemy", "Pharmacognosy"],
  },
  {
    id: "4",
    name: "Nandeeswarar (Nandi)",
    title: "First disciple of Lord Shiva",
    shortDesc:
      "The foremost disciple of Lord Shiva and the gatekeeper of Kailash.",
    fullDesc:
      "Nandi Devar (Nandeeswarar) is considered a direct disciple of Lord Shiva. He passed on the divine knowledge to many Siddhars including Thirumular.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMuLzacP_eClrfiqILkBU2z5jiQX3UxaPYlAn3gqUZq7-N2Kt4Qi060jE&s=10",
    contributions: ["Transmission of Shaiva Agamas", "Yogic Physiology"],
  },
  {
    id: "5",
    name: "Konganar (Konganavar)",
    title: "Expert in alchemy",
    shortDesc:
      "A disciple of Bogar, renowned for his expertise in alchemy and philosophy.",
    fullDesc:
      "Konganar contributed extensively to alchemy, philosophy, and medicine. He is known for his works on extracting gold and creating powerful medicinal formulations.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3N4AQ5Fu6mpWhR-1IamyB6V1RvYVQTj8YFufrJYjAyg&s=10",
    contributions: ["Alchemy", "Philosophy", "Medicine"],
  },
  {
    id: "6",
    name: "Macchamuni (Machamuni)",
    title: "Disciple of Agastya",
    shortDesc:
      "A great yogi associated with the Nath tradition and profound mystical powers.",
    fullDesc:
      "Machamuni (Matsyendranath in the North) was born from a fish. He is a primary figure in Hatha Yoga and the Nath sampradaya.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdcUQAwcIqWjsX2nWQS65HC_Odq5TtWUQnqlQwXjhwbw&s=10",
    contributions: ["Hatha Yoga", "Tantra", "Nath Sampradaya"],
  },
  {
    id: "7",
    name: "Gorakkar (Gorakhnath)",
    title: "Master of Kundalini Yoga",
    shortDesc: "Disciple of Machamuni, a supreme master of Hatha Yoga.",
    fullDesc:
      "Gorakkar (Gorakhnath) systematized Hatha Yoga. His teachings focus on physical mastery as a stepping stone to spiritual liberation.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRtVEIuNpAyKUIkhfvOQhvnpaSDW0cCbE8nUk6finlUA&s=10",
    contributions: [
      "Goraksha Samhita",
      "Hatha Yoga Pradipika basis",
      "Alchemy",
    ],
  },
  {
    id: "8",
    name: "Sattaimuni",
    title: "Known for spiritual philosophy",
    shortDesc:
      "Known for his straightforwardness and critique of superficial rituals.",
    fullDesc:
      "Sattaimuni wore a simple sackcloth (sattai) and openly criticized hypocrisy. He wrote on medicine, alchemy, and inner spiritual realization.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GibNk4FXwspCb1r05MhIAWcqVmeah10_3fUC0zhiUA&s=10",
    contributions: ["Sattaimuni Vatham", "Medicine", "Critique of caste"],
  },
  {
    id: "9",
    name: "Sundaranandar",
    title: "Expert in medicine and pooja rituals",
    shortDesc: "A disciple of Sattaimuni, expert in astrology and medicine.",
    fullDesc:
      "Sundaranandar was known for his physical beauty and profound spiritual depth. He contributed significantly to Siddha medicine and astrological predictions.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUjNczMJ8B8f3gKEBLED9Aohvw6nQ5JbjtLHLQoyT7t263S9dJo395sDS7&s=10",
    contributions: ["Astrology", "Siddha Medicine", "Yogic texts"],
  },
  {
    id: "10",
    name: "Ramadevar",
    title: "Also known as Yacob",
    shortDesc:
      "A Siddhar who mastered both Hindu and Islamic mystical traditions.",
    fullDesc:
      "Ramadevar travelled widely and studied various mystical traditions. He is also known as Yacob in Islamic mysticism, bridging different spiritual paths.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTJwGR7oFy5nGv-F_rafr-n3qB9ziZNlam5B7Rs_asg&s=10",
    contributions: ["Mystical poetry", "Universal spirituality", "Alchemy"],
  },
  {
    id: "11",
    name: "Idaikadar (Idaikaadar)",
    title: "Renowned for astronomy connection",
    shortDesc:
      "An incarnation of Lord Vishnu's grace, known for his prophetic wisdom.",
    fullDesc:
      "Born as a shepherd, Idaikaadar possessed immense cosmic knowledge. He predicted cosmic events and composed songs on the nature of reality.",
    image:
      "https://www.tknsiddha.com/medicine/wp-content/uploads/2016/03/idaikkadar-siddhar-songs-temple.png",
    contributions: ["Prophecies", "Poetry", "Cosmology"],
  },
  {
    id: "12",
    name: "Kambalyamuni (Kamalamuni)",
    title: "Meditative ascetic",
    shortDesc: "Known for his contributions to medicine and philosophy.",
    fullDesc:
      "Kamalamuni was a profound sage whose teachings integrated deep philosophical insights with practical medical remedies for the masses.",
    image:
      "https://sannidhi.net/wp-content/uploads/2023/04/kamalamuni_siddhar0.png",
    contributions: ["Medicine", "Philosophy"],
  },
  {
    id: "13",
    name: "Valmiki (Vanmikar)",
    title: "Author of the Ramayana",
    shortDesc: "Revered in both Sanskrit and Siddha traditions.",
    fullDesc:
      "Known as Vanmikar in Tamil, he is equated with the author of the Ramayana. In Siddha tradition, he is a master of medicine, astrology, and yoga.",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhCNOEOH9zPKw0LtZIMXaA085-vXc9wV3Fe8Y-B_bxf2HjPdYZJTZZ-voKh-gNobKmz3J5bwirErIa92lRU_SzE7bpG_cvo2-MbMEgP6LHRBBKHTIvQPWLBbVpFb9P7_nzXA-pEJ2_tBZiq/s1600/images.jpg",
    contributions: ["Epic Poetry", "Astrology", "Siddha Texts"],
  },
  {
    id: "14",
    name: "Patanjali",
    title: "Father of Yoga Sutras",
    shortDesc:
      "Compiler of the Yoga Sutras and a master of grammar and medicine.",
    fullDesc:
      "Considered an incarnation of Adisesha, Patanjali codified the ancient teachings of Yoga into the Yoga Sutras, outlining the eightfold path (Ashtanga).",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3OwVSroeFogXpIWYJ5A5cc0BxP7E9QRqSTW7n7UX_SHb_nqclmpTC5zKN&s=10",
    contributions: ["Yoga Sutras", "Mahabhashya", "Ayurveda"],
  },
  {
    id: "15",
    name: "Dhanvantari",
    title: "Divine physician of Ayurveda",
    shortDesc: "The father of Ayurveda and medical science.",
    fullDesc:
      "While primarily known as an avatar of Vishnu and the source of Ayurveda, in the Tamil Siddha tradition, he is revered as a supreme healer and alchemist.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3LP8DeMK52hZ7fZIsDdwOho5cUwsTfwipNYtIYfmNtsd29BFmelPcWME&s=10",
    contributions: ["Ayurveda", "Surgery", "Herbology"],
  },
  {
    id: "16",
    name: "Pambatti Siddhar",
    title: "Known for snake-dance poems",
    shortDesc: "Used the snake as a metaphor for the Kundalini energy.",
    fullDesc:
      "His poems address the 'Snake' (Pambu), symbolizing the awakening of Kundalini energy. He emphasized the realization of the inner self over worldly attachments.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQApKe7hK8hcmptTsCEkbCgPC_M53Rf0CGF2GsM6nROeji9RBMJV0zUw&s=10",
    contributions: ["Kundalini Yoga", "Mystical Poetry", "Medicine"],
  },
  {
    id: "17",
    name: "Kuthambai Siddhar (Kudambai)",
    title: "Named after ear-ring ornaments",
    shortDesc:
      "Known for addressing his soul as 'Kudambai' (a woman wearing earrings).",
    fullDesc:
      "His songs are deeply philosophical and advise detachment from worldly illusions. He used simple, direct language to convey ultimate truths.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkA4nOtWATmEpDQNVMFVmOPo74K6LIEHwpnrt1EGeTqhF2m73xvtG57k&s=10",
    contributions: ["Philosophical poetry", "Advaita Vedanta"],
  },
  {
    id: "18",
    name: "Azhukanni Siddhar",
    title: "Known for detachment and tearful devotion",
    shortDesc:
      "A revered Siddhar whose devotional songs emphasize detachment from worldly desires and complete surrender to the Divine.",
    fullDesc:
      "Azhukanni Siddhar is celebrated for his deeply emotional and spiritually profound verses that express unwavering devotion to God. His teachings encourage seekers to overcome ego, material attachments, and worldly illusions through self-realization and inner purity. His poems, often filled with compassion and longing for divine union, continue to inspire devotees on the path of spiritual awakening.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy7-efPP_NkWxakO3B33Ckrk1nzxic9_JIVwoTaqWNCe4U3vse",
    contributions: [
      "Devotional Poetry",
      "Spiritual Detachment",
      "Self-Realization",
      "Bhakti Philosophy",
    ],
  },
];

export default function SiddhargalPage() {
  const [selectedSiddhar, setSelectedSiddhar] = useState<Siddhar | null>(null);

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
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                Siddhar Parampara
              </span>
            </h1>
            <p className="text-slate-600 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover the wisdom of the immortal masters and the revered 18
              Siddhargal who unlocked the ultimate secrets of the universe,
              medicine, and spiritual liberation.
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
              Read Full Lore <ArrowRight size={18} />
            </div>
          </div>
        </motion.div>

        {/* 18 Siddhargal Grid */}
        <div>
          <div className="flex items-center justify-center mb-16 relative">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 bg-slate-50 px-8 relative z-10 tracking-tight">
              The 18 Siddhargal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siddhargalList.map((siddhar, index) => (
              <motion.div
                key={siddhar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedSiddhar(siddhar)}
                className="bg-white rounded-[1rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer group hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-200 transition-all duration-500 flex flex-col relative"
              >
                <div className="h-64 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                  <img
                    src={siddhar.image}
                    alt={siddhar.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-5 left-5 z-20 pr-5">
                    <h3 className="text-2xl font-extrabold text-white mb-1 leading-tight">
                      {siddhar.name}
                    </h3>
                    <p className="text-amber-400 font-semibold text-sm tracking-wide">
                      {siddhar.title}
                    </p>
                  </div>
                  <div className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col bg-white relative">
                  <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow line-clamp-3 font-medium">
                    {siddhar.shortDesc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-amber-600 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-wider">
                      Explore <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
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
                      ? "Supreme Guru"
                      : `Siddhar #${selectedSiddhar.id}`}
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
                  <p className="text-slate-700 text-lg leading-relaxed font-medium mb-10 text-justify">
                    {selectedSiddhar.fullDesc}
                  </p>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <BookOpen size={18} className="text-amber-500" /> Key
                      Contributions
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
                  Close Profile
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
