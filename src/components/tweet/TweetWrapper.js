import classes from './TweetWrapper.module.css'


const tweetWrapper = props => {
    return <div className={classes.wrapper}>
    {props.children}
    </div>
}

export default tweetWrapper;