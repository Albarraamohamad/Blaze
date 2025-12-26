import React from 'react';
import high from '/src/assets/high.mp4';

const Video = () => {
  return (
    <section style={{ width: '100%', overflow: 'hidden' }}>
      <video 
        src={high} 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      >
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Video;