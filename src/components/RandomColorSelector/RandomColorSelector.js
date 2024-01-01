// RandomColorSelector.js

import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useGame } from "../../GameContext";

const RandomColorSelector = forwardRef(({ calculateResultRef }, ref) => {
  const { state, dispatch } = useGame();
  const colors = ["red", "green", "blue"];

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [userselectedColor, setUserselectedColor] = useState(null);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    if (userselectedColor !== null) {
      handleSelectColor();
    }
  }, [userselectedColor]);

  const handleSelectColor = () => {
    const randomColor = getRandomColor();
    setSelectedColor(randomColor);

    dispatch({ type: 'UPDATE_RESULTS', payload: randomColor });

    dispatch({
      type: 'UPDATE_USER_AMOUNT',
      payload:
        state.userAmount +
        (randomColor === userselectedColor ? +selectedAmount : -selectedAmount),
    });

    setSelectedAmount(null);
    setUserselectedColor("");
  };

  useImperativeHandle(calculateResultRef, () => ({
    calculateResultRefFunction: handleSelectColor,
  }));

  return (
    <div className="col-lg-12">
      <ul style={{ columns: 5 }}>
        {state.results &&
          state.results.map((data, index) => {
            return (
              <li className="me-4" key={index}>
                {data}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

export default RandomColorSelector;
