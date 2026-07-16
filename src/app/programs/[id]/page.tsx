"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, MapPin, Clock, Users, CheckCircle, ArrowLeft } from "lucide-react";

const programsData = [
  {
    id: "1",
    title: "Shiva Kriya Yogam (Level I)",
    date: "09 August 2026",
    time: "6:00 AM - 6:00 PM",
    location: "Hotel Zion, Near Race Course, Bangalore",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=1200",
    description: "The Level I program introduces the foundational practices of Shiva Kriya Yogam. Participants will learn basic meditation techniques, breathing exercises (pranayama), and spiritual principles that form the core of a balanced, peaceful life.",
    benefits: [
      "Introduction to foundational breathing techniques",
      "Stress reduction and mental clarity",
      "Techniques for emotional balance",
      "Guided meditation sessions"
    ],
    eligibility: "Open to anyone above 12 years of age.",
    dressCode: "Traditional and comfortable wear (Vesti & Shirt / Track Pants & T-Shirt)",
  },
  {
    id: "2",
    title: "Shiva Kriya Yogam (Level II)",
    date: "12–13 September 2026",
    time: "6:00 AM - 6:00 PM",
    location: "Rathna Residency, VOC Park Road, Near Bus Stand, Erode",
    status: "open",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=1200",
    description: "Building upon the foundations of Level I, the Level II program dives deeper into advanced yogic practices, intense meditation, and self-realization techniques. This program requires prior completion of Level I.",
    benefits: [
      "Advanced pranayama techniques",
      "Deep dive into spiritual philosophy",
      "Intensive guided meditation",
      "Techniques for sustained inner peace"
    ],
    eligibility: "Must have completed Shiva Kriya Yogam Level I.",
    dressCode: "Traditional and comfortable wear (Vesti & Shirt / Track Pants & T-Shirt)",
  },
  {
    id: "3",
    title: "Sivanodu Shivarathiri",
    date: "Coming Soon",
    time: "To be announced",
    location: "To be announced",
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1604944985226-79173ebfc486?auto=format&fit=crop&q=80&w=1200",
    description: "A profound spiritual gathering celebrating the divine energy of Shiva. Experience a night of continuous meditation, chanting, and spiritual awakening.",
    benefits: [
      "Experience intense spiritual energy",
      "Community chanting and devotion",
      "Special guidance from Guruji"
    ],
    eligibility: "Open to all sincere seekers.",
    dressCode: "Traditional wear highly recommended.",
  },
];

export default function ProgramDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const program = programsData.find(p => p.id === id);

  if (!program) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Program Not Found</h1>
        <p className="text-gray-600 mb-8">The program you are looking for does not exist or has been removed.</p>
        <Link href="/programs" className="px-6 py-3 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 font-medium">
          Back to Programs
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-24 bg-gray-50 min-h-screen pb-24">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${program.image}')` }}
        ></div>
        <div className="absolute inset-0 bg-gray-900/60"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link href="/programs" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-wider">
              <ArrowLeft size={16} /> Back to Programs
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight max-w-3xl leading-tight"
            >
              {program.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 max-w-5xl -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Details (Left) */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Program</h2>
              <p className="text-gray-700 leading-relaxed text-lg font-light mb-8">
                {program.description}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">What You Will Learn</h3>
              <ul className="space-y-4">
                {program.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-6 h-6 text-brand-primary shrink-0" />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Guidelines & Eligibility</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-2">Eligibility</h4>
                  <p className="text-gray-700">{program.eligibility}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-2">Dress Code</h4>
                  <p className="text-gray-700">{program.dressCode}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar / Info Card (Right) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-primary sticky top-28"
            >
              {program.status === "open" ? (
                <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-max mb-6">
                  Registrations Open
                </div>
              ) : (
                <div className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-max mb-6">
                  Coming Soon
                </div>
              )}

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 text-brand-primary">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</h5>
                    <p className="font-medium text-gray-900">{program.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 text-brand-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Time</h5>
                    <p className="font-medium text-gray-900">{program.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-gray-700">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 text-brand-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</h5>
                    <p className="font-medium text-gray-900 leading-relaxed text-sm">{program.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                {program.status === "open" ? (
                  <Link
                    href="/contact#register"
                    className="block w-full py-4 text-center bg-brand-primary text-white font-bold rounded-[0px] hover:bg-brand-primary transition-colors shadow-md hover:shadow-xl"
                  >
                    Register Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full py-4 text-center bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed"
                  >
                    Not Available Yet
                  </button>
                )}

                <p className="text-xs text-center text-gray-500 mt-4">
                  For inquiries, please <Link href="/contact" className="text-brand-primary hover:underline">contact support</Link>.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
