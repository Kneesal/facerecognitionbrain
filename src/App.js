import React from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import './App.css'


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box; //gets the output bounding box, bounding box is a percentage of the image
   const image = document.getElementById('inputimage'); //get the image and cache it
   const width = Number(image.width); //get the image height and width
   const height = Number(image.height);
   return {
    leftCol: clarifaiFace.left_col * width, //since bounding box is a percentage o
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height) 
   }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    const USER_ID = 'kneesal';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'fd93c6250515439f8c46642e30e55c17';
    const APP_ID = 'facerecognitionbrain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.input.trim();

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
        .then(response => response.json())
        .then(result => 
           { console.log(result) //console.log results for future
            return this.displayFaceBox(this.calculateFaceLocation(result))})
        .catch(error => console.log('error', error));
  }

  onRouteChange = (setRoute) => {
    if (setRoute === 'signout'){
      this.setState({isSignedIn: false, imageUrl: ''})
    } else if(setRoute === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: setRoute});
  }

  render(){
    return (
      <div className="App">
          <ParticlesBg type="cobweb" num={300} bg={(true)} color = "#222426"/>
          <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn}/>
          { this.state.route === 'home' ? 
          (
          <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box} />
          </div>
          )
          : this.state.route === 'signin' || this.state.route === 'signout' ? <SignIn onRouteChange = {this.onRouteChange}/> : <Register onRouteChange = {this.onRouteChange}/>
    }
      </div>
    );
  }
}

export default App;

