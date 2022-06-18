import React, {useEffect, useState} from "react";
import axios from "../../axios";
import './Banner.css'
import {API_KEY, image_url} from '../../constants/constants'


function Banner() {
    const [movie, setMovie] = useState()
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`).then((res)=>{
          console.log(res.data.results[0])
          setMovie(res.data.results[4])
        })
    
      }, [])
  return (
    <div style={{backgroundImage:`url(${movie ? image_url+movie.backdrop_path:""})`}} 
    className="banner">
      <div className="content">
        <h1 className="title">{movie? movie.title || movie.name : ''}</h1>
        <div className="buttons">
          <button className="button">Play</button>
          <button className="button">My list</button>
        </div>
        <div className="description">
        {movie? movie.overview : ''}
        </div>
      </div>
        <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
