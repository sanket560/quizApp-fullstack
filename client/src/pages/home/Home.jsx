import React from 'react'
import HeroSection from './HeroSection'
import LatestQuizz from './latestQuizz/LatestQuizz'

const Home = () => {
  return (
    <div className='md:mt-12'>
      <HeroSection/>
      <LatestQuizz/>
    </div>
  )
}

export default Home