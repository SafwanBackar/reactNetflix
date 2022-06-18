import React,{useEffect,useState} from 'react'
import {image_url, API_KEY} from '../../constants/constants'
import Youtube from 'react-youtube'
import './RowPost.css'
import instance from '../../axios'

function RowPost(props) {
  const opts = {
    height: '1080px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    }}
  const [movies,setMovies] = useState([])
  const [urlId,setUrlId] = useState('')
  useEffect(()=>{
    instance.get(props.url).then(res =>{
      setMovies(res.data.results)
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },[])
   const handleMovie = (id) =>{
    instance.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{
      if(res.data.results.length !== 0){
        setUrlId(res.data.results[0])

      }else{
        console.log('Array error')
      }
     })
   }

  return (
    <div className="row">
    <h2>{props.title}</h2>
       <div className="posters">
        {movies.map((obj)=>
          <img onClick={()=> handleMovie(obj.id)} src={`${image_url+obj.backdrop_path}`} alt="" className={props.isSmall ? 'smallPoster' : 'poster'} />
        )}
       </div>
      { urlId &&  <Youtube opts={opts} videoId={urlId.key}/>}
    </div>
  )
}

export default RowPost