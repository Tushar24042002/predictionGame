import React from 'react'
import Classes from "./PrimaryButton.module.css";

const PrimaryButton = ({onClick, style, label, disabled}) => {
  console.log(disabled)
  return (
    <button disabled={disabled} className={` ${Classes.primaryButton}` } style={style} onClick={onClick}>{label}</button>
  )
}

export default PrimaryButton