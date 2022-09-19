import React from "react";
import { FaAngleDoubleRight, FaAngleRight } from "react-icons/fa";
import "./spinner.css";
const Spinner = (props) => {
  return (
    <div
      className="spinner"
      style={props.show ? { display: "flex" } : { display: "none" }}
    >
      <div className="bbox"></div>
    </div>
  );
};

export default Spinner;
