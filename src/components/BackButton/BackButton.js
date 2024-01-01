import React, { useEffect, useState } from 'react';
import Classes from "./BackButton.module.css";
import { useNavigate } from 'react-router-dom'; // Correct import
import { IoArrowBack } from "react-icons/io5";


const BackButton = ({styles}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); 
  };
  return (
    
      <div className={Classes.backButtonCss} onClick={()=>handleGoBack()} style={styles}><IoArrowBack/></div>
  );
}

export default BackButton;
