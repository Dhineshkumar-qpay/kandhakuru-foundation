"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, User, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CartSidebar from "./CartSidebar";
import { getCartCount } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useLanguage, Language } from "@/i18n/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { isLoggedIn, openLogin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const isShopSection =
    pathname.startsWith("/shop") ||
    pathname.startsWith("/my-account") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/order");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchCartCount = async () => {
    if (!isLoggedIn) {
      setCartCount(0);
      return;
    }
    try {
      const res = await getCartCount();
      if (res.success && res.data !== undefined) {
        setCartCount(Number(res.data) || 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartCount();
    const handleCartUpdate = () => fetchCartCount();
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("openCart", handleOpenCart);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("openCart", handleOpenCart);
    };
  }, [isLoggedIn]);

  const navLinks = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.about"), href: "/about" },
    { name: t("navbar.programs"), href: "/programs" },
    { name: t("events.events_title"), href: "/events" },
    { name: t("navbar.donate"), href: "/donate" },
    { name: t("navbar.shop"), href: "/shop" },
    { name: t("navbar.contact_us"), href: "/contact" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ta", label: "தமிழ்" },
    { code: "hi", label: "हिन्दी" },
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
                  className={`relative ${language === "en" || language === "hi" ? "text-sm" : "text-xs"} font-semibold tracking-wider transition-colors ${isActive
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
            {/* Language Switcher Desktop */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors cursor-pointer hover:bg-white/10 ${isShopSection ? "border-white/30 text-white hover:bg-white/10" : "border-gray-200 hover:border-brand-primary hover:bg-gray-50"} ${textColor}`}
              >
                <Globe size={16} />
                <span className="text-xs font-bold uppercase">
                  {languages.find((l) => l.code === language)?.label}
                </span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 flex flex-col z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`text-left px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${language === lang.code ? "text-brand-primary bg-brand-primary/5" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isShopSection && (
              <div className={`flex items-center gap-4 mr-2 ${textColor}`}>
                <button
                  onClick={() =>
                    isLoggedIn ? setIsCartOpen(true) : openLogin()
                  }
                  className={`transition-colors relative cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${isShopSection ? "bg-white text-[var(--color-deepgreen)]" : "bg-brand-primary text-white"}`}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() =>
                    isLoggedIn ? router.push("/my-account") : openLogin()
                  }
                  className={`transition-colors cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <User size={24} />
                </button>
              </div>
            )}

            {!isShopSection && (
              <button
                onClick={() =>
                  isLoggedIn ? router.push("/profile") : openLogin()
                }
                className={`transition-colors cursor-pointer mr-2 hover:text-brand-primary ${textColor}`}
              >
                <User size={24} />
              </button>
            )}
          </div>

          {/* Mobile Nav Actions */}
          <div className="flex items-center gap-3 lg:hidden ">
            {/* Language Switcher Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md border transition-colors ${isShopSection ? "border-white/30 text-white bg-white/10" : "border-gray-200 bg-white/20"} ${textColor}`}
              >
                <Globe size={16} />
                <span className="text-[10px] font-bold uppercase">
                  {languages.find((l) => l.code === language)?.label}
                </span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 flex flex-col z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`text-left px-4 py-2 text-sm font-medium transition-colors ${language === lang.code ? "text-brand-primary bg-brand-primary/5" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isShopSection && (
              <div className={`flex items-center gap-3 mr-1 ${textColor}`}>
                <button
                  onClick={() =>
                    isLoggedIn ? setIsCartOpen(true) : openLogin()
                  }
                  className={`transition-colors relative cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 w-3.5 h-3.5 text-[8px] font-bold rounded-full flex items-center justify-center ${isShopSection ? "bg-white text-[var(--color-deepgreen)]" : "bg-brand-primary text-white"}`}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() =>
                    isLoggedIn ? router.push("/my-account") : openLogin()
                  }
                  className={`transition-colors cursor-pointer ${isShopSection ? "hover:text-white/80" : "hover:text-brand-primary"}`}
                >
                  <User size={20} />
                </button>
              </div>
            )}

            {!isShopSection && (
              <button
                onClick={() =>
                  isLoggedIn ? router.push("/profile") : openLogin()
                }
                className={`transition-colors cursor-pointer mr-1 hover:text-brand-primary ${textColor}`}
              >
                <User size={20} />
              </button>
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
                className="text-sm text-gray-800 hover:text-brand-primary font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </header>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
