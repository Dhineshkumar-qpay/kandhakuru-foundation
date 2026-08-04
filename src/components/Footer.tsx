"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";
import { getEvents } from "../services/api";
import { EventModel } from "../models/event_model";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const [programs, setPrograms] = useState<EventModel[]>([]);
  const pathname = usePathname();
  const { t } = useLanguage();
  const isShopSection =
    pathname?.startsWith("/shop") ||
    pathname?.startsWith("/my-account") ||
    pathname?.startsWith("/checkout") ||
    pathname?.startsWith("/order");

  // Dynamic theme colors
  const theme = isShopSection
    ? {
        grad1:
          "from-[var(--color-deepgreen)]/50 to-[var(--color-deepgreen)]/40",
        grad2:
          "from-[var(--color-deepgreen)]/50 to-[var(--color-deepgreen)]/40",
        textPrimary: "text-[var(--color-deepgreen)]",
        textSecondary: "text-[var(--color-deepgreen)]",
        textHover: "hover:text-[var(--color-deepgreen)]",
        bgDot: "bg-[var(--color-deepgreen)]",
        bgLight: "bg-[var(--color-deepgreen)]/10",
        bgHover: "hover:bg-[var(--color-deepgreen)]/20",
        borderLight: "border-[var(--color-deepgreen)]/20",
        borderHover: "hover:border-[var(--color-deepgreen)]/40",
      }
    : {
        grad1: "from-amber-300/50 to-orange-200/40",
        grad2: "from-orange-300/50 to-amber-200/40",
        textPrimary: "text-amber-600",
        textSecondary: "text-amber-500",
        textHover: "hover:text-amber-600",
        bgDot: "bg-amber-400",
        bgLight: "bg-amber-50",
        bgHover: "hover:bg-amber-100",
        borderLight: "border-amber-100",
        borderHover: "hover:border-amber-200",
      };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getEvents("offline", "level1");
        if (response.success && response.data?.events) {
          setPrograms(response.data.events.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load footer programs", error);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <footer className="relative bg-[#FAFAF9] pt-24 pb-12 font-sans overflow-hidden">
      {/* Decorative gradient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br ${theme.grad1} blur-3xl`}
        ></div>
        <div
          className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl ${theme.grad2} blur-3xl`}
        ></div>
      </div>

      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[1rem] p-8 md:p-12 border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div
              className={
                isShopSection
                  ? "md:col-span-12 lg:col-span-5 space-y-8"
                  : "md:col-span-12 lg:col-span-4 space-y-8"
              }
            >
              <Link href="/" className="flex items-center gap-4 group w-fit">
                <div
                  className={`w-14 h-14 bg-white rounded-2xl shadow-sm border ${theme.borderLight} flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-md transition-all duration-300`}
                >
                  <img
                    src="/appLogo.png"
                    alt="Sri Kandhaguru Foundation"
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-2xl tracking-tight leading-none text-slate-800">
                    Sri Kandhaguru
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${theme.textPrimary}`}
                  >
                    Foundation
                  </span>
                </div>
              </Link>
              <p className="text-slate-600 text-base leading-relaxed pr-4 font-light text-justify">
                {t("footer.description")}
              </p>
            </div>

            {/* Navigation Columns */}
            <div
              className={
                isShopSection
                  ? "md:col-span-6 lg:col-span-3 space-y-6"
                  : "md:col-span-4 lg:col-span-2 space-y-6"
              }
            >
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${theme.bgDot}`}></div>
                {t("footer.quick_links")}
              </h4>
              <ul className="space-y-4 text-slate-500 font-medium">
                {[
                  { name: t("navbar.home"), href: "/" },
                  { name: t("navbar.about"), href: "/about" },
                  { name: t("navbar.gallery"), href: "/gallery" },
                  { name: t("navbar.benefits"), href: "/benefits" },
                  { name: t("navbar.siddhargal"), href: "/siddhargal" },
                ].map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`${
                          isActive ? theme.textPrimary + " font-bold" : ""
                        } ${theme.textHover} hover:translate-x-1 inline-block transition-all duration-300`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {!isShopSection && (
              <div className="md:col-span-4 lg:col-span-3 space-y-6">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${theme.bgDot}`}></div>
                  {t("navbar.programs")}
                </h4>
                <ul className="space-y-4 text-slate-500 font-medium">
                  {programs.map((program) => (
                    <li key={program.id}>
                      <Link
                        href={`/programs/${program.id}`}
                        className="hover:text-amber-600 hover:translate-x-1 inline-block transition-all duration-300 line-clamp-1"
                      >
                        {program.title} - {program.city}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link
                      href="/programs"
                      className={`${theme.textPrimary} font-bold hover:opacity-80 transition-opacity inline-flex items-center gap-1.5 group`}
                    >
                      {t("home.prog_btn")}{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {/* Contact Details */}
            <div
              className={
                isShopSection
                  ? "md:col-span-6 lg:col-span-4 space-y-6"
                  : "md:col-span-4 lg:col-span-3 space-y-6"
              }
            >
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${theme.bgDot}`}></div>
                {t("footer.contact_us")}
              </h4>
              <ul className="space-y-5 text-slate-500 font-medium">
                <li className="flex gap-4 items-start group">
                  <div
                    className={`p-2.5 ${theme.bgLight} rounded-xl ${theme.bgHover} ${theme.textHover} transition-colors ${theme.textSecondary} shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)]`}
                  >
                    <MapPin size={18} />
                  </div>
                  <span className="leading-relaxed text-sm pt-0.5">
                    {t("footer.address")}
                  </span>
                </li>
                <li className="flex gap-4 items-start group">
                  <div
                    className={`p-2.5 ${theme.bgLight} rounded-xl ${theme.bgHover} ${theme.textHover} transition-colors ${theme.textSecondary} shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)]`}
                  >
                    <Phone size={18} />
                  </div>
                  <div className="space-y-1 text-sm pt-1">
                    <p>+91 98420 23346</p>
                    <p>+91 94423 54431</p>
                  </div>
                </li>
                <li className="flex gap-4 items-center group">
                  <div
                    className={`p-2.5 ${theme.bgLight} rounded-xl ${theme.bgHover} ${theme.textHover} transition-colors ${theme.textSecondary} shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)]`}
                  >
                    <Mail size={18} />
                  </div>
                  <span className="text-sm break-all">
                    srikandhagurufoundation@gmail.com
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium tracking-wide">
          <p className="text-center xl:text-left shrink-0 max-w-full px-2">
            &copy; {new Date().getFullYear()} Sri Kandhaguru Foundation. {t("footer.rights")}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://www.instagram.com/sri_kandhaguru/"
              target="_blank"
              rel="noreferrer"
              className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 ${theme.textHover} ${theme.borderHover} ${theme.bgHover} hover:-translate-y-1 transition-all duration-300 shadow-sm`}
              aria-label="Instagram"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                alt="insta"
                className="w-full h-full object-contain mix-blend-multiply hover:mix-blend-normal p-1"
              />
            </a>
            <a
              href="https://www.facebook.com/srikandhaguruguruji/"
              target="_blank"
              rel="noreferrer"
              className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 ${theme.textHover} ${theme.borderHover} ${theme.bgHover} hover:-translate-y-1 transition-all duration-300 shadow-sm`}
              aria-label="Facebook"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png"
                alt="fb"
                className="w-full h-full object-contain mix-blend-multiply hover:mix-blend-normal p-1"
              />
            </a>
            <a
              href="https://www.youtube.com/@srikandhagurufoundation"
              target="_blank"
              rel="noreferrer"
              className={`w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 ${theme.textHover} ${theme.borderHover} ${theme.bgHover} hover:-translate-y-1 transition-all duration-300 shadow-sm`}
              aria-label="YouTube"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3670/3670147.png"
                alt="YT"
                className="w-full h-full object-contain mix-blend-multiply hover:mix-blend-normal p-1"
              />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 xl:gap-6 px-4 text-center">
            <Link
              href="/privacy-policy"
              className={`${theme.textHover} transition-colors break-words`}
            >
              {t("footer.privacy_policy")}
            </Link>
            <div className="w-1 h-1 bg-slate-300 rounded-full shrink-0"></div>
            <Link
              href="/terms-and-conditions"
              className={`${theme.textHover} transition-colors break-words`}
            >
              {t("footer.terms_conditions")}
            </Link>
            <div className="w-1 h-1 bg-slate-300 rounded-full shrink-0"></div>
            <Link
              href="/shipping-policy"
              className={`${theme.textHover} transition-colors break-words`}
            >
              {t("footer.shipping_policy")}
            </Link>
            <div className="w-1 h-1 bg-slate-300 rounded-full shrink-0"></div>
            <Link
              href="/refund-policy"
              className={`${theme.textHover} transition-colors break-words`}
            >
              {t("footer.refund_policy")}
            </Link>
            <div className="w-1 h-1 bg-slate-300 rounded-full shrink-0"></div>
            <Link
              href="/disclaimer"
              className={`${theme.textHover} transition-colors break-words`}
            >
              {t("footer.disclaimer")}
            </Link>
          </div>
        </div>

        {/* Qpay Credit */}
        <div className="mt-10 pt-6 border-t border-slate-200/60 flex justify-center items-center">
          <a
            href="https://www.qpayindia.com/"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-wrap justify-center items-center gap-3 px-5 py-2.5 transition-all duration-300"
          >
            <span className="text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
              Developed by <span className="font-bold text-green-800 group-hover:text-[var(--color-deepgreen)] transition-colors">QPay India Private Limited</span>
            </span>
            <div className="bg-white rounded-lg p-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300">
              <img
                src="https://www.qpayindia.com/img/qpaylogo.png"
                alt="Qpay Logo"
                className="h-6 w-auto object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
