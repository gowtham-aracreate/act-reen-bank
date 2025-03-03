import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Faqs from "./pages/faqs";
import Register from "./pages/register";
import EmailVerification from "./pages/email";
import AccountCreation from "./pages/acccreation";
import OverviewPage from "./pages/OverviewPage";
import AccountPage from "./pages/AccountPage";
import Login from "./pages/Login";
import { TransactionPage } from "./pages/TransactionPage";
import Resetpsw from "./pages/resetpsw";
import Otp from "./pages/otp";
import Changepsw from "./pages/changepsw";
import Pswsuccess from "./pages/pswsuccess";
import Logout from "./pages/logout";
import Profile from "./pages/ProfilePage";
import AccountDetails from "./pages/accountdetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faqs" element={<Faqs />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/create-account" element={<AccountCreation />} />
        <Route path="/overviewpage" element={<OverviewPage />} />
        <Route path="/transaction" element={<TransactionPage />}/>
        <Route path="/accountpage" element={<AccountPage/>}/>
        <Route path="/resetpsw" element={<Resetpsw/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/changepsw" element={<Changepsw/>}/>
        <Route path="/pswsuccess" element={<Pswsuccess/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/accountdetails" element={<AccountDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;