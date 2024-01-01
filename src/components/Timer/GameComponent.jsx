import React, { useState, useEffect } from "react";

const GameComponent = ({ callFunction }) => {
  const [remainingTime, setRemainingTime] = useState(180);
  const [gameStartTime, setGameStartTime] = useState(
    parseFloat(localStorage.getItem("gameStartTime")) || Date.now() / 1000
  );
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    // Save the initial game start time in localStorage
    localStorage.setItem("gameStartTime", gameStartTime.toString());

    const interval = setInterval(() => {
      updateRemainingTime();
      fetchCurrentGameStatus(); // Check and fetch current game status
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [gameStartTime]);

  const updateRemainingTime = () => {
    console.log("calling");
    const currentTime = Date.now() / 1000;
    const newRemainingTime = 180 - ((currentTime - gameStartTime) % 180);
    setRemainingTime(newRemainingTime);

    // Update the UI or perform other actions based on the remaining time
    if (newRemainingTime <= 30) {
      // Disable button or perform other actions
    } else {
      // Enable button or perform other actions
    }
    if (newRemainingTime < 1) {
      callFunction();
    }
  };

  const fetchCurrentGameStatus = async () => {};

  return (
    <div>
      <div id="demo">
        <span className="timer">0{Math.floor(remainingTime / 60)}</span>
        <span>:</span>
        <span className="timer">
          {("0" + Math.floor(remainingTime % 60)).slice(-2)}
        </span>
      </div>
    </div>
  );
};

export default GameComponent;
