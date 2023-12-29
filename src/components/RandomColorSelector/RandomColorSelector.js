// RandomColorSelector component
import React, { forwardRef, useImperativeHandle, useState } from "react";

const RandomColorSelector = forwardRef(({ userAmount, setUserAmount, calculateResultRef }, ref) => {
  const colors = ["red", "green", "blue"];
  const [selectableAmount, setSelectableAmount] = useState([
    10, 20, 30, 40, 50,
  ]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [userselectedColor, setUserselectedColor] = useState(null);
  const [results, setResults] = useState([]);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useImperativeHandle(calculateResultRef, () => ({
    calculateResultRefFunction() {
      if (userselectedColor !== null) {
        handleSelectColor();
      }
    },
  }));

  const handleSelectColor = () => {
    const randomColor = getRandomColor();
    setSelectedColor(randomColor);
    setResults((prev) => [...prev, randomColor]);
    setUserAmount(
      (prev) =>
        prev +
        (randomColor === userselectedColor ? +selectedAmount : -selectedAmount)
    );
    setSelectedAmount(null);
    setUserselectedColor("");
  };

  const handleInput = (e) => {
    setUserselectedColor(e.target.value);
  };

  const selectAmpuntFunction = (e) => {
    setSelectedAmount(e);
  };

  return (
    <div className="col-lg-12">
      <div className="mb-5">
        {colors.map((data, index) => {
          return (
            <label htmlFor={data} className="me-4" key={index}>
              <input
                type="radio"
                name={"color"}
                value={data}
                id={data}
                onChange={handleInput}
              />
              <span>{data}</span>{" "}
            </label>
          );
        })}
        <div className="bg-light">
          {selectableAmount.map((data, index) => {
            return (
              <div
                className="btn btn-success me-4"
                onClick={() => selectAmpuntFunction(data)}
                key={index}
              >
                {data}
              </div>
            );
          })}
        </div>
        <div className="alert alert-danger">
          User selected Amount - {selectedAmount}
        </div>
        <div className="alert alert-secondary">
          User selected Color - {userselectedColor}
        </div>
      </div>
      <p>System generated Color: {selectedColor}</p>
      <div className="alert alert-primary">Your Wallet : {userAmount}</div>
      <button onClick={handleSelectColor}>Select Color</button>
      <ul style={{ columns: 5 }}>
        {results &&
          results.map((data, index) => {
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
