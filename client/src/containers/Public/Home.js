import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { FloatButton } from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import Chatbot from "../../chatbot/chatbot";
import { IoChatbubbleEllipses } from "react-icons/io5";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start  h-full   ">
      <Header />
      <Navigation />
      <div className="w-1100 flex flex-col items-center justify-start mb-5">
        <Outlet></Outlet>
      </div>
      <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24 }}
      icon={<IoChatbubbleEllipses />}
    >
     
     <Chatbot />
    </FloatButton.Group>
      <Footer ></Footer>
    </div>
  );
};

export default Home;
