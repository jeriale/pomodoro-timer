import React from "react";
import { minutesToDuration } from '../utils/duration';

function TimerSettings({ focusSetting, breakSetting, changeTimerSetting }) {
  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {minutesToDuration(focusSetting)}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              name="focusSetting"
              onClick={changeTimerSetting}
              value={(focusSetting - 5)}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              name="focusSetting"
              onClick={changeTimerSetting}
              value={(focusSetting + 5)}
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
              Break Duration: {minutesToDuration(breakSetting)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                name="breakSetting"
                onClick={changeTimerSetting}
                value={breakSetting - 1}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                name="breakSetting"
                onClick={changeTimerSetting}
                value={breakSetting + 1}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerSettings;