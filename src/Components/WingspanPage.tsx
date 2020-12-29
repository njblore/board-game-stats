import React from "react";
import wingspanbirdheader from "../images/wingspanbirdheader.jpeg";

const WingspanPage = () => {
  return (
    <div className="page-container">
      <div className="page-header header">
        <div className="image-container">
          <img src={wingspanbirdheader} alt="wingspan-header"></img>
        </div>
      </div>
    </div>
  );
};

export default WingspanPage;
