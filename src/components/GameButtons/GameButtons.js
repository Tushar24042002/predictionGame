import React, { useState } from "react";
import { insertData } from "./gameActions";

import PrimaryButton from "../ButtonSection/PrimaryButton/PrimaryButton";

const GameButtons = ({setIsModalOpen, setUserSelectedInfo}) => {
  const [buttonsData, setButtonsData] = useState([
    {
      label: "Join Blue",
      id: 0,
      style :{"backgroundColor" : "#2196f3", "borderColor" : "#2196f3"}
    },
    {
      label: "Join Green",
      id: 1,
      style :{"backgroundColor" : "green", "borderColor" : "green"}
    },
    {
      label: "Join Red",
      id: 2,
      style :{"backgroundColor" : "red", "borderColor" : "red"}
    },
  ]);



        // alertify.success("Confirmed");
        

  return (
    <div className="d-flex align-items-center justify-content-between">
      {buttonsData &&
        buttonsData?.map((data, index) => {
          return (
            <div className="btn-group" key={index}>
              <PrimaryButton
              style={data?.style}
                label={data?.label}
                onClick={() => {setUserSelectedInfo(data); setIsModalOpen(true)}}
              />
            </div>
          );
        })}

     
    </div>
  );
};

export default GameButtons;
