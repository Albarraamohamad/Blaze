import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Assets
import img1 from '/src/assets/1.jpg';
import img2 from '/src/assets/2.jpg';
import img3 from '/src/assets/3.jpg';
import img4 from '/src/assets/4.jpg';
import img5 from '/src/assets/5.jpg';
import img6 from '/src/assets/6.jpg';
import img7 from '/src/assets/7.jpg';
import img8 from '/src/assets/8.jpg';
import img9 from '/src/assets/9.jpg';
import img10 from '/src/assets/10.jpg';
import img11 from '/src/assets/11.jpg';
import img12 from '/src/assets/12.jpg';

gsap.registerPlugin(ScrollTrigger);

const JewelryItem = ({ title, price, image }) => (
  <div className="bg-white overflow-hidden group cursor-pointer w-full will-change-transform">
    <div className="aspect-[4/5] bg-[#F7F7F7] flex items-center justify-center overflow-hidden">
      <img 
        src={image} 
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
    </div>
    <div className="py-2 sm:py-4 px-1 text-center">
      {/* Fixed: clamp ensures text stays visible and single-line on mobile */}
      <h3 className="text-[clamp(10px,2.5vw,13px)] font-light tracking-tighter text-gray-800 mb-1 uppercase leading-none whitespace-nowrap truncate">
        {title}
      </h3>
      <p className="text-[clamp(11px,3vw,15px)] font-medium text-gray-900">{price}</p>
    </div>
  </div>
);

export default function ScrollRollingGallery() {
  const galleryRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Animations
    let ctx = gsap.context(() => {
      // Column 1: Moves UP
      gsap.to(col1Ref.current, {
        y: "-30%", 
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Column 2: Moves DOWN
      gsap.fromTo(col2Ref.current, 
        { y: "-20%" }, 
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );

      // Column 3: Moves UP (Faster)
      gsap.to(col3Ref.current, {
        y: "-45%",
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    }, galleryRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const column1Items = [
    { title: 'Abacus Ring', price: '$1375', image: img1 },
    { title: 'Austin Ring', price: '$1850', image: img2 },
    { title: 'Baguette Ring', price: '$1850', image: img3 },
    { title: 'Diamond Band', price: '$2100', image: img4 },
  ];

  const column2Items = [
    { title: 'Aura Ring', price: '$1000', image: img5 },
    { title: 'Sapphire Band', price: '$2250', image: img6 },
    { title: 'Red Spinel', price: '$2250', image: img7 },
    { title: 'Classic Band', price: '$950', image: img8 },
  ];

  const column3Items = [
    { title: 'Wave Ring', price: '$1275', image: img9 },
    { title: 'Curved Band', price: '$985', image: img10 },
    { title: 'Solitaire', price: '$1650', image: img11 },
    { title: 'Modern Ring', price: '$1400', image: img12 },
  ];

  return (
    <div ref={galleryRef} className="bg-white relative min-h-[400vh] selection:bg-neutral-100">
      <div className="sticky top-0 h-screen w-full overflow-hidden px-2 sm:px-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-16 h-full items-start pt-16 sm:pt-24">
          
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-4 sm:gap-12 will-change-transform">
            {[...column1Items, ...column1Items].map((item, idx) => (
              <JewelryItem key={`col1-${idx}`} {...item} />
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-4 sm:gap-12 mt-[-10vh] will-change-transform">
            {[...column2Items, ...column2Items].map((item, idx) => (
              <JewelryItem key={`col2-${idx}`} {...item} />
            ))}
          </div>

          {/* Column 3 */}
          <div ref={col3Ref} className="flex flex-col gap-4 sm:gap-12 will-change-transform">
            {[...column3Items, ...column3Items].map((item, idx) => (
              <JewelryItem key={`col3-${idx}`} {...item} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}