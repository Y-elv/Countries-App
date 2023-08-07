import React from 'react';
import {Route, Routes } from "react-router-dom";
import Home from './Home';
import SingleCountry from './SingleCountry';

function Routing() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlecountry/:countryname" element={<SingleCountry/>} />
      </Routes> 
    </div>
  )
}

export default Routing