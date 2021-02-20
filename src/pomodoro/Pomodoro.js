import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from '../utils/duration';
import { secondsToDuration } from '../utils/duration';

const audioElement = new Audio(`${process.env.PUBLIC_URL}/alarm/submarine-dive-horn.mp3`);

function Pomodoro() {

  const initialState = {
    activeSession: false,
    onBreak: false,
    // Minutes
    focusSetting: 25,
    breakSetting: 5,
    // Seconds
    focusElapsed: 0,
    breakElapsed: 0,
  };

  // Change timer settings
  const [timerData, setTimerData] = useState({ ...initialState });

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

  // Toggle timer on/off
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const playPause = () => {
    setIsTimerRunning((prevState) => !prevState);
    // Create an active session if it doesn't exist
    if (!timerData.activeSession) {
      toggleActiveSession(true);
    }
  }

  // Toggle active session
  const toggleActiveSession = (value) => {

    setTimerData({
      ...timerData,
      activeSession: value
    });
  }

  // Revert timer to default state
  const terminateSession = () => {
    setIsTimerRunning(false);
    setTimerData({
      ...initialState
    });
  }

  // Add to elapsed time according to session type
  useInterval(
    () => {
      const onBreak = timerData.onBreak;
      const focusSetting = timerData.focusSetting * 60;
      const breakSetting = timerData.breakSetting * 60;
      const focusElapsed = timerData.focusElapsed;
      const breakElapsed = timerData.breakElapsed;

      // Check for 100% progress
      if (focusSetting === focusElapsed) {
        playAudio();
        setTimerData({
          ...timerData,
          onBreak: true,
          focusElapsed: 0
        });
      } else if (breakSetting === breakElapsed) {
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
    isTimerRunning ? 1000 : null
  );

  async function playAudio() {
    try {
      await audioElement.play();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(timerData.focusSetting)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                name="focusSetting"
                onClick={handleTimerSettingChange}
                value={(timerData.focusSetting - 5)}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                name="focusSetting"
                onClick={handleTimerSettingChange}
                value={(timerData.focusSetting + 5)}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(timerData.breakSetting)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  name="breakSetting"
                  onClick={handleTimerSettingChange}
                  value={timerData.breakSetting - 1}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  name="breakSetting"
                  onClick={handleTimerSettingChange}
                  value={timerData.breakSetting + 1}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            {timerData.activeSession ? (
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={terminateSession}
            >
              <span className="oi oi-media-stop" />
            </button>
            ) : ( null )}
          </div>
        </div>
      </div>
      {timerData.activeSession ? (
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            {!timerData.onBreak ? (
            <h2 data-testid="session-title">Focusing for {minutesToDuration(timerData.focusSetting)} minutes</h2>
            ) : (
            <h2 data-testid="session-title">On Break for {minutesToDuration(timerData.breakSetting)} minutes</h2>
            )}
            {/* TODO: Update message below to include time remaining in the current session */}
            {!timerData.onBreak ? (
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration((timerData.focusSetting * 60) - timerData.focusElapsed)} remaining
            </p>
            ) : (
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration((timerData.breakSetting * 60) - timerData.breakElapsed)} remaining
            </p>
            )}
            {!isTimerRunning ? (
            <h3>PAUSED</h3>
            ) : null}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            {!timerData.onBreak ? (
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={(timerData.focusElapsed / (timerData.focusSetting * 60)) * 100} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${(timerData.focusElapsed / (timerData.focusSetting * 60)) * 100}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
            ) : (
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={(timerData.breakElapsed / (timerData.breakSetting * 60)) * 100} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${(timerData.breakElapsed / (timerData.breakSetting * 60)) * 100}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
            )}
          </div>
        </div>
      </div>
      ) : ( null )}
    </div>
  );
}

export default Pomodoro;
