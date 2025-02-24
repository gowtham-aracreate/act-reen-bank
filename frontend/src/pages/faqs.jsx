import React, { useState } from "react";

const Faqs = () => {
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqs = [
    { 
      id: "faq1", 
      question: "What types of accounts does Reen Bank offer?", 
      answer: "Reen Bank offers a variety of accounts to suit your financial needs, including savings accounts, checking accounts, and credit cards. We also offer loans, investment services, and other financial products." 
    },
    { 
      id: "faq2", 
      question: "Is Reen Bank FDIC insured?", 
      answer: "Yes, Reen Bank is FDIC insured, which means that your deposits are insured up to $250,000 per depositor, per insured bank, for each account ownership category." 
    },
    { 
      id: "faq3", 
      question: "How do I sign up for an account with Reen Bank?", 
      answer: "You can sign up for an account with Reen Bank online by visiting our website and filling out the online application form. Once your application is approved, you will receive instructions for setting up your account and accessing our online banking platform." 
    },
    { 
      id: "faq4", 
      question: "How can I access my Reen Bank account online?", 
      answer: "You can access your Reen Bank account online by logging into our secure online banking platform using your username and password. From there, you can view your account balances, transfer funds, pay bills, and more." 
    },
    { 
      id: "faq5", 
      question: "What security measures does Reen Bank have in place to protect my financial information?", 
      answer: "Reen Bank takes the security of your financial information seriously and has a number of measures in place to protect against unauthorized access and fraud. These measures include encryption, two-factor authentication, fraud detection, and regular security updates and monitoring." 
    },
  ];

  return (
    <div className="bg-green-100 pt-14 pb-14 px-10">
      <h2 className="font-bold text-5xl ml-4">FAQs</h2>

      <div className="flex mt-5 gap-10">
        <div className="mt-5  w-530 ">
          {selectedFaq ? (
            <div className="p-5">
              <h3 className="text-green-600 font-semibold underline decoration-green-400 text-4xl">{faqs.find(faqs => faqs.id === selectedFaq)?.question}</h3>
              <p className="mt-10 text-3xl text-gray-700">{faqs.find(faqs => faqs.id === selectedFaq)?.answer}</p>
            </div>
          ) : (
            <p className="text-gray-600 text-3xl">Select a question to see the answer.</p>
          )}
        </div>

        

        <div className="w-500 mt-10 ">
          <ul className="space-y-12  ">
            {faqs
              .filter(faqs => faqs.id !== selectedFaq) 
              .map((faqs) => (
                <li key={faqs.id}>
                  <button
                    className="text-3xl text-blue-600 underline" 
                    onClick={() => setSelectedFaq(faqs.id)}>
                    {faqs.question}&#8594;
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
