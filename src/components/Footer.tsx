import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-100 to-orange-300 border-t border-orange-900/10 pt-24 pb-12 text-orange-900">
      <div className="w-full px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 max-w-7xl mx-auto">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange-950 flex items-center justify-center font-bold text-xl text-white shadow-sm">
                SK
              </div>
              <div>
                <h4 className="font-bold text-xl text-orange-950 tracking-tight">
                  Sri Kandhaguru
                </h4>
                <p className="text-orange-800 text-xs font-bold uppercase tracking-[0.2em] mt-0.5">
                  Foundation
                </p>
              </div>
            </div>
            <p className="text-orange-900/80 text-sm leading-relaxed pr-4 font-medium">
              Guiding individuals toward inner peace, self-realization, and
              holistic well-being through the timeless wisdom of Shiva Kriya
              Yogam.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/sri_kandhaguru/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-md bg-white/40 border border-orange-900/10 flex items-center justify-center hover:bg-orange-950 hover:text-white transition-all duration-300 text-orange-950 font-bold text-xs p-1 shadow-sm"
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
                className="w-10 h-10 rounded-md bg-white/40 border border-orange-900/10 flex items-center justify-center hover:bg-orange-950 hover:text-white transition-all duration-300 text-orange-950 font-bold text-xs p-1 shadow-sm"
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
                className="w-10 h-10 rounded-md bg-white/40 border border-orange-900/10 flex items-center justify-center hover:bg-orange-950 hover:text-white transition-all duration-300 text-orange-950 font-bold text-xs p-1 shadow-sm"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670147.png"
                  alt="YT"
                  className="w-full h-full object-contain mix-blend-multiply hover:mix-blend-normal"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-orange-950 mb-6 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/benefits"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold text-orange-950 mb-6 uppercase tracking-widest">
              Our Programs
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link
                  href="/#programs"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  Shiva Kriya Yogam Level I
                </Link>
              </li>
              <li>
                <Link
                  href="/#programs"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  Shiva Kriya Yogam Level II
                </Link>
              </li>
              <li>
                <Link
                  href="/#programs"
                  className="text-orange-900/80 hover:text-orange-950 hover:translate-x-1 inline-block transition-transform"
                >
                  Sivanodu Shivarathiri
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-orange-950 font-bold hover:text-orange-800 transition-colors inline-block mt-2 border-b border-orange-950/30 pb-0.5"
                >
                  Register for Event &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-orange-950 mb-6 uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-5 text-sm text-orange-900/90 font-medium">
              <li className="flex gap-4 items-start">
                <MapPin size={18} className="text-orange-800 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  211, Kandhaguru Garden, Koothampatti, Sanniyasipatti Post,
                  Bhavani, Erode, 638311
                </span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone size={18} className="text-orange-800 shrink-0" />
                <div>
                  <p>+91 98420 23346</p>
                  <p>+91 94423 54431</p>
                </div>
              </li>
              <li className="flex gap-4 items-center">
                <Mail size={18} className="text-orange-800 shrink-0" />
                <span>info@srikandhaguru.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-orange-900/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-orange-900/70 font-semibold tracking-wide max-w-7xl mx-auto">
          <p>
            &copy; {new Date().getFullYear()} Sri Kandhaguru Foundation. All
            rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-orange-950 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-950 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
