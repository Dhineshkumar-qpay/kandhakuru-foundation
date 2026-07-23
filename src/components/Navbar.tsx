"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const isShopSection =
    pathname.startsWith("/shop") ||
    pathname.startsWith("/my-account") ||
    pathname.startsWith("/checkout");

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
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Donate", href: "/donate" },
    { name: "Shop", href: "/shop" },
    { name: "Contact Us", href: "/contact" },
  ];

  const navbarBg = isShopSection
    ? "bg-[var(--color-deepgreen)] shadow-lg py-4"
    : isScrolled || !isHomePage
      ? "bg-white shadow-md py-4"
      : "bg-transparent py-6";
  const textColor = isShopSection
    ? "text-white"
    : isScrolled || !isHomePage
      ? "text-gray-700"
      : "text-white/90";
  const brandColor = isShopSection
    ? "text-white"
    : isScrolled || !isHomePage
      ? "text-gray-900"
      : "text-white";

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
      >
        <div className="w-full px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-xl shadow-md border border-gray-100/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/appLogo.png"
                alt="Sri Kandhaguru Foundation"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-extrabold text-lg tracking-tight leading-none ${brandColor}`}
              >
                Sri Kandhaguru
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.3em] mt-1 ${isShopSection ? "text-white/90" : isScrolled || !isHomePage ? "text-amber-500" : "text-white/80"}`}
              >
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-seminbold tracking-wider transition-colors ${
                    isActive
                      ? isShopSection
                        ? "text-white"
                        : "text-brand-primary"
                      : `${textColor} ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${isShopSection ? "bg-white" : "bg-brand-primary"}`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {isShopSection && (
              <div className={`flex items-center gap-4 mr-2 ${textColor}`}>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`transition-colors relative cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <ShoppingCart size={24} />
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${isShopSection ? "bg-white text-[var(--color-deepgreen)]" : "bg-brand-primary text-white"}`}
                  >
                    2
                  </span>
                </button>
                <button
                  onClick={() => router.push("/my-account")}
                  className={`transition-colors cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <User size={24} />
                </button>
              </div>
            )}
            <Link
              href="/contact"
              className={`${isShopSection ? "bg-white text-[var(--color-deepgreen)] hover:bg-white/90" : "bg-brand-primary text-white hover:bg-brand-primary"} px-7 py-2.5 rounded-[0px] text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5`}
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Nav Actions */}
          <div className="flex items-center gap-3 lg:hidden ">
            {isShopSection && (
              <div className={`flex items-center gap-3 mr-1 ${textColor}`}>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className={`transition-colors relative cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <ShoppingCart size={20} />
                  <span
                    className={`absolute -top-1 -right-1 w-3.5 h-3.5 text-[8px] font-bold rounded-full flex items-center justify-center ${isShopSection ? "bg-white text-[var(--color-deepgreen)]" : "bg-brand-primary text-white"}`}
                  >
                    2
                  </span>
                </button>
                <button
                  onClick={() => router.push("/my-account")}
                  className={`transition-colors cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <User size={20} />
                </button>
              </div>
            )}

            <button
              className={`${isShopSection ? "text-[var(--color-deepgreen)] bg-white" : "text-brand-primary bg-white border-gray-100"} p-2 rounded-md shadow-sm border`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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
              Join Us
            </Link>
          </motion.div>
        )}
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
