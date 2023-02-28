import classes from './SearchNation.module.css'
import Button from '../UI/Button';
import {useSelector} from 'react-redux'

const SearchNation = props => {
     
    const nationsArr = useSelector(state => state.search.nationsList)


    return <div className={classes.searchDiv}>
        <label htmlFor="select-nation"><h1>please select a country</h1></label>
        <select name="" id="select-nation">
            {nationsArr.map(nation => ( <option value={nation.id} key={nation.id}>{nation.title}</option>))}
        </select>
        <Button>Go</Button>
        <Button><a href="/tweet">click</a></Button>
    </div>
}

export default SearchNation;