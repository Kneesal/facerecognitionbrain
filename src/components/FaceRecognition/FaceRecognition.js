import React from "react";

const FaceRecognition = ({ imageUrl, box }) => {
  return imageUrl ? (
    <div className="center ma">
      <div className="absolute mt2">
        <img id='inputimage' src={imageUrl} alt="stock" width="500px" height="auto"></img>
        <div className="bounding-box"></div>
      </div>
    </div>
  ) : null;
};

export default FaceRecognition;
