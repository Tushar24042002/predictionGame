import React from 'react'
import Classes from "./PrimaryButton.module.css";

const PrimaryButton = ({onClick, style, label}) => {
  return (
    <div className={` ${Classes.primaryButton}` } style={style}>{label}</div>
  )
}

export default PrimaryButton