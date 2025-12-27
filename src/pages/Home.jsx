import React from 'react'
import Slide from '../components/Slide'
import Hero from '../components/Hero'
import DesignAgency, { splitText } from '../components/DesignAgency'
import Footer from '../components/Footer'
import Carosel from '../components/Carosel'
import VideoSection from '../components/Video' // Renamed slightly to avoid conflict
import ScrollStack from '../components/Scroll'
import '../App.css'

// Import your videos here
import v1 from '/src/assets/blazev1.mp4'
import v2 from '/src/assets/blazev2.mp4'
import v3 from '/src/assets/blazev3.mp4'
import v4 from '/src/assets/blazev4.mp4'

const Home = () => {
  const cards = [
    { 
      title: "Minimal Elegance",
      description: "A study in restraint and sophistication. Clean lines meet premium materials.",
      video: v1,
    },
    { 
      title: "Urban Dynamics",
      description: "Bold geometry meets industrial aesthetics. Capturing the energy of the city.",
      video: v2,
    },
    { 
      title: "Nature Inspired",
      description: "Organic forms and natural textures create a harmonious blend of art and nature.",
      video: v3,
    },
    { 
      title: "Digital Renaissance",
      description: "Where technology meets creativity. Exploring digital innovation.",
      video: v4,
    },
  ];

  return (
    <div className="bg-black">
      <Hero />
      <DesignAgency />
      <Slide />
      <Carosel/>
      <VideoSection />
      
      {/* The ScrollStack handles the "Stop" logic. 
          We pass the items array which contains the video paths.
      */}
      <ScrollStack items={cards} />
      
      <Footer splitText={splitText} />
    </div>
  )
}

export default Home