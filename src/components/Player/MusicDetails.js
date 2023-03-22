import classes from './playercss/MusicDetails.module.css'
import next from '../../components/UI/images/next.png'
import previous from '../../components/UI/images/previous.png'
import pause from '../../components/UI/images/video-pause-button.png'
import play from '../../components/UI/images/play-button-arrowhead.png'

const MusicDetails = (props) => {
  return (
    <section className={classes.sectionM}>
      <div>
        Wizkid
      </div>
      <div>
        Who's gonna know
      </div>
      <div className={classes.player}>
          <div> <img alt='previous' src={previous}></img></div>
          <div> <img alt='play' src={play}></img></div>
          <div> <img alt='next' src={next}></img></div>
      </div>
    </section>
  );
};

export default MusicDetails;
