"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Shiva Kriya Yogam?",
    answer: "Shiva Kriya Yogam is an ancient spiritual science that balances the body, mind, and soul. It involves specific breathing techniques, meditation, and physical postures that help in self-realization and holistic well-being, preserving the timeless wisdom taught by Mahaavatar Babaji."
  },
  {
    question: "Who can attend the programs?",
    answer: "Anyone above 12 years of age can attend our programs. The practices are designed to be safe and beneficial for people of all backgrounds, professions, and physical fitness levels."
  },
  {
    question: "Is prior experience required?",
    answer: "No prior experience in yoga or meditation is required. Our programs are structured to guide beginners step-by-step while also offering profound depths for experienced practitioners."
  },
  {
    question: "What should I wear?",
    answer: "We recommend traditional and comfortable wear. For men, Vesti & Shirt or Track Pants & T-Shirt. For women, comfortable traditional attire that allows easy movement and sitting on the floor."
  },
  {
    question: "How do I register for a program?",
    answer: "You can register through our website by filling out the registration form in the 'Contact' section. Alternatively, you can call or WhatsApp us on the numbers provided for manual registration."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-3">Got Questions?</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-foreground">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                openIndex === index ? "border-brand-primary bg-brand-primary/5" : "border-gray-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-semibold text-lg pr-8 ${openIndex === index ? "text-brand-primary" : "text-foreground"}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180 bg-brand-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
