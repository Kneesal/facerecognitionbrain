import React from "react";
import './FaceRecognition.css' //created it's own CSS file since the only CSS we are going to inject is only going to be used here

const FaceRecognition = ({ imageUrl, box }) => {
  return imageUrl ? (
    <div className="center ma">
      <div className="absolute mt2">
        <img id='inputimage' src={imageUrl} alt="stock" width="500px" height="auto"></img>
        {/*in the above, we set width to 500px so that if we upload a large image, it will scale it down to size to fit nicely in our app */}
        {box.map( box => {
           return (<div key = {box.topRow} className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>)
        })}
      </div>
    </div>
  ) : null;
};

export default FaceRecognition;
