import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const StackItem = ({ index, video, title, description }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // THE PINNING LOGIC
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top top",
        end: "+=100%", 
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        onEnter: () => {
          // Play video when card enters
          if (videoRef.current) {
            videoRef.current.play().catch(err => console.log('Autoplay prevented:', err));
          }
        },
        onLeave: () => {
          // Pause video when card leaves
          if (videoRef.current) {
            videoRef.current.pause();
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cardRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src={video}
        className="absolute inset-0 w-full h-full "
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-5" />

      {/* Centered Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        <span className="text-orange-500 font-mono text-sm tracking-[0.5em] uppercase mb-4 animate-fadeIn">
          Project {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] text-white animate-fadeInUp">
          {title}
        </h2>
        <p className="mt-8 text-white text-sm md:text-lg max-w-xl mx-auto font-medium uppercase tracking-widest animate-fadeInUp animation-delay-200">
          {description}
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-xs uppercase tracking-widest opacity-70">
            Scroll to continue
          </div>
          <svg className="w-5 h-5 mx-auto mt-2 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const ScrollStack = ({ items }) => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="relative  bg-black">
      {items && items.length > 0 ? (
        <>
          {items.map((item, index) => (
            <StackItem 
              key={index}
              index={index}
              video={item.video}
              title={item.title}
              description={item.description}
            />
          ))}
          {/* Spacer for final card to stay pinned */}
          <div className="h-screen bg-black" />
        </>
      ) : (
        <div className="h-screen w-full flex items-center justify-center text-white text-2xl">
          No items provided
        </div>
      )}
    </div>
  );
};

export default ScrollStack;