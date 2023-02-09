import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import './hstyle.scss'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import Upcoming from './upcoming/Upcoming'
import NowPlaying from './nowPlaying/NowPlaying'


const Home = () => {
  return (
    <div className='homepage'>
        <HeroBanner />
        <Trending />
        <Popular />
        <TopRated />
        <Upcoming />
        <NowPlaying />
    </div>
  )
}

export default Home