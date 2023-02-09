import React, { useState, useEffect } from 'react'
import Carousel from '../../../components/carousel/Carousel'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

import useFetch from '../../../hooks/useFetch'


const NowPlaying = () => {
    
    const { data, loading } = useFetch(`/movie/now_playing`);

    
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Continue Watching Movies</span>
            
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default NowPlaying