import classes from './SearchNation.module.css'
import Button from '../UI/Button';
import {useSelector, useDispatch} from 'react-redux'
import { searchActions } from '../../store/reduxStore';

const SearchNation = props => {

     const dispatch = useDispatch()
    const nationsArr = useSelector(state => state.search.nationsList)
    const country = useSelector(state => state.search.selectedCountry)

    const changeCountry = event => {
  
        dispatch(searchActions.pickCountry(event.target.value))
        
    }

    console.log(country)


    return <div className={classes.searchDiv}>
        <label htmlFor="select-nation"><h1>please select a country</h1></label>
        <select name="" id="select-nation" onChange={changeCountry}>
            {nationsArr.map(nation => ( <option value={nation.id} key={nation.id}>{nation.title}</option>))}
        </select>
        <Button>Go</Button>
        <Button><a href="/tweet">click</a></Button>
    </div>
}

export default SearchNation;