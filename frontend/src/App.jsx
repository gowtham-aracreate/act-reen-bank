import React from 'react'
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/login';


const App = () => {
  return (
    <BrowserRouter>
    <Router>
    <Routes>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/register' element={<register/>}/>
    </Routes>
    </Router>
    </BrowserRouter>,
    
    <Login />
    
  )
}
export default App














