import React from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css'


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onButtonSubmit = () => {
    console.log('imageurl',this.state.input)
    const USER_ID = 'kneesal';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'fd93c6250515439f8c46642e30e55c17';
    const APP_ID = 'facerecognitionbrain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'general-image-recognition';
    const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
    const IMAGE_URL = this.state.input;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  render(){
    return (
      <div className="App">
          <ParticlesBg type="cobweb" num={200} bg={(true)} color = "#222426"/>
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
          {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
