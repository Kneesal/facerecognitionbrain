import React from "react"
import "./ImageLinkForm.css"
const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return(
        <div>
            <p className="f3">
                {`This Magic Brain will detect faces in your pictures. Give it a try by entering the image URL`}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className = 'f4 pa2 w-70' type='text' placeholder="e.g. https://media.vanityfair.com/photos/571260aa1127b91b74688648/master/pass/906020_1000448100018481_3721444261468514489_o.jpg" onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>{`Detect`}</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm