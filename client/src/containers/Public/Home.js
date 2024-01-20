import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start  h-full   ">
      <Header />
      <Navigation />
      <div className="w-1100 flex flex-col items-center justify-start">
        <Outlet></Outlet>
      </div>
      <hr></hr>
      <Footer></Footer>
    </div>
  );
};

export default Home;
