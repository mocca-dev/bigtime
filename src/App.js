import React, { useState, useEffect, useRef } from "react";
import TimeDisplay from "./components/TimeDisplay";
import ProgressBar from "./components/ProgressBar";
import AudioUpload from "./components/AudioUpload";
import ToggleBtn from "./components/ToggleBtn";
import Toaster from "./components/Toaster";
import SettingsBtn from "./components/SettingsBtn";
import SettingsBar from "./components/SettingsBar";
import { PlaySVG, PauseSVG, StopSVG } from "./components/Icons";

const App = ({ appServiceWorker }) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [playing, setPlaying] = useState(false);
  const [theme, setTheme] = useState(false);
  const [songName, setSongName] = useState(null);
  const [showToaster, setShowToaster] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bucle, setBucle] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);

  const playerRef = useRef(null);
  const audioInputRef = useRef(null);

  useEffect(() => {
    if (!document.documentElement.getAttribute("data-theme"))
      document.documentElement.setAttribute("data-theme", "dark");
  });

  useEffect(() => {
    appServiceWorker.onUpdateFound(() => setShowToaster(true));
  });

  useEffect(() => {
    if (playerRef.current && audioInputRef.current) {
      audioInputRef.current.onchange = fileInput => {
        const files = fileInput.target;
        const file = URL.createObjectURL(files.files[0]);
        setSongName(files.files[0].name);
        playerRef.current.src = file;
        togglePlay();
      };
    }
  });

  useEffect(() => {
    setProgressWidth(convertCurrentTimeToWidth());
  });

  const convertOffsetXToCurrentTime = e => {
    playerRef.current.currentTime =
      playerRef &&
      (e.nativeEvent.offsetX * playerRef.current.duration) / window.innerWidth;
  };

  const convertCurrentTimeToWidth = () => {
    const player = playerRef.current;
    const duration = player && player.duration;
    const currentTime = player && player.currentTime;
    const calc = (100 * currentTime) / duration;
    return !isNaN(calc) ? Math.floor(calc) : 0;
  };

  const calcTime = () => {
    const player = playerRef.current;
    const totalSeconds = player.currentTime;
    const minutes = "0" + Math.floor(totalSeconds / 60);
    setMinutes(minutes);
    let seconds;

    if (totalSeconds < 60) {
      seconds =
        totalSeconds < 10
          ? "0" + Math.floor(totalSeconds)
          : Math.floor(totalSeconds);
    } else {
      seconds =
        totalSeconds % 60 < 10
          ? "0" + Math.floor(totalSeconds % 60)
          : "" + Math.floor(totalSeconds % 60);
    }
    setSeconds(seconds.toString());
  };

  const stop = player => {
    if (player) {
      player.pause();
      player.currentTime = 0;
      togglePlay();
    }
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (playing) {
      player.pause();
    } else {
      player.play();
    }
    calcTime();
    setPlaying(!playing);
  };

  const isFinished = () => {
    const { duration, currentTime } = playerRef.current;
    return duration === currentTime;
  };

  const restartWhenFinished = () => {
    if (isFinished()) {
      stop(playerRef.current);
      playerRef.current.play();
      setPlaying(true);
    }
  };

  const stopWhenFinished = () => {
    if (isFinished()) {
      stop(playerRef.current);
    }
  };

  return (
    <div className="App">
      {showToaster && (
        <Toaster
          content="Nueva actualizacion!"
          close={() => setShowToaster(false)}
          ok={() => window.location.reload()}
        />
      )}
      <ProgressBar
        progressWidth={progressWidth}
        onMouseDown={e => songName && convertOffsetXToCurrentTime(e)}
      />
      <TimeDisplay minutes={minutes} seconds={seconds} />
      <audio
        ref={playerRef}
        onTimeUpdate={() => {
          calcTime();
          if (bucle) {
            restartWhenFinished();
          } else {
            stopWhenFinished();
          }
        }}
      />
      <AudioUpload ref={audioInputRef} labelTxt={songName} />
      <div className="bottom">
        {showSettings && (
          <SettingsBar
            data={{ bucle: bucle, theme: theme }}
            actions={{
              toggleBucle: () => setBucle(!bucle),
              setTheme: () => setTheme(!theme)
            }}
          />
        )}
        <div className="bottom-bar">
          <div className="left-btns">
            <SettingsBtn onClick={() => setShowSettings(!showSettings)} />
            <button
              className="btn btn-stop"
              onClick={() => {
                stop(playerRef.current);
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
            toggle={() => togglePlay()}
            disabled={!songName}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
