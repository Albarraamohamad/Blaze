import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LightRays from './Bg';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  // Helper to split text into individual spans for GSAP stagger animations
  const splitLetters = (text) => {
    if (!text) return null;
    return text.split("").map((char, i) => (
      <span key={i} className="letter inline-block transform-gpu will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" }
      });

      // 1. Set initial hidden states (Z-axis rotation for 3D flip effect)
      gsap.set(".letter", { 
        opacity: 0, 
        y: 80, 
        rotateX: -90, 
        z: -100 
      });
      gsap.set(".border-line", { scaleX: 0 });
      gsap.set(".nav-container", { y: -20, opacity: 0 });

      // 2. Entrance Animation Sequence
      tl.to(".main-title .letter", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        stagger: { amount: 0.6, from: "center" },
        duration: 1.8,
        ease: "elastic.out(1, 0.8)"
      })
      .to(".nav-container", {
        y: 0,
        opacity: 1,
        duration: 1,
      }, "-=1.2")
      .to(".nav-item .letter, .footer-info .letter", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        z: 0,
        stagger: 0.01,
        duration: 0.8,
      }, "-=0.8")
      .to(".border-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut"
      }, "-=0.5");

      // 3. Smooth Mouse Parallax (Follows mouse movement)
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(titleRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out"
        });
        
        gsap.to(".light-bg", {
          x: -xPos,
          y: -yPos,
          duration: 2,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] text-white px-6 py-8 flex flex-col justify-between overflow-hidden antialiased"
      style={{ perspective: '1200px' }}
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="light-bg absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00e5ff"
          raysSpeed={1.0}
          lightSpread={0.8}
          className="w-full h-full opacity-40"
        />
        {/* Vignette to focus center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />
      </div>

      {/* --- NAVIGATION LAYER --- */}
      <nav className="nav-container relative z-10 flex justify-between items-center w-full uppercase tracking-[0.2em] text-[10px] ">
        <div className="nav-item text-2xl md:text-3xl  tracking-tighter leading-none italic">
          {splitLetters("BLAZE")}
        </div>
        
        <div className="hidden lg:flex gap-20 absolute left-1/2 -translate-x-1/2">
          <a href="#projects" className="nav-item hover:text-cyan-400 transition-colors duration-500">
            {splitLetters("Projects")}
          </a>
          <a href="#about" className="nav-item hover:text-cyan-400 transition-colors duration-500">
            {splitLetters("About")}
          </a>
        </div>

        <div className="flex gap-4 md:gap-10 items-center">
          <a href="#contact" className="nav-item border border-white/20 px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-500">
            {splitLetters("Contact")}
          </a>
          <span className="nav-item hidden sm:inline-block opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
            {splitLetters("[EN]")}
          </span>
        </div>
      </nav>

      {/* --- CENTER TITLE LAYER --- */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center select-none">
        <h1 
          ref={titleRef} 
          className="main-title text-[28vw] md:text-[22vw]  tracking-tighter leading-[0.75] uppercase text-center text-white mix-blend-difference"
        >
          {splitLetters("BLAZE")}
        </h1>
        {/* Subtle cyan glow behind text */}
        <div className="absolute w-[60vw] h-[25vh] bg-cyan-500/5 blur-[100px] rounded-full -z-10" />
      </div>

      {/* --- FOOTER INFO LAYER --- */}
      <div className="relative z-10 w-full">
        <div className="border-line w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-2">
          <div className="footer-info text-[10px] uppercase tracking-[0.4em] font-black opacity-80">
            <span className="text-cyan-400">©2025</span> — {splitLetters("DIGITAL ARCHIVE")}
          </div>
          
          <div className="footer-info max-w-[320px] text-right">
            <p className="text-[10px] md:text-[11px] leading-relaxed uppercase tracking-[0.15em] font-semibold opacity-50">
              {splitLetters("Pushing the boundaries of digital interaction through high-end design and cinematic motion experiences.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;