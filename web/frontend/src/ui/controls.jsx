import React from "react";

const PATHS = {
  analysis: "M3 17h14M5 14V9m5 5V4m5 10v-7",
  table: "M2 13l8-4 8 4-8 4zM2 13v-2l8-4 8 4v2",
  top: "M4 4h12v12H4zM4 10h12M10 4v12",
  numbers: "M7 4L5 16M13 4l-2 12M3.5 8h12M3 12h12",
  soundOn: "M3 8v4h3l4 3V5L6 8zM13 7.5a3.5 3.5 0 010 5M15 5a7 7 0 010 10",
  soundOff: "M3 8v4h3l4 3V5L6 8zM13 8l4 4M17 8l-4 4",
  undo: "M7 5L3 9l4 4M3 9h8a5 5 0 010 10H9",
  hint: "M10 3a5 5 0 00-3 9v2h6v-2a5 5 0 00-3-9zM8 17h4",
  pause: "M7 4v12M13 4v12",
  play: "M6 4l10 6-10 6z",
  restart: "M4 10a6 6 0 106-6H6M6 4L3.5 6.5M6 4l2.5 2.5",
  prev: "M12 4l-6 6 6 6",
  next: "M8 4l6 6-6 6",
  close: "M5 5l10 10M15 5L5 15",
  first: "M13 4l-6 6 6 6M5 4v12",
  last: "M7 4l6 6-6 6M15 4v12",
};

export function Icon({ name }) {
  return (
    <svg className="icon" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

/** A button with an icon and a visible label on wide screens, an accessible name always. */
export function Tool({ icon, label, onClick, pressed, disabled, quiet }) {
  return (
    <button type="button" className={`tool${quiet ? " quiet" : ""}`} onClick={onClick} disabled={disabled}
            aria-pressed={pressed === undefined ? undefined : pressed} aria-label={label} title={label}>
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
}

export function Segmented({ label, value, options, onChange }) {
  const id = `seg-${label.replace(/\W+/g, "-")}`;
  return (
    <div className="field">
      <span className="field-label" id={id}>{label}</span>
      <div className="segmented" role="radiogroup" aria-labelledby={id}>
        {options.map(([v, text]) => (
          <button key={v} type="button" role="radio" aria-checked={value === v}
                  className={value === v ? "on" : ""} onClick={() => onChange(v)}>{text}</button>
        ))}
      </div>
    </div>
  );
}

/** Search depth as a row of studs, like the points on the board. */
export function DepthPicker({ value, max, onChange, id = "depth" }) {
  return (
    <div className="depth-picker" role="radiogroup" aria-labelledby={`${id}-label`}>
      {Array.from({ length: max }, (_, k) => k + 1).map((d) => (
        <button key={d} type="button" role="radio" aria-checked={value === d} aria-label={`${d} ${d === 1 ? "ply" : "plies"}`}
                className={d <= value ? "on" : ""} onClick={() => onChange(d)}>{d}</button>
      ))}
    </div>
  );
}

export function Pips({ filled, total = 5, label }) {
  return (
    <span className="pips" role="img" aria-label={label}>
      {Array.from({ length: total }, (_, k) => <i key={k} className={k < filled ? "full" : ""} />)}
    </span>
  );
}
