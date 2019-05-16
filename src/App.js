import React, { Component } from "react";
import TimeDisplay from "./components/TimeDisplay";
import ProgressBar from "./components/ProgressBar";
import AudioUpload from "./components/AudioUpload";
import ToggleBtn from "./components/ToggleBtn";
import Toaster from "./components/Toaster";
import ToggleTheme from "./components/ToggleTheme";
import { PlaySVG, PauseSVG, StopSVG } from "./components/Icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: "00",
      seconds: "00",
      playing: false,
      progressWidth: 0,
      lightTheme: true,
      songName: null,
      autoPlay: true,
      showToaster: false,
      bucle: true
    };

    this.playerRef = React.createRef;
    this.audioInputRef = React.createRef;
  }

  componentDidMount() {
    this.props.appServiceWorker.onUpdateFound(() =>
      this.setState({ showToaster: true })
    );

    if (this.playerRef) {
      this.audioInputRef.onchange = fileInput => {
        const files = fileInput.target;
        const file = URL.createObjectURL(files.files[0]);
        this.setSongName(files.files[0].name);
        this.playerRef.src = file;
        this.togglePlay();
      };
    }
  }

  convertOffsetXToCurrentTime(e) {
    this.playerRef.currentTime =
      this.playerRef &&
      (e.nativeEvent.offsetX * this.playerRef.duration) / window.innerWidth;
  }

  convertCurrentTimeToWidth() {
    if (this.state) {
      const player = this.playerRef;
      const duration = player && player.duration;
      const currentTime = player && player.currentTime;
      const calc = (100 * currentTime) / duration;
      return !isNaN(calc) ? Math.floor(calc) : 0;
    }
  }

  calcTime() {
    const player = this.playerRef;
    const totalSeconds = player.currentTime;
    const minutes = "0" + Math.floor(totalSeconds / 60);
    this.setState({ minutes });
    if (totalSeconds < 60) {
      const seconds =
        totalSeconds < 10
          ? "0" + Math.floor(totalSeconds)
          : Math.floor(totalSeconds);
      this.setState({ seconds });
    } else {
      const seconds =
        totalSeconds % 60 < 10
          ? "0" + Math.floor(totalSeconds % 60)
          : "" + Math.floor(totalSeconds % 60);
      this.setState({ seconds });
    }
  }

  isFinished() {
    const player = this.playerRef;
    const { duration, currentTime } = player;
    return duration === currentTime;
  }

  restartWhenFinished() {
    if (this.isFinished()) {
      this.stop(this.playerRef);
      this.playerRef.play();
    }
  }

  stopWhenFinished() {
    if (this.isFinished()) {
      this.stop(this.playerRef);
    }
  }

  setSongName(songName) {
    this.setState({ songName });
  }

  togglePlay() {
    const { playing } = this.state;
    const player = this.playerRef;
    if (playing) {
      player.pause();
    } else {
      player.play();
    }
    this.calcTime();
    this.setState({ playing: !playing });
  }

  stop(player) {
    player.pause();
    player.currentTime = 0;
    this.togglePlay();
  }

  render() {
    let {
      minutes,
      seconds,
      playing,
      showToaster,
      songName,
      bucle
    } = this.state;

    const progressWidth = this.convertCurrentTimeToWidth();
    return (
      <div className="App">
        {showToaster && (
          <Toaster
            content="Nueva actualizacion!"
            close={() => this.setState({ showToaster: false })}
            ok={() => window.location.reload()}
          />
        )}
        <ProgressBar
          progressWidth={progressWidth}
          onMouseDown={e => songName && this.convertOffsetXToCurrentTime(e)}
        />
        <TimeDisplay minutes={minutes} seconds={seconds} />
        <audio
          ref={ref => {
            this.playerRef = ref;
          }}
          onTimeUpdate={() => {
            this.calcTime();
            if (bucle) {
              this.restartWhenFinished();
            } else {
              this.stopWhenFinished();
            }
          }}
        />
        <AudioUpload
          setRef={ref => (this.audioInputRef = ref)}
          labelTxt={songName}
        />
        <div className="bottom-bar">
          <div className="left-btns">
            <ToggleTheme />
            <button
              className="btn btn-stop"
              onClick={() => {
                this.stop(this.playerRef);
              }}
            >
              <StopSVG />
            </button>
          </div>
          <ToggleBtn
            cClass="btn btn-play"
            IconT={PauseSVG}
            IconF={PlaySVG}
            value={playing}
            toggle={() => this.togglePlay()}
            disabled={!songName}
          />
        </div>
      </div>
    );
  }
}

export default App;
