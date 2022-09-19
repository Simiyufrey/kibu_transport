import React from "react";

const SmallComponents = (props) => {
  return (
    <div className="comp-item">
      <h4>{props.content.title}</h4>
      <div>
        <span>{props.content.number}</span>
      </div>
    </div>
  );
};

export default SmallComponents;
