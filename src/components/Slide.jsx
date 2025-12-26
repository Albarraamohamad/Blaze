import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

const JewelryItem = ({ title, price, image }) => (
  <div className="bg-white overflow-hidden group cursor-pointer w-full">
    <div className="aspect-[4/5] bg-[#F7F7F7] flex items-center justify-center overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
    </div>
    <div className="py-2 sm:py-4 px-1 text-center md:text-left">
      <h3 className="text-[9px] sm:text-[13px] font-light tracking-tight text-gray-800 mb-1 uppercase leading-tight">
        {title}
      </h3>
      <p className="text-[10px] sm:text-[15px] font-medium text-gray-900">{price}</p>
    </div>
  </div>
);

const RollingColumn = ({ items, direction = 'up', offset = 0 }) => {
  const containerRef = useRef(null);
  
  // Track scroll of the whole page
  const { scrollYProgress } = useScroll();

  // Smoothing the scroll progress for a premium "rolling" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01
  });

  // Map scroll to a large Y-axis movement to create the parallax rolling effect
  // We use different ranges for different columns to vary the "roll" speed
  const y = useTransform(
    smoothProgress, 
    [0, 1], 
    direction === 'up' ? [offset, -2000] : [-2000, offset]
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-4 sm:gap-12">
      <motion.div style={{ y }} className="flex flex-col gap-4 sm:gap-12">
        {/* We map the items twice to ensure the column is long enough to roll */}
        {[...items, ...items, ...items].map((item, idx) => (
          <JewelryItem key={idx} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

export default function ScrollRollingGallery() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2, // Slower duration for a more "weighted" luxury feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
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
    <div className="bg-white min-h-[300vh] selection:bg-neutral-100">
      {/* Sticky container to keep the 3 columns in view while rolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden px-2 sm:px-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-16 h-full items-start pt-20">
          <RollingColumn items={column1Items} direction="up" offset={0} />
          <RollingColumn items={column2Items} direction="down" offset={-900} />
          <RollingColumn items={column3Items} direction="up" offset={-400} />
        </div>
      </div>
    </div>
  );
}