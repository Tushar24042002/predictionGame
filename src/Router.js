import React from 'react';
import { BrowserRouter ,  Routes, Route } from 'react-router-dom';
import Home from './Modules/Home/Home';
import Recharge from './Modules/Recharge/Recharge';
import HeaderComponent from './components/Header/HeaderComponent';

const Router = () => {
  return (
   <BrowserRouter>
   {/* <HeaderComponent/> */}
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/recharge' element={<Recharge/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default Router