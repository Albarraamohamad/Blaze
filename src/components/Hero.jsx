import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);

  // Optimized split text function
  const splitLetters = (text) => {
    if (!text) return null;
    return text.split("").map((char, i) => (
      <span 
        key={i} 
        className="letter inline-block transform-gpu" // transform-gpu forces hardware acceleration
        style={{ willChange: 'transform, opacity' }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    // 1. Create a GSAP Context (Crucial for React 18 cleanup)
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.2 }
      });

      // Clear any initial flicker by setting initial state
      gsap.set(".letter", { opacity: 0, y: 50 });

      tl.to(containerRef.current, { 
        backgroundColor: "#8b644f", 
        duration: 1.5 
      })
      .to(".nav-item .letter", {
        opacity: 1,
        y: 0,
        stagger: 0.01,
        duration: 0.8
      }, 0.2)
      .to(".main-title .letter", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.1,
        duration: 1.5,
        // Adding a slight 3D rotation effect
        startAt: { rotateX: -90 }
      }, 0.4)
      .to(".footer-info .letter", {
        opacity: 1,
        y: 0,
        stagger: 0.003, // Faster stagger for body text
        duration: 0.8
      }, 0.6)
      .from(".border-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut"
      }, 0.5);

    }, containerRef);

    // 2. Cleanup function to kill animations on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{ perspective: '1000px' }} // Enables 3D rotation without distortion
      className="relative w-full h-screen bg-[#a37a63] text-black px-6 py-8 flex flex-col justify-between overflow-hidden selection:bg-black selection:text-[#8c6d55]"
    >
      {/* Top Navigation Bar */}
      <nav ref={navRef} className="flex justify-between items-start w-full uppercase tracking-widest text-[13px] font-medium z-10">
        <div className="nav-item text-4xl font-semibold tracking-tighter leading-none">
          {splitLetters("MILL3")}
        </div>
        
        <div className="hidden md:flex gap-40 absolute left-1/2 -translate-x-1/2">
          <a href="#projects" className="nav-item hover:opacity-50 transition-opacity">
            {splitLetters("Projects")}
          </a>
          <a href="#about" className="nav-item hover:opacity-50 transition-opacity">
            {splitLetters("About")}
          </a>
        </div>

        <div className="flex gap-10">
          <a href="#contact" className="nav-item hover:opacity-50 transition-opacity">
            {splitLetters("Contact")}
          </a>
          <span className="nav-item cursor-pointer">{splitLetters("[FR]")}</span>
        </div>
      </nav>

      {/* Main Brand Title */}
      <div className="flex-1 flex flex-col justify-center select-none">
        <h1 ref={titleRef} className="main-title text-[25vw] font-medium tracking-tight leading-[0.8] uppercase flex justify-center">
          {splitLetters("MYEL")}
        </h1>
      </div>

      {/* Footer Info Section */}
      <div ref={footerRef} className="flex flex-col md:flex-row justify-between items-end w-full pt-6 relative">
        <div className="border-line absolute top-0 left-0 w-full h-[1px] bg-black/20 origin-left" />

        <div className="footer-info text-[11px] uppercase tracking-widest font-bold">
          <a href="#projects" className="underline underline-offset-4 decoration-1">
            {splitLetters("Projects")}
          </a> 
          <span className="mx-2">—</span>
          {splitLetters("MYEL")}
        </div>
        
        <div className="footer-info max-w-[300px] text-right mt-4 md:mt-0">
          <p className="text-[12px] leading-tight uppercase tracking-wider font-semibold">
            {splitLetters("High-end and responsible jewelry store. MYEL jewelry is made in Montreal and designed to stand the test of time.")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;