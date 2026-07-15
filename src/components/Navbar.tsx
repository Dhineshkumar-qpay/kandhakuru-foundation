"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Benefits", href: "/benefits" },
    { name: "Programs", href: "/programs" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  const navbarBg =
    isScrolled || !isHomePage
      ? "bg-white shadow-md py-4"
      : "bg-transparent py-6";
  const textColor =
    isScrolled || !isHomePage ? "text-foreground" : "text-white/90";
  const brandColor =
    isScrolled || !isHomePage ? "text-brand-primary" : "text-white";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
    >
      <div className="w-full px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white rounded-xl shadow-md border border-gray-100/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img src="/appLogo.png" alt="Sri Kandhaguru Foundation" className="w-10 h-10 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`font-extrabold text-lg tracking-tight leading-none ${brandColor}`}>
              Sri Kandhaguru
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.25em] mt-1 ${isScrolled || !isHomePage ? "text-gray-500" : "text-white/70"}`}>
              Foundation
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-brand-primary transition-colors ${textColor}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-brand-primary text-white px-6 py-2 rounded-full font-medium hover:bg-brand-primary/90 transition-all hover:scale-105 shadow-lg shadow-brand-primary/30"
          >
            Join Program
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-brand-primary bg-white p-2 rounded-md shadow-sm border border-gray-100"
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
            href="/contact"
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
