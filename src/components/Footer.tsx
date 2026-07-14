import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FFF7ED] border-t border-gray-200 pt-24 pb-12 font-sans text-gray-900">
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[3rem] bg-brand-primary flex items-center justify-center font-bold text-lg text-white">
                SK
              </div>
              <div>
                <h4 className="font-bold text-lg tracking-tight leading-none">
                  Sri Kandhaguru
                </h4>
                <p className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  Foundation
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pr-4 font-light">
              Guiding individuals toward inner peace, self-realization, and
              holistic well-being through the timeless wisdom of Shiva Kriya
              Yogam.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/sri_kandhaguru/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/40 border border-orange-900/10 flex items-center justify-center p-[5px] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-white hover:shadow-xl"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                  alt="insta"
                  className="w-full h-full object-contain mix-blend-multiply hover:mix-blend-normal"
                />
              </a>
              <a
                href="https://www.facebook.com/srikandhaguruguruji/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/40 border border-orange-900/10 flex items-center justify-center p-[5px] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-white hover:shadow-xl"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/15047/15047435.png"
                  alt="fb"
                  className="w-full h-full object-contain mix-blend-multiply hover:mix-blend-normal"
                />
              </a>
              <a
                href="https://www.youtube.com/@srikandhagurufoundation"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/40 border border-orange-900/10 flex items-center justify-center p-[5px] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:bg-white hover:shadow-xl"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670147.png"
                  alt="YT"
                  className="w-full h-full object-contain mix-blend-multiply hover:mix-blend-normal"
                />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold text-gray-900 mb-6 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/benefits"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-gray-900 mb-6 uppercase tracking-widest">
              Programs
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/programs/1"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  Shiva Kriya Yogam I
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/2"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  Shiva Kriya Yogam II
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/3"
                  className="text-gray-500 hover:text-brand-primary transition-colors"
                >
                  Sivanodu Shivarathiri
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-brand-primary font-bold hover:text-brand-primary/80 transition-colors inline-flex items-center gap-1 mt-2"
                >
                  View all programs <ArrowRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-gray-900 mb-6 uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-5 text-sm text-gray-500 font-medium">
              <li className="flex gap-3 items-start group">
                <MapPin
                  size={40}
                  className="text-gray-400 mt-0.5 group-hover:text-brand-primary transition-colors"
                />
                <span className="leading-relaxed">
                  211, Kandhaguru Garden, Koothampatti, Sanniyasipatti Post,
                  Bhavani, Erode, 638311
                </span>
              </li>
              <li className="flex gap-3 items-start group">
                <Phone
                  size={16}
                  className="text-gray-400 mt-0.5 group-hover:text-brand-primary transition-colors"
                />
                <div className="space-y-1">
                  <p>+91 98420 23346</p>
                  <p>+91 94423 54431</p>
                </div>
              </li>
              <li className="flex gap-3 items-center group">
                <Mail
                  size={16}
                  className="text-gray-400 group-hover:text-brand-primary transition-colors"
                />
                <span>info@srikandhaguru.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium tracking-wide">
          <p>
            &copy; {new Date().getFullYear()} Sri Kandhaguru Foundation. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
