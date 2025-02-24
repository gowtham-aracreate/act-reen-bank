import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Faqs from "./pages/faqs";
//import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Faqs" element={<Faqs />} /> 
        {/* <Route path="/login" element={<Login />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
