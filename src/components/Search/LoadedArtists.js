import classes from './LoadedArtists.module.css'
import { useSelector } from 'react-redux'
import Button from '../UI/Button';
import {Link} from 'react-router-dom'

const LoadedArtists = props => {

  const artistsData = useSelector(state => state.search.artists);
  const imagePick = Math.floor(Math.random() * 2)
  console.log(imagePick)
  console.log(artistsData)

  const addHighlight = event => {
  event.target.style.border = '3px solid rgb(94, 199, 94)'

  }

  const removeHighlight = event => {
    event.target.style.border = ''
    
  }


  return <>
  <h2> Click on any of these artists below to search about them</h2>
    <ul className={classes.artistUl}>
      {artistsData.map(artist => (
        <li key={artist.id + Math.random()*12}
        id = {artist.id}>
          <a href="/">
            <div className={classes.artistImg}
              onMouseOver={addHighlight}
              onMouseOut = {removeHighlight}>
              <img alt={artist.name} src={artist.images[imagePick]} />
            </div>
            <div className={classes.artistName}>{artist.name}</div>
          </a>
        </li>
      )
      )}
    </ul>
      <Link to='/prayer' className={classes.searchButton}> 
       <Button addclassName ={classes.searchButton} linkTag= '/player'>Search!</Button>
      </Link>
  </>
}

export default LoadedArtists;