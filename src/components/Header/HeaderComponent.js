import React from 'react'
import BackButton from '../BackButton/BackButton';
import Classes from "./HeaderComponent.module.css";

const HeaderComponent = () => {
  return (
   <header className={Classes.headerComponent}>
            <div className={Classes.backBtnDiv}>
            <BackButton styles={{color: "white"}}/>
            </div>
   </header>
  )
}

export default HeaderComponent;