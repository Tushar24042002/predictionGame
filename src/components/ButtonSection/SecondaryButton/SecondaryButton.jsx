import React from 'react'
import Classes from "./SecondaryButton.module.css";

const SecondaryButton = ({onClick, style, label}) => {
  return (
    <div className={` ${Classes.primaryButton}` } style={style} onClick={onClick}>{label}</div>
  )
}

export default SecondaryButton