import React from 'react'
import Slide from '../components/Slide'
import Hero from '../components/Hero'
import DesignAgency, { splitText } from '../components/DesignAgency'
import Footer from '../components/Footer'
import Carosel from '../components/Carosel'
import Video from '../components/Video'

const Home = () => {
  return (
    <div>
      <Hero />
      <DesignAgency />
      <Slide />
      <Video/>
      <Carosel/>
      
    

      <Footer splitText={splitText} />
    </div>
  )
}

export default Home