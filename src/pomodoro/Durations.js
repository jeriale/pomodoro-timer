import React from "react";
import { secondsToDuration } from '../utils/duration';
import { minutesToDuration } from '../utils/duration';

function Durations({ activeSession, timerRunning, onBreak, focusSetting, focusElapsed, breakSetting, breakElapsed }) {
  if (!onBreak && activeSession) {
    return (
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">Focusing for {minutesToDuration(focusSetting)} minutes</h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration((focusSetting * 60) - focusElapsed)} remaining
          </p>
          {!timerRunning ? (
          <h3>PAUSED</h3>
          ) : ( null )}
        </div>
      </div>
    );
  } else if (onBreak && activeSession) {
    return (
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">On Break for {minutesToDuration(breakSetting)} minutes</h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration((breakSetting * 60) - breakElapsed)} remaining
          </p>
          {!timerRunning ? (
          <h3>PAUSED</h3>
          ) : ( null )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Durations;