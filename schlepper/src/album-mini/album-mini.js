import { useState } from 'react'
import apiService from '../APIservice'
import './album-mini.css'


function MiniAlbum ({albumID}) {
    
    const [artists, setArtists] = useState([]);
    const [title, setTitle] = useState("");
    const [label, setLabel] = useState("");
    const [year, setYear] = useState(0);
    const [picURL, setPicURL] = useState("")
    
    async function getInfo () {
      const info =  await apiService.getAlbumInfo(albumID)
      if (info) {
        const label = info.labels[0].name;
         setArtists(info.artists_sort);
         setTitle(info.title);
         setYear(info.year);
         setLabel(label);
         setPicURL(info.thumb)
      }
    } 
    
    getInfo()
    

    return (
        <div className="mini">
          <img src={picURL} alt="Album Cover"/>
          <div>
            <h2>{title ? title : "Album"}</h2>
            <p>{artists ? artists : "Artist"}</p>
            <p>{label ? label : "Label"}</p>
            <p>{year ? year : "Year"}</p>
          </div>
        </div>
    )
}


export default MiniAlbum