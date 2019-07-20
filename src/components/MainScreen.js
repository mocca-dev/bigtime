import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  Suspense,
  lazy
} from "react";
import PropTypes from "prop-types";
import localforage from "localforage";

import TimeDisplay from "./TimeDisplay";
import ProgressBar from "./ProgressBar";
import AudioUpload from "./AudioUpload";
import ToggleBtn from "./ToggleBtn";
import SettingsBtn from "./setting/SettingsBtn";
import { PlaySVG, PauseSVG, StopSVG } from "./Icons";
import Modal from "./Modal";
import ReactNoSleep from "react-no-sleep";
import LoadingScreen from "./LoadingScreen";
const SettingsBar = lazy(() => import("./setting/SettingsBar"));

const MainScreen = ({ update }) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [playing, setPlaying] = useState(false);
  const [theme, setTheme] = useState(false);
  const [songName, setSongName] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [bucle, setBucle] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [showFileTypeModal, setShowFileTypeModal] = useState(false);
  const [showFileLoading, setShowFileLoading] = useState(false);

  const playerRef = useRef(null);
  const audioInputRef = useRef(null);

  var BASE64_MARKER = ";base64,";

  useEffect(() => {
    setShowFileLoading(true);
    localforage.getItem("track_name").then(name => {
      if (name) {
        localforage.getItem("track_data").then(res => {
          var binary = convertDataURIToBinary(res);
          var blob = new Blob([binary], { type: "audio/mp3" });
          var blobUrl = URL.createObjectURL(blob);
          if (playerRef.current) {
            playerRef.current.src = blobUrl;
            setSongName(name);
          }
          setShowFileLoading(false);
          return;
        });
      } else {
        setShowFileLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    audioInputRef.current.onchange = fileInput => {
      const files = fileInput.target;
      if (files.files.length) {
        setShowFileLoading(true);
        setSongName(files.files[0].name);

        const reader = new FileReader();
        playerRef.current.src = URL.createObjectURL(files.files[0]);
        reader.onload = function() {
          const str = this.result;
          localforage.setItem("track_name", files.files[0].name);
          localforage.setItem("track_data", str).then(() => {
            setShowFileLoading(false);
            setPlaying(false);
          });
        };
        reader.readAsDataURL(files.files[0]);
      }
    };
  }, []);

  useEffect(() => {
    setProgressWidth(convertCurrentTimeToWidth());
  });

  useEffect(() => {
    setBucle(localStorage.getItem("bucle") === "true");
    setTheme(localStorage.getItem("theme") === "true");
  }, []);

  const convertDataURIToBinary = dataURI => {
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  };

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
    if (songName && player) {
      player.pause();
      player.currentTime = 0;
      setPlaying(false);
    }
  };

  const togglePlay = (enable, disable) => {
    const player = playerRef.current;
    if (playing) {
      if (disable) disable();
      player.pause();
    } else {
      if (enable) enable();
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

  const persistSettings = (name, value) => {
    localStorage.setItem(name, value);
  };

  return (
    <Fragment>
      {showFileTypeModal && (
        <Modal
          title="Tipo de archivo incorrecto"
          bodyTxt="Debes elegir un archivo con formato correcto de audio. Como pueden ser mp3, wav, 3gp, aac, avi, oga."
          hideModal={() => setShowFileTypeModal(false)}
          okAction={() => new Promise((resolve, reject) => resolve(true))}
          cancelAction={null}
        />
      )}
      <TimeDisplay
        minutes={minutes}
        seconds={seconds}
        empty={!songName}
        duration={playerRef.current ? playerRef.current.duration : 0}
      />
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
      <AudioUpload
        ref={audioInputRef}
        labelTxt={songName}
        showLoading={showFileLoading}
      />
      <div className="bottom">
        {showSettings && (
          <Suspense fallback={<LoadingScreen />}>
            <SettingsBar
              data={{
                bucle: bucle,
                theme: theme,
                update: update,
                profilePic: null
              }}
              actions={{
                toggleBucle: () => {
                  setBucle(!bucle);
                  persistSettings("bucle", !bucle);
                },
                setTheme: () => {
                  setTheme(!theme);
                  persistSettings("theme", !theme);
                  document.documentElement.setAttribute(
                    "data-theme",
                    !theme ? "light" : "dark"
                  );
                },
                showDelayModal: () => setShowDelayModal(!showDelayModal),
                clearSong: () => {
                  setSongName("");
                  playerRef.current.src = "";
                  indexedDB.deleteDatabase("localforage");
                }
              }}
              setShowSettings={setShowSettings}
            />
          </Suspense>
        )}
        <ProgressBar
          progressWidth={progressWidth}
          onMouseDown={e => songName && convertOffsetXToCurrentTime(e)}
        />
        <div className="bottom-bar">
          <div className="left-btns">
            <SettingsBtn
              onClick={() => setShowSettings(!showSettings)}
              update={update}
            />
            <button
              className="btn btn-stop"
              onClick={() => {
                stop(playerRef.current);
              }}
            >
              <StopSVG />
            </button>
          </div>
          <ReactNoSleep>
            {({ isOn, enable, disable }) => (
              <ToggleBtn
                cClass="btn btn-play"
                IconT={PauseSVG}
                IconF={PlaySVG}
                value={playing}
                toggle={() => togglePlay(enable, disable)}
                disabled={!songName}
              />
            )}
          </ReactNoSleep>
        </div>
        <div className="bottom-bg" />
      </div>
    </Fragment>
  );
};

export default MainScreen;

MainScreen.propTypes = {
  update: PropTypes.bool.isRequired,
  profilePic: PropTypes.string.isRequired
};
