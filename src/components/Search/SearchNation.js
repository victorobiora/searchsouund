import classes from './SearchNation.module.css'
import Button from '../UI/Button';
import { useSelector, useDispatch } from 'react-redux'
import { searchActions } from '../../store/reduxStore';
import { updateMusicians } from '../../store/thunks';
import LoadedArtists from './LoadedArtists';

const SearchNation = props => {

    const dispatch = useDispatch()
    const nationsArr = useSelector(state => state.search.nationsList)
    const country = useSelector(state => state.search.selectedCountry)
    const token = useSelector(state => state.token.token)
    const artistsData = useSelector(state => state.search.artists)
    const isDataLoaded = useSelector(state => state.search.isDataLoaded)
    console.log(artistsData)

    const changeCountry = event => {
        dispatch(searchActions.pickCountry(event.target.value));
    }

    const renderArtists = event => {
        dispatch(updateMusicians(country, token));

    }

    return <>
     <div className={classes.searchDiv}>
        <label htmlFor="select-nation"><h1>Choose a country and find out the artists
            ruling the charts over there!</h1></label>
        <select name="" id="select-nation" onChange={changeCountry}>
            {nationsArr.map(nation => (<option value={nation.id} key={nation.id}>{nation.title}</option>))}
        </select>
        <Button onClick={renderArtists}>Go</Button>
    </div>
    {isDataLoaded && <LoadedArtists/>}
    </>
}

export default SearchNation;