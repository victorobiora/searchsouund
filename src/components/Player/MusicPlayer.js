import MusicDetails from "./MusicDetails";
import classes from './playercss/MusicPlayer.module.css'
import cactus from "../../components/UI/images/cactus.jpg";

const MusicPlayer = (props) => {
  return (
    <div className={classes.musicPlayer}>
      <div className={classes.musicImage}>
        <img alt="high" src={cactus}></img>
      </div>
      <MusicDetails />
    </div>
  );
};

export default MusicPlayer;
