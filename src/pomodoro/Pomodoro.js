import React, { useState } from "react";
// Components
import ProgressBar from "./ProgressBar";
import Durations from "./Durations";
import TimerControls from "./TimerControls";
import TimerSettings from "./TimerSettings";
// Utilities
import useInterval from "../utils/useInterval";

function Pomodoro() {

  const audioElement = document.getElementsByClassName("audio-element")[0];

  const initialState = {
    activeSession: false,
    timerRunning: false,
    onBreak: false,
    // Minutes
    focusSetting: 25,
    breakSetting: 5,
    // Seconds
    focusElapsed: 0,
    breakElapsed: 0,
  };

  // Set timer data
  const [timerData, setTimerData] = useState({ ...initialState });

  // Simplified object variables
  const activeSession = timerData.activeSession;
  const timerRunning = timerData.timerRunning;
  const onBreak = timerData.onBreak;
  const focusSetting = timerData.focusSetting;
  const breakSetting = timerData.breakSetting;
  const focusElapsed = timerData.focusElapsed;
  const breakElapsed = timerData.breakElapsed;

  // Change timer settings
  const handleTimerSettingChange = ({ currentTarget }) => {
    const type = currentTarget.name;
    const value = currentTarget.value;

    // Set limits for Focus and Break timers
    const validatedValue = type === "focusSetting" ? Math.min(60, Math.max(parseInt(value), 5)) : Math.min(15, Math.max(parseInt(value), 1));
    
    setTimerData({
      ...timerData,
      [type]: validatedValue,
    });
  }

  // Timer play/pause
  const playPause = () => {
    // Create an active session if it doesn't exist
    if (!activeSession) {
      setTimerData({
        ...timerData,
        activeSession: true,
        timerRunning: !timerRunning
      });
    } else {
      setTimerData({
        ...timerData,
        timerRunning: !timerRunning
      });
    }
  }

  // Restore timer to default state
  const terminateSession = () => {
    setTimerData({
      ...initialState
    });
  }

  // Add to elapsed time according to session type
  useInterval(
    () => {
      // Check for 100% progress & switch session type
      if ((focusSetting * 60) === focusElapsed) {
        audioElement.play();
        setTimerData({
          ...timerData,
          onBreak: true,
          focusElapsed: 0
        });
      } else if ((breakSetting * 60) === breakElapsed) {
        audioElement.play();
        setTimerData({
          ...timerData,
          onBreak: false,
          breakElapsed: 0
        });
      }
      
      // Less than 100% progress
      else {
        if (!onBreak) {
          setTimerData({
            ...timerData,
            focusElapsed: focusElapsed + 1
          });
        } else {
          setTimerData({
            ...timerData,
            breakElapsed: breakElapsed + 1
          });
        }
      }
    },
    timerRunning ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <TimerSettings {...timerData} changeTimerSetting={handleTimerSettingChange} />
      <TimerControls {...timerData} playPause={playPause} terminate={terminateSession} /> 
      <Durations {...timerData} />
      <ProgressBar {...timerData} />
      <audio className="audio-element">
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
      </audio>
    </div>
  );
}

export default Pomodoro;
