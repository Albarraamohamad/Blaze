import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import img1 from '/src/assets/p1.avif';
import img2 from '/src/assets/p2.avif';
import img3 from '/src/assets/p3.avif';
import img4 from '/src/assets/p4.avif';
import img5 from '/src/assets/p5.avif';
import img6 from '/src/assets/p6.avif';
import img7 from '/src/assets/p7.avif';
import img8 from '/src/assets/p8.avif';
import img9 from '/src/assets/p9.avif';

const items = [
  { id: 1, img: img1 }, { id: 2, img: img2 }, { id: 3, img: img3 },
  { id: 4, img: img4 }, { id: 5, img: img5 }, { id: 6, img: img6 },
  { id: 7, img: img7 }, { id: 8, img: img8 }, { id: 9, img: img9 },
];

const Reversed3DCarousel = () => {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["60%", "-140%"]);
  const y = useTransform(smoothProgress, [0, 0.25], ["-15vh", "0vh"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ x, y }} 
          // Added -webkit-perspective for Safari support
          className="flex -space-x-32 md:-space-x-64 px-[10vw] [perspective:3500px] [-webkit-perspective:3500px]"
        >
          {items.map((item, index) => (
            <Card key={item.id} img={item.img} progress={smoothProgress} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ img, progress, index }) => {
  const rotateX = useTransform(progress, [0, 1], [25, 5]);
  const rotateY = useTransform(
    progress,
    [0, 1],
    [55 - index * 2, -15 + index * 2] 
  );

  const scale = useTransform(progress, [0, 0.2], [0.85, 1]);
  
  // FIX FOR IPHONE: Physical Z-depth calculation
  const translateZ = (items.length - index) * 1; 

  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        scale,
        z: translateZ, // This forces depth sorting on iPhone
        zIndex: items.length - index,
        transformStyle: "preserve-3d",
      }}
      // Added transform-gpu to prevent disappearing images on iOS scroll
      className="relative shrink-0 w-[100vw] md:w-[35vw] aspect-video overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)] transform-gpu"
    >
      <img
        src={img}
        alt="Jewelry Piece"
        // Added block and w-full to ensure layout stability
        className="w-full h-full object-cover block"
      />
      <div className="absolute inset-0 bg-gradient-to-bl from-black/40 via-transparent to-white/10 pointer-events-none" />
    </motion.div>
  );
};

export default Reversed3DCarousel;