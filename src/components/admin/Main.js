import React, { useRef, useState } from "react";
import "./main.css";
import "./Navbar.css";
import logo from "../../assets/kibu__logo.png";

import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as BIIcons from "react-icons/bi";
import * as IaIcons from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";

const Main = ({ children }) => {
  const sideref = useRef();
  const mainref = useRef();
  const mainref2 = useRef();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const ToggleSwitch = (e) => {
    sideref.current.classList.toggle("active");
    mainref2.current.classList.toggle("main-active");
  };

  return (
    <>
      <div className="main">
        <div className="main-container">
          <div className="nav__container">
            <IaIcons.AiOutlineMenu
              className="menu-icon"
              onClick={ToggleSwitch}
            />
            <li
              className=""
              style={{
                height: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={logo}
                alt="logo"
                className="card-img-top"
                style={{
                  height: "100%",
                }}
              />
            </li>
            <li>
              <FaIcons.FaUser className="user" />
              <span>Godfrey</span>
              <ul
                className="dropdown"
                style={{
                  zIndex: 1000,
                }}
              >
                <li
                  style={{
                    color: "black",
                  }}
                >
                  {"Godfrey"}
                </li>

                <Link className="item" to="/settings">
                  <li>Settings</li>
                </Link>
                <Link className="item" to="/logout">
                  <li>Logout</li>
                </Link>
              </ul>
            </li>
          </div>
          <div className="main2">
            <div className="side-menu" ref={sideref}>
              <Link to="/" className="side-item">
                <IaIcons.AiFillHome className="side-icon" />
                <span>Dashboard</span>
              </Link>
            </div>
            <div
              ref={mainref2}
              style={{
                transition: "all 0.3s ease",
              }}
              className="p-2 controller"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
