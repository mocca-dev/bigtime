import React, { Component } from "react";
import TimeDisplay from "./components/TimeDisplay";
import ProgressBar from "./components/ProgressBar";
import AudioUpload from "./components/AudioUpload";
import ToggleBtn from "./components/ToggleBtn";
import Toaster from "./components/Toaster";
import {
  PlaySVG,
  PauseSVG,
  StopSVG,
  MoonSVG,
  SunSVG
} from "./components/Icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      minutes: "00",
      seconds: "00",
      playing: false,
      mouseX: 0,
      progressWidth: 0,
      lightTheme: true,
      songName: null,
      autoPlay: true,
      showToaster: false
    };
    // eslint-disable-next-line
    let playerRef, audioInputRef;
  }

  componentDidMount() {
    this.props.appServiceWorker.onUpdateFound(() =>
      this.setState({ showToaster: true })
    );

    this.setState({ player: this.playerRef });
    if (this.playerRef) {
      this.audioInputRef.onchange = fileInput => {
        const files = fileInput.target;
        const file = URL.createObjectURL(files.files[0]);
        this.setSongName(files.files[0].name);
        this.playerRef.src = file;
        this.togglePlay();
      };
    }
    this.toggleTheme();
  }

  toggleTheme() {
    const lightTheme = this.state.lightTheme ? "dark" : "light";
    this.setState({ lightTheme: !this.state.lightTheme });
    document.documentElement.setAttribute("data-theme", lightTheme);
  }

  convertOffsetXToCurrentTime(e) {
    this.playerRef.currentTime =
      this.playerRef &&
      (e.nativeEvent.offsetX * this.playerRef.duration) / window.innerWidth;
  }

  convertCurrentTimeToWidth() {
    if (this.state) {
      const { player } = this.state;
      const duration = player && player.duration;
      const currentTime = player && player.currentTime;
      const calc = (100 * currentTime) / duration;
      return !isNaN(calc) ? Math.floor(calc) : 0;
    }
  }

  calcTime() {
    let { player } = this.state;
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

  setSongName(songName) {
    this.setState({ songName });
  }

  togglePlay() {
    const { player, playing } = this.state;
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
    this.setState({ playing: false });
  }

  render() {
    let {
      player,
      minutes,
      seconds,
      playing,
      lightTheme,
      showToaster,
      songName
    } = this.state;

    const progressWidth = this.convertCurrentTimeToWidth();
    return (
      <div className="App">
        {showToaster && (
          <Toaster
            content="Nueva actualizacion!"
            close={() => this.setState({ showToaster: false })}
            refresh={() => window.location.reload()}
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
          onTimeUpdate={() => this.calcTime()}
        />
        <AudioUpload
          setRef={ref => {
            this.audioInputRef = ref;
          }}
          labelTxt={songName}
        />
        <div className="bottom-bar">
          <div className="left-btns">
            <ToggleBtn
              cClass="btn btn-theme"
              IconT={MoonSVG}
              IconF={SunSVG}
              value={lightTheme}
              toggle={() => this.toggleTheme()}
            />
            <button
              className="btn btn-stop"
              onClick={() => {
                this.stop(player);
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
