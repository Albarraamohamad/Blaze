import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import your assets
import p2 from '/src/assets/p2.png';
import p3 from '/src/assets/p3.png';
import p4 from '/src/assets/p4.png';
import p5 from '/src/assets/p5.png';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * OPTIMIZED SPLIT TEXT:
 * Switches between character splitting (for titles) and word splitting (for paragraphs)
 * to prevent performance lag.
 */
export const splitText = (text, type = "char") => {
  if (typeof text !== 'string') return text;
  
  if (type === "word") {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.2em] leading-[1.3]">
        <span className="char inline-block opacity-0 translate-y-[100%] will-change-transform">
          {word}
        </span>
      </span>
    ));
  }

  return text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden leading-[1.1]">
      <span className="char inline-block opacity-0 translate-y-[100%] will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
};

const DesignAgency = () => {
  const storeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- 1. OPTIMIZED REVEAL ---
      const revealContainers = gsap.utils.toArray(".scroll-reveal");
      revealContainers.forEach((container) => {
        const letters = container.querySelectorAll(".char");
        
        gsap.to(letters, {
          scrollTrigger: {
            trigger: container,
            start: "top 92%",
            // toggleActions: "play none none reverse", // Optional: reverse on scroll up for more "air"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02, 
          ease: "expo.out",
          force3D: true, // Forces GPU usage
        });
      });

      // --- 2. PARALLAX (GPU Optimized) ---
      gsap.utils.toArray(".reveal-img").forEach(img => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: -40,
          ease: "none"
        });
      });

    }, storeRef);

    return () => ctx.revert(); 
  }, []);

  const projects = [
    { id: 1, title: 'Neo-Tokyo Posterset', category: 'Print Design', image: p2 },
    { id: 2, title: 'Velocity Brand Identity', category: 'Logo Design', image: p3 },
    { id: 3, title: 'Abstract Geometry', category: 'Visual Arts', image: p4 },
    { id: 4, title: 'Minimalist Editorial', category: 'Typography', image: p5 }
  ];

  return (
    <div ref={storeRef} className="min-h-screen bg-[#0f0f0f] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden antialiased">
      
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex flex-col justify-center px-5 lg:px-10 pt-32 pb-24">
        <div className="max-w-[1800px] mx-auto w-full">
          
          <div className="scroll-reveal mb-16 lg:mb-24">
            <p className="text-orange-500 text-xs tracking-[0.5em] font-bold uppercase mb-8">
              {splitText("Visual Excellence")}
            </p>
            {/* Title uses clamp to prevent mobile clipping */}
            <h2 className="text-[clamp(3.5rem,14vw,11rem)] font-black tracking-tighter leading-[0.85] uppercase">
              {splitText("Design")} <br /> 
              {splitText("That")} <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">{splitText("Speaks")}</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5">
              <div className="scroll-reveal mb-12">
                {/* Paragraph uses WORD splitting for performance */}
                <p className="text-gray-400 text-xl md:text-2xl lg:text-3xl max-w-md font-medium leading-[1.3] tracking-tight">
                  {splitText("We craft brutalist identities, cinematic posters, and logos that define the next generation of brands.", "word")}
                </p>
              </div>
              
              <div className="group inline-flex items-center gap-6 cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowUpRight className="w-8 h-8" />
                </div>
                <div className="scroll-reveal">
                  <span className="text-sm uppercase tracking-widest font-bold">
                    {splitText("Start a Project")}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="hero-video-box z-20 relative aspect-video bg-zinc-900 overflow-hidden rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400"
                  alt="Studio Design"
                  className="reveal-img w-full h-full object-cover grayscale contrast-125 scale-110 will-change-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 md:py-40 px-5 lg:px-10 bg-black text-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="scroll-reveal flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-8">
            {/* Responsive "Works" text with clamp */}
            <h3 className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter uppercase leading-[0.8]">
              {splitText("Works")}
            </h3>
            <p className="text-gray-500 max-w-xs text-xs md:text-sm uppercase tracking-widest font-bold">
              {splitText("Selected creations from 2023—2025.", "word")}
            </p>
          </div>
          
          <div className="projects-grid grid grid-cols- md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project) => (
              <div key={project.id} className="project-card group cursor-pointer relative overflow-hidden">
                <div className="relative h-[450px] md:h-[600px] lg:h-[750px] overflow-hidden bg-zinc-900">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="reveal-img w-full h-full object-cover transition-all duration-1000 will-change-transform" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex justify-between items-end z-10">
                    <div className="scroll-reveal">
                      <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                        {splitText(project.category)}
                      </p>
                      <h4 className="text-2xl md:text-4xl uppercase tracking-tighter leading-none">
                        {splitText(project.title, "word")}
                      </h4>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500 flex-shrink-0">
                      <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignAgency;