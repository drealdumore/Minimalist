"use client";

export default function Checkbox({ id, checked, onChange, className = "" }) {
  return (
    <div className={`checkbox-wrapper ${className}`}>
      <input
        id={id}
        name="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label htmlFor={id} className="terms-label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
          className="checkbox-svg"
        >
          <mask fill="white" id={`path-${id}`}>
            <rect height="200" width="200"></rect>
          </mask>
          <rect
            mask={`url(#path-${id})`}
            strokeWidth="40"
            className="checkbox-box"
            height="200"
            width="200"
          ></rect>
          <path
            strokeWidth="15"
            d="M52 111.018L76.9867 136L149 64"
            className="checkbox-tick"
          ></path>
        </svg>
      </label>
    </div>
  );
}
