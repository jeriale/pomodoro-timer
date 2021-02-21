import React from "react";
import classNames from "../utils/class-names";

function TimerControls({ activeSession, onBreak, timerRunning, playPause, terminate }) {

  return (
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
                "oi-media-play": !timerRunning,
                "oi-media-pause": timerRunning,
              })}
            />
          </button>
          {activeSession ? (
          <button
            type="button"
            className="btn btn-secondary"
            title="Stop the session"
            onClick={terminate}
          >
            <span className="oi oi-media-stop" />
          </button>
          ) : ( null )}
        </div>
      </div>
    </div>  
  );
}

export default TimerControls;