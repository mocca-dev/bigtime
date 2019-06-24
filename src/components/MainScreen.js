import React, { useState, useEffect, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import localforage from "localforage";

import TimeDisplay from "./TimeDisplay";
import ProgressBar from "./ProgressBar";
import AudioUpload from "./AudioUpload";
import ToggleBtn from "./ToggleBtn";
import SettingsBtn from "./setting/SettingsBtn";
import SettingsBar from "./setting/SettingsBar";
import { PlaySVG, PauseSVG, StopSVG } from "./Icons";
import Modal from "./Modal";
import withAuthentication from "./withAuthentication";
import ReactNoSleep from "react-no-sleep";

const MainScreen = ({ update, signOut, profilePic }) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [playing, setPlaying] = useState(false);
  const [theme, setTheme] = useState(false);
  const [songName, setSongName] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [bucle, setBucle] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showDelayModal, setShowDelayModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showFileTypeModal, setShowFileTypeModal] = useState(false);
  const [showFileLoading, setShowFileLoading] = useState(false);

  const playerRef = useRef(null);
  const audioInputRef = useRef(null);

  var BASE64_MARKER = ";base64,";

  const convertDataURIToBinary = dataURI => {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  };

  useEffect(() => {
    setShowFileLoading(true);
    localforage.getItem("track_name").then(name => {
      if (name) {
        localforage.getItem("track_data").then(res => {
          var binary = convertDataURIToBinary(res);
          var blob = new Blob([binary], { type: "audio/mp3" });
          var blobUrl = URL.createObjectURL(blob);
          playerRef.current.src = blobUrl;
          setSongName(name);
          setShowFileLoading(false);
          return;
        });
      }
      setShowFileLoading(false);
    });
  }, []);

  useEffect(() => {
    audioInputRef.current.onchange = fileInput => {
      setShowFileLoading(true);
      const files = fileInput.target;
      if (!files.files[0] || files.files[0].type.indexOf("audio/") !== 0) {
        console.warn("not an audio file", files.files[0].type);
        setShowFileTypeModal(true);
        return;
      }
      setSongName(files.files[0].name);

      const reader = new FileReader();
      reader.onload = function() {
        var str = this.result;
        localforage.setItem("track_name", files.files[0].name);
        localforage.setItem("track_data", str).then(value => {
          playerRef.current.src = value;
          setShowFileLoading(false);
          setPlaying(false);
        });
      };
      reader.readAsDataURL(files.files[0]);
    };
  }, []);

  useEffect(() => {
    setProgressWidth(convertCurrentTimeToWidth());
  });

  useEffect(() => {
    setBucle(localStorage.getItem("bucle") === "true");
    setTheme(localStorage.getItem("theme") === "true");
  }, []);

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
      togglePlay();
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

  const signOutOK = () => {
    return new Promise(function(resolve, reject) {
      signOut();
      resolve(true);
    });
  };

  const persistSettings = (name, value) => {
    localStorage.setItem(name, value);
  };

  return (
    <Fragment>
      {showSignOutModal && (
        <Modal
          title="Salir"
          bodyTxt="Está seguro que desea cerrar sesión?"
          hideModal={() => setShowSignOutModal(false)}
          okAction={() => signOutOK()}
          cancelAction={() => new Promise((resolve, reject) => resolve(null))}
        />
      )}
      {showFileTypeModal && (
        <Modal
          title="Tipo de archivo incorrecto"
          bodyTxt="Debes elegir un archivo con formato correcto de audio. Como pueden ser mp3, wav, 3gp, aac, avi, oga."
          hideModal={() => setShowFileTypeModal(false)}
          okAction={() => new Promise((resolve, reject) => resolve(true))}
          cancelAction={null}
        />
      )}
      <ProgressBar
        progressWidth={progressWidth}
        onMouseDown={e => songName && convertOffsetXToCurrentTime(e)}
        duration={playerRef.current ? playerRef.current.duration : 0}
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
      <AudioUpload
        ref={audioInputRef}
        labelTxt={songName}
        showLoading={showFileLoading}
      />
      <div className="bottom">
        {showSettings && (
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
              signOut: () => setShowSignOutModal(true),
              clearSong: () => {
                setSongName("");
                playerRef.current.src = "";
                indexedDB.deleteDatabase("localforage");
              }
            }}
            setShowSettings={setShowSettings}
          />
        )}
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
      </div>
    </Fragment>
  );
};

export default withAuthentication(MainScreen);

MainScreen.propTypes = {
  update: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  profilePic: PropTypes.string.isRequired
};
