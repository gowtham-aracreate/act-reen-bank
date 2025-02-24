import React from "react";
import Header from "./Header"; 
import Dashboard from "./Dashboard"; 

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Static Sidebar */}
      <Dashboard />

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        {/* Static Header */}
        <Header />

        {/* Dynamic Page Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
