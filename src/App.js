import React from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css'


class App extends React.Component {
  render(){
    return (
      <div className="App">
          <ParticlesBg type="cobweb" num={200} bg={(true)} color = "#222426"/>
          <Navigation/>
          <Logo/>
          <Rank/>
          <ImageLinkForm/>
          {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
