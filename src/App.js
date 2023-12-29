import React, { useState, useEffect } from 'react';
import "./App.css";
import Router from "./Router";

function Loader() {
  return <div>Loading...</div>; // You can replace this with your loader component
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.loading = function() {
      console.log('Window has finished loading.');
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      {isLoading === true && <Loader />}
	  <Router/>
    </>
  );
}

export default App;
