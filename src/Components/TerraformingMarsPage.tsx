import React from "react";
import tmheader from "../images/tmboxheader.png";

const TerraformingMarsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header header">
        <div className="image-container">
          <img src={tmheader} alt="terraforming-mars-header"></img>
        </div>
      </div>
    </div>
  );
};

export default TerraformingMarsPage;
