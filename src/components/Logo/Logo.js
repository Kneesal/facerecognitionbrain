import React from 'react';
import Tilt from 'react-parallax-tilt';
import "./Logo.css"
import brain from './artificial-intelligence.png'

const Logo = () => {
    return(
            <div className='ma4 mt0 '>
            <Tilt  className='br2 shadow-2 h4 w4 tilt pa2' perspective={500} gyroscope={true}>
                    <img src = {brain} alt = 'logo'></img>
             </Tilt>
            </div>
    )
}

export default Logo