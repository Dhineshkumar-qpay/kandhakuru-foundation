"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Mock products
const products = [
  {
    id: 1,
    category: "Accessories",
    name: "Sacred Rudraksha Mala",
    description:
      "Authentic 108-bead mala sourced from the Himalayas for deep meditation.",
    price: "₹1,250",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNWoUiegATGhSrgZnE1R-eL0WLZP6DZel61izeIJh5coDYYcQngyMml1gh&s=10",
    rating: 5.0,
    tag: "Bestseller",
  },
  {
    id: 2,
    category: "Education",
    name: "Kriya Yoga Foundation Course",
    description:
      "Comprehensive guide to beginning your spiritual journey and mastering breath.",
    price: "₹800",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkre000Yae7UTBpdgfjUtJX05f-L3FOrmZGIOG5XMXLX_t7me4ELWbnJE&s=10",
    rating: 4.9,
  },
  {
    id: 3,
    category: "Wellness",
    name: "Pure Sandalwood Incense",
    description:
      "Hand-rolled natural incense sticks to purify your meditation space.",
    price: "₹450",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1CPRbrfFXv2shsD6s1TSeXnenSXa5DqqXfUzAYG9xW1vK-ZUdoy6lm-lR&s=10",
    rating: 4.8,
  },
  {
    id: 4,
    category: "Accessories",
    name: "Copper Meditation Vessel",
    description: "Traditional copper water vessel etched with sacred geometry.",
    price: "₹1,500",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjZpX2JEXvAxhvWBwgTvQtb8q2F6mrGaV0EogDNbI3w014VbRTd5X4VHw&s=10",
    rating: 4.9,
    tag: "New Arrival",
  },
];

const categories = ["All Products", "Education", "Accessories", "Wellness"];

export default function ShopPage() {
  const { isLoggedIn, openLogin } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All Products");

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen pt-0  text-[var(--foreground)]">
      {/* Corporate Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center py-16 lg:py-24 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest rounded-sm border border-brand-primary/20">
                Official Store
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
                Premium Spiritual Resources <br />
                <span className="text-brand-secondary">
                  Curated for Your Journey
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Explore our official selection of authentic spiritual tools,
                literature, and wellness items. Every purchase supports the
                foundation's global initiatives.
              </p>
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("products-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-brand-primary text-white px-8 py-3.5 font-bold tracking-wide shadow-[0_4px_14px_0_rgba(230,126,34,0.39)] hover:bg-brand-primary/90 transition-all hover:shadow-[0_6px_20px_rgba(230,126,34,0.23)] rounded-[0px] cursor-pointer"
                >
                  Shop Collection
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full hidden md:block"
            >
              <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop"
                  alt="Corporate Store Hero"
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent w-2/3"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="products-section" className="py-16">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row gap-10">
          {/* Sidebar / Filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white border border-gray-200 rounded-md p-6 sticky top-28 shadow-sm">
              <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-6">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeCategory}
              </h2>
              <span className="text-sm font-medium text-gray-500">
                {filteredProducts.length} Results
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white group border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    {product.tag && (
                      <div className="absolute top-3 right-3 z-10 bg-brand-secondary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                        {product.tag}
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                        <span className="text-xs font-bold text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 font-normal mb-6 flex-grow line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-xl font-extrabold text-gray-900">
                        {product.price}
                      </span>
                      <button 
                        onClick={() => {
                          if (!isLoggedIn) {
                            openLogin();
                          } else {
                            // User is logged in, proceed to purchase
                            alert("Proceeding to checkout...");
                          }
                        }}
                        className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors group-hover:gap-3"
                      >
                        Buy Now <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stylish Professional Trust Indicators */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-md border border-gray-100 hover:bg-brand-primary/5 hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <ShieldCheck className="text-brand-primary w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                100% Authentic Quality
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                Verified and blessed directly by the foundation masters.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-md border border-gray-100 hover:bg-brand-primary/5 hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <Truck className="text-brand-primary w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                Reliable Logistics
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                Secure and fast nationwide delivery for all spiritual tools.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-md border border-gray-100 hover:bg-brand-primary/5 hover:border-brand-primary/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <Clock className="text-brand-primary w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                24/7 Dedicated Support
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                Our service team is always here to assist with your journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
