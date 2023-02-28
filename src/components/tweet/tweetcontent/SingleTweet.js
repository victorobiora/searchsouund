import classes from './SingleTweet.module.css'
import winston from '../../UI/images/cactus.jpg'
const SingleTweet = props => {
    return (
        <li className={classes.tweetList}>
            <div className={classes.image}>
                <div className={classes.imageContainer}>
                 <img src={winston} alt = 'winstonimage'/> 
                </div>
            </div>
            <div className={classes.tweetData}>
                <div className={classes.name}>
                    <div className={classes.tweetName}> {props.name}</div>
                    <div className={classes.tweetUsername}>@{props.username}</div>
                </div>
                <div className={classes.tweet}> {props.tweet}</div>
                <div className={classes.tweetImage}>{props.picture}</div>
            </div>
        </li>
    )
}

export default SingleTweet;