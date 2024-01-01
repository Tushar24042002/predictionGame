import React, { useState, useEffect } from 'react';
import "./App.css";
import Router from "./Router";
import Loader from './components/Loader/Loader';



function App() {

  return (
    <>
      <Loader target={window} />
      <Router />
    </>
  );
}

export default App;
