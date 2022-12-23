import React from "react"

const FaceRecognition = ({imageUrl}) => {
   return imageUrl ? (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={imageUrl} alt="stock" width='500px' height = 'auto'></img>
            </div>
        </div>
    ) : null
}

export default FaceRecognition