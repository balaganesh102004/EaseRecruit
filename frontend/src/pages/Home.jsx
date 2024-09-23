import React from "react";
import Hero from "../components/Hero";
import TopNiches from "../components/TopNiches";
import HowItWorks from "../components/HowItWorks";
import HomeChatbot from "../components/HomeChatbot"; // Import the HomeChatbot component

const Home = () => {
  return (
    <>
      <Hero />
      <TopNiches />
      <HowItWorks />
      <HomeChatbot /> {/* Include the chatbot here */}
    </>
  );
};

export default Home;
