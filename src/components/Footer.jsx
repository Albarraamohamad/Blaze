import React, { useEffect, useRef } from 'react';
import { Instagram, Twitter, ArrowUpRight, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Create a GSAP Context to handle cleanup and scope
    let ctx = gsap.context(() => {
      
      // 2. Refresh ScrollTrigger to ensure coordinates are correct 
      // especially if content above the footer loaded late
      ScrollTrigger.refresh();

      gsap.from('.footer-item', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%', // Triggers a bit later to avoid "freezing" on load
          toggleActions: 'play none none none', // Simple play to prevent glitching on reverse
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'expo.out', // Smoother ease for high-end feel
        clearProps: "all" // Cleans up styles after animation completes
      });
      
    }, footerRef);

    // 3. Cleanup to prevent memory leaks and "ghost" animations
    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-[#0f0f0f] text-white pt-24 pb-12 px-6 lg:px-12 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto">
        
        {/* Top Section */}
        <div className="footer-item mb-24">
          <p className="text-orange-500 text-xs tracking-[0.5em] font-bold uppercase mb-6">
            Have a project in mind?
          </p>
          <div className="group cursor-pointer inline-block">
            <h2 className="text-[10vw] font-black uppercase tracking-tighter leading-[0.8] hover:italic transition-all duration-500">
              Let's Talk
            </h2>
            <div className="h-2 bg-white w-0 group-hover:w-full transition-all duration-700" />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          <div className="footer-item">
            <h5 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-6">Services</h5>
            <ul className="space-y-3 text-sm font-medium uppercase tracking-tight">
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-300">Brand Identity</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-300">Logo Design</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-300">Poster Art</li>
              <li className="hover:text-orange-500 cursor-pointer transition-colors duration-300">Motion Graphics</li>
            </ul>
          </div>

          <div className="footer-item">
            <h5 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-6">Social</h5>
            <ul className="space-y-3 text-sm font-medium uppercase tracking-tight">
              <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer transition-colors">
                <Instagram className="w-3 h-3" /> Instagram
              </li>
              <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer transition-colors">
                <Twitter className="w-3 h-3" /> Twitter
              </li>
              <li className="flex items-center gap-2 hover:text-orange-500 cursor-pointer transition-colors">
                <Globe className="w-3 h-3" /> Behance
              </li>
            </ul>
          </div>

          <div className="footer-item lg:col-span-2">
            <h5 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-6">Offices</h5>
            <p className="text-gray-400 text-sm leading-relaxed uppercase tracking-widest mb-4">
              London / New York / Dubai
            </p>
            <a href="mailto:hello@studiovisual.design" className="inline-block text-white font-bold border-b border-white/20 hover:border-orange-500 hover:text-orange-500 transition-colors duration-300">
              HELLO@STUDIOVISUAL.DESIGN
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-item pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600">
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>© 2025 STUDIO VISUAL</span>
            <div className="w-1 h-1 bg-orange-500 rounded-full" />
            <span>Built for the bold</span>
          </div>

          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center gap-2 cursor-pointer text-white">
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight className="w-4 h-4 -rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;