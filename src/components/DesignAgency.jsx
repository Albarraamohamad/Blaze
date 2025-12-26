import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Instagram, Twitter, Mail, Menu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import p2 from '/src/assets/p2.png'
import p3 from '/src/assets/p3.png'
import p4 from '/src/assets/p4.png'
import p5 from '/src/assets/p5.png'

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Export splitText so it can be used in Footer or Home files
export const splitText = (text) => {
  if (typeof text !== 'string') return text;
  return text.split("").map((char, i) => (
    <span key={i} className="  py-1 -my-1">
      <span className="char   opacity-0 ">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
};

const DesignAgency = () => {
  const storeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // --- 1. UNIVERSAL LETTER REVEAL ---
      const revealContainers = gsap.utils.toArray(".scroll-reveal");
      revealContainers.forEach((container) => {
        const letters = container.querySelectorAll(".char");
        gsap.to(letters, {
          scrollTrigger: {
            trigger: container,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.01,
          ease: "expo.out",
        });
      });

      // --- 2. HERO IMAGE BOX REVEAL ---
      gsap.from(".hero-video-box", { 
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center",
        },
        scaleX: 0,
        transformOrigin: "left",
        opacity: 0,
        duration: 1.8, 
        ease: "expo.inOut" 
      });

      // --- 3. PROJECT CARD STAGGER ---
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out"
      });

      // --- 4. PARALLAX EFFECT ---
      gsap.utils.toArray(".reveal-img").forEach(img => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          scale: 1.2,
          y: -20,
          ease: "none"
        });
      });

    }, storeRef);

    ScrollTrigger.refresh();
    return () => ctx.revert(); 
  }, []);

  const projects = [
    { id: 1, title: 'Neo-Tokyo Posterset', category: 'Print Design', image: p2 },
    { id: 2, title: 'Velocity Brand Identity', category: 'Logo Design', image: p3 },
    { id: 3, title: 'Abstract Geometry', category: 'Visual Arts', image: p4 },
    { id: 4, title: 'Minimalist Editorial', category: 'Typography', image: p5 }
  ];

  return (
    <div ref={storeRef} className="min-h-screen bg-[#0f0f0f] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      
    
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex flex-col justify-center px-5 lg:px-10 pt-32 pb-24">
        <div className="max-w-[1800px] mx-auto w-full">
          
          {/* Main Title */}
          <div className="scroll-reveal mb-16 lg:mb-24">
            <p className="text-orange-500 text-xs md:text-sm tracking-[0.5em] font-bold uppercase mb-8">
              {splitText("Visual Excellence")}
            </p>
            <h2 className="text-[16vw] md:text-[13vw] lg:text-[11vw] font-black tracking-tighter leading-[0.8] uppercase">
              {splitText("Design")} <br /> 
              {splitText("That")} <span className="text-transparent [-webkit-text-stroke:2px_white]">{splitText("Speaks")}</span>
            </h2>
          </div>

          {/* Sub Content */}
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5 scroll-reveal">
              <p className="text-gray-400 text-xl md:text-2xl lg:text-3xl max-w-sm mb-12 font-medium leading-[1.1] tracking-tight">
                {splitText("We craft brutalist identities, cinematic posters, and logos that define the next generation of brands.")}
              </p>
              
              <div className="group inline-flex items-center gap-6 cursor-pointer">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowUpRight className="w-8 h-8" />
                </div>
                <span className="text-sm uppercase tracking-widest font-bold">
                  {splitText("Start a Project")}
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="hero-video-box z-20 relative aspect-video bg-zinc-900 overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400"
                  alt="Studio Design"
                  className="reveal-img w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Projects Section */}
<section className="py-40 px-5 lg:px-10 bg-black text-white">
  <div className="max-w-[1800px] mx-auto">
    <div className="scroll-reveal flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
      <h3 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8]">
        {splitText("Works")}
      </h3>
      <p className="text-gray-500 max-w-xs text-sm uppercase tracking-widest font-bold">
        {splitText("Selected creations from 2023—2025.")}
      </p>
    </div>
    
    <div className="projects-grid grid grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10">
      {projects.map((project) => (
        <div key={project.id} className="project-card group cursor-pointer relative">
          
          {/* THE IMAGE BOX CONTAINER - SAME HEIGHT FOR ALL */}
          <div className="relative h-[300px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-zinc-900">
            <img 
              src={project.image}
              alt={project.title}
              className="reveal-img w-full h-full object-cover  transition-all duration-1000 scale-110" 
            />

            {/* 1. GRADIENT OVERLAY (Ensures text is readable) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* 2. THE INFO CARD (Positioned Absolute Bottom-Left) */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-12 flex justify-between items-end">
              <div className="scroll-reveal">
                <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  {splitText(project.category)}
                </p>
                <h4 className="text-xl sm:text-2xl md:text-4xl lg:text-4xl  uppercase tracking-tighter leading-none">
                  {splitText(project.title)}
                </h4>
              </div>

              {/* Arrow Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-500 flex-shrink-0">
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-45 transition-transform duration-500" />
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