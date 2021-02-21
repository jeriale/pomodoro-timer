import React from "react";

function ProgressBar({ activeSession, onBreak, focusSetting, focusElapsed, breakSetting, breakElapsed }) {

  if (!onBreak && activeSession) {
    return (
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={(focusElapsed / (focusSetting * 60)) * 100} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${(focusElapsed / (focusSetting * 60)) * 100}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    );
  } else if (onBreak && activeSession) {
    return (
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={(breakElapsed / (breakSetting * 60)) * 100} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${(breakElapsed / (breakSetting * 60)) * 100}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ProgressBar;