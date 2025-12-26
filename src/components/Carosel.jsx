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

  // KEEP ORIGINAL SCROLL DIRECTION: Moves from right to left
  const x = useTransform(smoothProgress, [0, 1], ["60%", "-140%"]);
  const y = useTransform(smoothProgress, [0, 0.25], ["-15vh", "0vh"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ x, y }} 
          // Negative space-x to maintain the tight overlap
          className="flex -space-x-32 md:-space-x-64 px-[10vw] perspective-[3500px]"
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
  // REVERSED ANGLE LOGIC:
  // rotateX: Flipped from negative to positive for reversed top-down view
  const rotateX = useTransform(progress, [0, 1], [25, 5]);

  // rotateY: Flipped from negative start to positive start
  const rotateY = useTransform(
    progress,
    [0, 1],
    [55 - index * 2, -15 + index * 2] 
  );

  const scale = useTransform(progress, [0, 0.2], [0.85, 1]);
  
  // Adjusted zIndex for the new overlap perspective
  const zIndex = items.length - index;

  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        scale,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      className="relative shrink-0 w-[100vw] md:w-[35vw] aspect-video overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
    >
      <img
        src={img}
        alt="Jewelry Piece"
        className="w-[900px] h-full "
      />
      {/* Reversed lighting gradient for the new slant */}
      <div className="absolute inset-0 bg-gradient-to-bl from-black/40 via-transparent to-white/10 pointer-events-none" />
    </motion.div>
  );
};

export default Reversed3DCarousel;