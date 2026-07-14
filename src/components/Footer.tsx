import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center font-bold text-xl">
                SK
              </div>
              <div>
                <h4 className="font-bold text-xl">Sri Kandhaguru</h4>
                <p className="text-brand-accent text-sm">Foundation</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Guiding individuals toward inner peace, self-realization, and holistic well-being through the timeless wisdom of Shiva Kriya Yogam.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors text-xs font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors text-xs font-bold">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="#home" className="text-gray-400 hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link href="#vision-mission" className="text-gray-400 hover:text-brand-primary transition-colors">Vision & Mission</Link></li>
              <li><Link href="#benefits" className="text-gray-400 hover:text-brand-primary transition-colors">Benefits</Link></li>
              <li><Link href="#gallery" className="text-gray-400 hover:text-brand-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">Our Programs</h4>
            <ul className="space-y-3">
              <li><Link href="#programs" className="text-gray-400 hover:text-brand-primary transition-colors">Shiva Kriya Yogam Level I</Link></li>
              <li><Link href="#programs" className="text-gray-400 hover:text-brand-primary transition-colors">Shiva Kriya Yogam Level II</Link></li>
              <li><Link href="#programs" className="text-gray-400 hover:text-brand-primary transition-colors">Sivanodu Shivarathiri</Link></li>
              <li><Link href="#register" className="text-gray-400 hover:text-brand-primary transition-colors">Register for Event</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <span className="text-brand-primary mt-1">📍</span>
                <span>211, Kandhaguru Garden, Koothampatti, Sanniyasipatti Post, Bhavani, Erode, 638311</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-primary mt-1">📞</span>
                <span>+91 98420 23346<br/>+91 94423 54431</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-primary mt-1">✉️</span>
                <span>info@srikandhaguru.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sri Kandhaguru Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
