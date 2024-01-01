import React from 'react'
import BackButton from '../BackButton/BackButton';
import Classes from "./HeaderComponent.module.css";

const HeaderComponent = ({label}) => {
  return (
   <header className={Classes.headerComponent}>
            <div className={Classes.backBtnDiv}>
            <BackButton styles={{color: "white"}}/>
            <h5>{label}</h5>
            </div>
   </header>
  )
}

export default HeaderComponent;