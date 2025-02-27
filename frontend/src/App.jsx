import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Faqs from "./pages/faqs";
import Register from "./pages/register";
import EmailVerification from "./pages/email";
import AccountCreation from "./pages/acccreation";
import OverviewPage from "./pages/OverviewPage";
import TransactionPage from "./pages/TransactionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faqs" element={<Faqs />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/create-account" element={<AccountCreation />} />
        <Route path="/overviewpage" element={<OverviewPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;