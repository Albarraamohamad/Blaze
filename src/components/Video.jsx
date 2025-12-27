import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import high from '/src/assets/high.mp4';

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // This pins the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",      // When the top of the video hits the top of the viewport
        end: "+=2000",         // How long the "stop" lasts (in pixels)
        pin: true,             // Locks the element in place
        pinSpacing: true,      // Pushes following content down
        scrub: true,
      });

      // Optional: Animate the video scale or opacity while pinned
      gsap.fromTo(videoRef.current, 
        { scale: 0.8, borderRadius: "2rem" },
        {
          scale: 1,
          borderRadius: "0rem",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=800",
            scrub: true,
          }
        }
      );
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    /* h-screen ensures the section takes up the full view before pinning */
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <video 
        ref={videoRef}
        src={high} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover block"
      >
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Video;