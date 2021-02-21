import React, { useState } from "react";
// Components
import ProgressBar from "./ProgressBar";
import Durations from "./Durations";
import TimerControls from "./TimerControls";
import TimerSettings from "./TimerSettings";
// Utilities
import useInterval from "../utils/useInterval";

const audioElement = new Audio(`${process.env.PUBLIC_URL}/alarm/submarine-dive-horn.mp3`);

function Pomodoro() {

  const initialState = {
    activeSession: false,
    timerRunning: false,
    onBreak: false,
    // Minutes
    focusSetting: 25,
    breakSetting: 5,
    // Seconds
    focusElapsed: 298,
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
        playAudio();
        setTimerData({
          ...timerData,
          onBreak: true,
          focusElapsed: 0
        });
      } else if ((breakSetting * 60) === breakElapsed) {
        playAudio();
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

  async function playAudio() {
    try {
      await audioElement.load()
      audioElement.play()
      .catch(console.log)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pomodoro">
      <TimerSettings {...timerData} changeTimerSetting={handleTimerSettingChange} />
      <TimerControls {...timerData} playPause={playPause} terminate={terminateSession} /> 
      <Durations {...timerData} />
      <ProgressBar {...timerData} />
    </div>
  );
}

export default Pomodoro;
