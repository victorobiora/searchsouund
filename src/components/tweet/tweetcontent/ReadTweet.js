import classes from './ReadTweet.module.css'
import { useSelector } from 'react-redux'
import SingleTweet from './SingleTweet'


const ReadTweet = props => {

    const twitter = useSelector(state => state.twitter)
    console.log(twitter.twitterData)
    return <section className={classes['read-tweet']}>
        <ul className={classes.ul}>
       {twitter.twitterData.map(tweet => ( <SingleTweet
        key = {tweet.name}
        name = {tweet.name}
        username = {tweet.username}
        userimage = {tweet.userImage}
        tweet = {tweet.tweet}
        picture = {tweet.picture}

       />))}  
        </ul>

    </section>
}

export default ReadTweet;