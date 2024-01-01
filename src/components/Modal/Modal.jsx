import React from "react";
import ReactDOM from "react-dom";
// import closeOutlineImage from "../../assets/cross-x-icon.svg";
import classes from "./Modal.module.css";

const container = document.querySelector("#root");
function Modal(props) {
  return ReactDOM.createPortal(
    <>
      <div className={classes.backdrop}> </div>
      <div style={props.style} className={classes.modal}>
        <div className={classes.header}>
          <div className={classes.title}>
            <h2>{props.title}</h2>
          </div>
          {props.onClose && (
            <div style={props.closeBtn} className={classes.closeBtn}>
              <img
                // src={closeOutlineImage}
                onClick={props.onClose}
                alt="Close Button"
              />
            </div>
          )}
        </div>
        {props.children}
      </div>
    </>,
    container
  );
}

export default Modal;
