import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import HomeChatbot from "./HomeChatbot";



const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <img src="/logo-dark.png" alt="logo" />
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(!show)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/jobs"} onClick={() => setShow(!show)}>
                JOBS
              </Link>
            </li>
            {
              isAuthenticated ?(<li>
              <Link to={"/resume-reviewer"} onClick={() => setShow(!show)}>
                AI RESUME REVIEWER
              </Link>
            </li>):(<li>
                <Link to={"/login"} onClick={() => setShow(!show)}>
                  AI RESUME REVIEWER
                </Link>
              </li>)
            }
            
            {isAuthenticated ? (
              <li>
                <Link to={"/dashboard"} onClick={() => setShow(!show)}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(!show)}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
      {
        !isAuthenticated && (
          <div className="chatbot-container">
            <HomeChatbot />
          </div>
        )
      }
      
    </>
  );
};

export default Navbar;
