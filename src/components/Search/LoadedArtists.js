import classes from './LoadedArtists.module.css'
import { useSelector } from 'react-redux'

const LoadedArtists = props => {

    const artistsData = useSelector(state => state.search.artists);
    const imagePick = Math.floor(Math.random() * 2)
    console.log(imagePick)
    console.log(artistsData)

    return <>
        <ul className={classes.artistUl}>
          {artistsData.map(artist => (
             <li key={artist.id}>
              <a href="/">
                <div className={classes.artistImg} value={artist.id}>
                    <img alt={artist.name} src={artist.images[imagePick]}/>
                </div>
                <div className={classes.artistName}>{artist.name}</div>
              </a>
            </li> 
          )        
          )}  
        </ul>
    </>
}

export default LoadedArtists;