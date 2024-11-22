"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date());
    };

    const now = new Date();
    const delay = 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      updateClock();

      const interval = setInterval(updateClock, 1000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const degrees = (unit, max) => (unit / max) * 360;
  const hours = degrees(time.getHours() % 12, 12) + time.getMinutes() * 0.5;
  const minutes = degrees(time.getMinutes(), 60);
  const seconds = degrees(time.getSeconds(), 60);
  const formatTime = (time) => {
    const padZero = (num) => (num < 10 ? `0${num}` : num);
    const hours = padZero(time.getHours());
    const minutes = padZero(time.getMinutes());
    return `${hours}:${minutes}`;
  };
  return (
    <div className="w-full h-full max-w-sm mx-auto" title={formatTime(time)}>
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-sm mx-auto">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="transparent"
          stroke="#333"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke="#333"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hours} 50 50)`}
        />{" "}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="#333"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${minutes} 50 50)`}
        />{" "}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${seconds} 50 50)`}
        />{" "}
        <circle cx="50" cy="50" r="2" fill="grey" />
      </svg>{" "}
    </div>
  );
};

export default Clock;
