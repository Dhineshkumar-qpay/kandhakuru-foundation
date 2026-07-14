"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Vision", href: "#vision" },
    { name: "Mission", href: "#mission" },
    { name: "Kriya Yogam", href: "#kriya-yogam" },
    { name: "Benefits", href: "#benefits" },
    { name: "Programs", href: "#programs" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-xl">
            SK
          </div>
          <span className={`font-bold text-lg md:text-xl ${isScrolled ? "text-brand-primary" : "text-white"}`}>
            Sri Kandhaguru
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-brand-primary transition-colors ${
                isScrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#register"
            className="bg-brand-primary text-white px-6 py-2 rounded-full font-medium hover:bg-brand-primary/90 transition-all hover:scale-105 shadow-lg shadow-brand-primary/30"
          >
            Join Program
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-brand-primary bg-white p-2 rounded-md shadow-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col gap-4 px-4 lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-brand-primary font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#register"
            className="bg-brand-primary text-white text-center px-6 py-3 rounded-full font-medium mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Program
          </Link>
        </motion.div>
      )}
    </header>
  );
}
