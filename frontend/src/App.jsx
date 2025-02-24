import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;