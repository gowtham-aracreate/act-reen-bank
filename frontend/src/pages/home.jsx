import React from "react";
//import { useNavigate } from "react-router-dom";
import ReenBank from "../assets/ReenBank.svg";
import Savings from "../assets/Savings .svg";
import Loans from "../assets/Loans.svg";
import Money from "../assets/money 1.svg";
import Creditcard from "../assets/credit-card 1.svg";
import Bill from "../assets/bill 1.svg";
import Deal from "../assets/Deal 1.svg";
import Mastercard from "../assets/Mastercard.svg";
import logo from "../assets/logo.svg";
import visa from "../assets/visa.svg";
import PayPal from "../assets/PayPal.svg";
import Payoneer from "../assets/Payoneer.svg";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";
import Rectangle from "../assets/Rectangle.svg";
import Faqs from "./faqs";

export default function Home() {
  // const navigate = useNavigate();

  // const handleLoginClick =()=> {
  //    navigate("/Login");
  // }
  return (
    <div className="w-full">
      <div className="bg-green-100 px-15 ">
        <div className="flex flex-wrap text-3xl pt-10">
          <img src={logo} alt="reen bank" />
          <nav className="ml-13 mt-3 flex space-x-10">
            <a href="#About" className="cursor-pointer">About</a>
            <h4 className="cursor-pointer">Contact Us</h4>
          </nav>
          <button className=" w-30 ml-auto border px-6 py-2 rounded-lg text-green-600 font-semibold cursor-pointer">Login</button>
        </div>

        <div className="flex mt-17">
          <div>
            <h3 className="mb-3 text-green-600 font-semibold text-3xl">Reen Bank</h3>
            <h1 className="text-6xl font-bold leading-tight">
              Experience <br />
              hassle-free banking
            </h1>
            <p className="max-w-xl mt-5 text-gray-700 text-3xl">
              Experience simple, secure, and stress-free banking. Say goodbye to
              long queues and complex procedures and hello to hassle-free
              banking with Reen Bank.
            </p>
            <div className="mt-10 space-x-4 text-3xl">
              <button className="bg-green-500 text-white px-6 rounded-lg h-13 cursor-pointer" >Get Started
              </button>
              <button className="border px-6 rounded-lg text-green-600 font-semibold h-13">Learn More &#8594;</button>
            </div>
          </div>
          <div className="ml-12 ">
            <img src={ReenBank} alt="Banking" className="w-160  " />
          </div>
        </div>
      </div>


      <div className="text-3xl  pt-10 pb-15">
        <h2 className="text-5xl text-black font-bold mb-13 px-15">Services</h2>
        <div className=" grid grid-cols-2 gap-12 px-13 ">
          <div>
            <div className="flex">
              <img src={Savings} alt="small" className="w-20 pr-6 " />
              <h3 className="text-green-600 mb-3 text-4xl font-semibold">
                Savings Accounts
              </h3>
            </div>
            <p className="text-gray-700 px-20 max-w-3xl">
              Reen Bank could offer a variety of savings accounts with different interest rates and terms, allowing customers to save money and earn interest over time.
              These accounts could include features like automatic transfers, overdraft protection, and mobile banking access.
            </p>
          </div>
          <div>
            <div className="flex">
              <img src={Loans} alt="loans" className="w-20 pr-6" />
              <h3 className="text-green-600 mb-3 text-4xl font-semibold">
                Personal Loans
              </h3>
            </div>
            <p className="text-gray-700 px-20 max-w-3xl">
              Reen Bank could offer personal loans for a variety of purposes, such as debt consolidation, home improvements, or major purchases.
              Customers could apply online and receive a decision quickly, with flexible repayment terms and competitive interest rates.
            </p>
          </div>
          <div>
            <div className="flex">
              <img src={Creditcard} alt="card" className="w-20 pr-6" />
              <h3 className="text-green-600 mb-3 text-4xl font-semibold">
                Credit Cards
              </h3>
            </div>
            <p className="text-gray-700 px-20 max-w-3xl">
              Reen Bank could offer credit cards with different rewards programs and benefits, such as cash back, travel rewards, or low interest rates.
              Customers could manage their cards online and receive alerts for suspicious activity or due dates.
            </p>
          </div>
          <div>
            <div className="flex">
              <img src={Money} alt="icon" className="w-20 pr-6" />
              <h3 className="text-green-600 mb-3 text-4xl font-semibold">
                Investment Services
              </h3>
            </div>
            <p className="text-gray-700 px-20 max-w-3xl">
              Reen Bank could offer investment services for customers looking to grow their wealth over time.
              These services could include mutual funds, exchange-traded funds, and other investment vehicles, with access to professional financial advice and analysis.
            </p>
          </div>
          <div>
            <div className="flex">
              <img src={Bill} alt="icon" className="w-20 pr-6" />
              <h3 className="text-green-600 mb-3 text-4xl font-semibold">
                Online Bill Pay
              </h3>
            </div>
            <p className="text-gray-700 px-20 max-w-3xl">
              Reen Bank could offer a convenient online bill pay service, allowing customers to pay bills and manage expenses from their computer or mobile device.
              This service could include features like automatic payments, bill reminders, and customizable payment schedules
            </p>
          </div>
          <div>
            <div className="flex">
              <img src={Deal} alt="icon" className="w-20 pr-6" />
              <h3 className="text-green-600 mb-3 text-4xl font-semibold mr-25">
                Business Banking
              </h3>
            </div>
            <p className="text-gray-700 px-20 max-w-3xl ">
              Reen Bank could offer a range of banking services for small and medium-sized businesses, including checking accounts, business loans, merchant services, and cash management tools.
              These services could help businesses streamline their financial operations and grow their operations over time.
            </p>
          </div>
        </div>
      </div>
      <Faqs />

      <div className="my-10">
        <div className="text-center text-3xl font-bold pt-10 pb-5">
          <p>Supported by various finance services</p>
        </div>
        <div className="md:flex pt-10 pl-20">
          <img src={Mastercard} alt="Mastercard" className="w-30  mr-35" />
          <img src={visa} alt="logo" className="w-40 mr-40" />
          <img src={PayPal} alt="logo" className="w-50 mr-40" />
          <img src={Payoneer} alt="logo" className="w-70" />
        </div>
      </div>

      <div className="bg-green-100 md:flex ">
        <div className=" pt-20 pb-10 px-15 text-gray-700">
          <div className="flex text-3xl">
            <div className="space-y-3 w-80">
              <h3 className="text-green-600 font-semibold mb-5">HELP</h3>
              <p>Help Center</p>
              <p>Contact Us</p>
              <p>How to Use</p>
            </div>
            <div id="About" className="space-y-3 w-80">
              <h3 className="text-green-600 font-semibold mb-5">ABOUT</h3>
              <p>About Reen Bank</p>
              <p>Teams & Conditions</p>
              <p>Privacy Policy</p>
            </div>
          </div>
          <img src={logo} alt="reen bank" className="mt-35 mb-5" />
          <p className="text-2xl mt-23 w-93">2023 ReenBank. All rights reserved!</p>
          <div className="flex mt-5 ">
            <img src={facebook} alt="logo" className="ml-5" />
            <img src={instagram} alt="logo" className="ml-5" />
            <img src={twitter} alt="logo" className="ml-5" />
          </div>
        </div>
        <div className="relative w-full text-white font-semibold">
          <img src={Rectangle} alt="footer" className="mt-43 w-3xl " />
          <div className="absolute inset-0  items-center justify-center flex flex-col mt-35 mr-30">
            <p className="text-3xl mr-44  mt-50">New to Reem Bank?</p>
            <h2 className="text-5xl leading-tight mt-5 ">Enter your Email<br /> and Get Started Now</h2>
            <div className="md:flex ml-5 ">
              <input type="email" placeholder="enter the email" className="md:border-2 border-red-500 rounded-lg text-white w-sm opacity-80 ml-37 mt-8 text-2xl " />
              <button className="bg-green-500 text-white px-6 rounded-lg text-2xl w-50 h-13 mt-8 ml-5 cursor-pointer" >Get Started &#8594;</button>
            </div>
          </div>
        </div>


      </div>
    </div>

  );
}