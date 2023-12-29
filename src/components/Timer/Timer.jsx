// Timer component
import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ setCalculateResult, timerActive }) => {
  const [seconds, setSeconds] = useState(8);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timerActive, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setCalculateResult(true);
      setSeconds(8);
    }
  }, [seconds, setCalculateResult]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return <>{formatTime(seconds)}</>;
};

export default Timer;
