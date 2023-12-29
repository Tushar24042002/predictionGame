import React, { useState } from "react";
import { insertData } from "./gameActions";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import PrimaryButton from "../ButtonSection/PrimaryButton/PrimaryButton";

const GameButtons = () => {
  const [buttonsData, setButtonsData] = useState([
    {
      label: "Join Blue",
      id: 0,
    },
    {
      label: "Join Green",
      id: 1,
      style :{"backgroundColor" : "green", "border-color" : "green"}
    },
    {
      label: "Join Red",
      id: 2,
      style :{"backgroundColor" : "red", "border-color" : "red"}
    },
  ]);

  const handleGameColor = async (colorCode) => {
    try {
      await insertData(colorCode);
    } catch (error) {
      console.log(error)
    }
  };

  const showAlert = () => {
    // Show a simple alert
    alertify.alert("This is an alert!");
  };

  const showConfirm = () => {
    // Show a confirmation dialog
    alertify.confirm(
      "Do you confirm this action?",
      () => {
        alertify.success("Confirmed");
      },
      () => {
        alertify.error("Cancelled");
      }
    );
  };

  const showPrompt = () => {
    // Show a prompt dialog
    alertify.prompt(
      "Enter something:",
      "Default Value",
      (evt, value) => {
        alertify.success(`You entered: ${value}`);
      },
      () => {
        alertify.error("Cancelled");
      }
    );
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      {buttonsData &&
        buttonsData?.map((data, index) => {
          return (
            <div className="btn-group" key={index}>
              <PrimaryButton
              style={data?.style}
                label={data?.label}
                onClick={() => handleGameColor(data?.id)}
              />
            </div>
          );
        })}

     
    </div>
  );
};

export default GameButtons;
