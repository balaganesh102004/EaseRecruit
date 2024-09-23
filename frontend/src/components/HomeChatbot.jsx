import React, { useState, useEffect } from "react";
import { ReactAiChatBot } from "react-gemini-ai-chatbot";
import './HomeChatbot.css'; // Import the CSS file for styling

const HomeChatbot = () => {
  const geminiApiKey = "AIzaSyCMNkIrnUzjni4WHaJA30ZE-dtUICB9BiY";
  const trainingData = [
    {
      name: "Recruitment Platform name",
      subcategories: [
        {
          name: "Overview",
          details: [
            "Our recruitment platform is 'Ease-Recruit' developed by team Developers101",
            "Automated recruitment process using LLM technology",
            "Personalized candidate matching and ranking",
            "End-to-end recruitment management",
            "Integrated communication tools for recruiters and candidates",
          ],
        },
        {
          name: "Services",
          details: [
            "Resume parsing and ranking using AI",
            "Application tracking system",
            "Interview scheduling with calendar integration",
            "Real-time status updates for candidates",
            "Analytics and reporting for recruiters",
          ],
        },
      ],
    },
    {
      name: "Pricing",
      subcategories: [
        {
          name: "Subscription Plans",
          details: [
            { plan: "Basic Plan", price: "$100/month" },
            { plan: "Premium Plan", price: "$200/month" },
            { plan: "Enterprise Plan", price: "Contact us for pricing" },
          ],
        },
        {
          name: "Additional Services",
          details: [
            { service: "Personalized Candidate Search", price: "$50/search" },
            { service: "Priority Support", price: "$100/month" },
          ],
        },
      ],
    },
    {
      name: "Support",
      subcategories: [
        {
          name: "Help Center",
          details: "Find FAQs and tutorials for using Ease-Recruit.",
        },
        {
          name: "Contact",
          details: "support@ease-recruit.com",
        },
      ],
    },
    {
      name: "Location",
      subcategories: [
        {
          name: "Address",
          details: "456 Recruiters Avenue, City, Country",
        },
        {
          name: "Map",
          details: "https://maps.app.goo.gl/RecruitMap123",
        },
      ],
    },
  ];
  const chatbotName = "REC-BOT";
  const chatTitle = "Ask any thing about our platform";
  const trainingPrompt = "I will stick to the provided data while communicating with you and will not veer off-topic. If you ask about anything outside the scope of my services or any unrelated questions, I will let you know that I cannot respond to such queries. Feel free to ask me anything related to my services.";

  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 3000); // Show welcome message for 3 seconds

    return () => clearTimeout(welcomeTimeout);
  }, []);

  return (
    <div className="chatbot-wrapper">
      {showWelcomeMessage && <div className="welcome-message">Welcome! Click the circle to chat.</div>}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        {isChatbotVisible ? "✖" : "💬"} {/* Change icon based on visibility */}
      </div>
      {isChatbotVisible && (
        <ReactAiChatBot
          geminiApiKey={geminiApiKey}
          trainingData={trainingData}
          chatbotName={chatbotName}
          chatTitle={chatTitle}
          trainingPrompt={trainingPrompt}
          primaryColor="#dfdf07"
          secondaryColor="#444"
        />
      )}
    </div>
  );
};

export default HomeChatbot;
