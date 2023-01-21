import React from "react";
import ParticlesBg from "particles-bg";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
      incorrectSignIn: false,
    };
  }

  updateSignIn = (signin) => {
    return signin
      ? this.setState({
          incorrectSignIn: false,
        })
      : this.setState({
          incorrectSignIn: true,
        });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage"); //get the image and cache it // we use rendered image becauase the uploaded image is different width & heigth than rendered image
    const width = Number(image.width); //get the rendered image height and width
    const height = Number(image.height);
    let boxData = [];
    data.outputs[0].data.regions.forEach((region) => {
      const clarifaiFaceData = region.region_info.bounding_box;
      boxData.push({
        leftCol: clarifaiFaceData.left_col * width, //since bounding box is a percentage of image
        topRow: clarifaiFaceData.top_row * height,
        rightCol: width - clarifaiFaceData.right_col * width,
        bottomRow: height - clarifaiFaceData.bottom_row * height,
      });
    });
    return boxData;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
              imageURL: this.state.input.trim()
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              const {entries, clarifaiOutput} = data
              this.setState(Object.assign(this.state.user, { entries: entries }))
              return this.displayFaceBox(this.calculateFaceLocation(clarifaiOutput));
            })
            .catch(console.log)
        }
        // return this.displayFaceBox(this.calculateFaceLocation(result));

  onRouteChange = (setRoute) => {
    if (setRoute === "signout") {
      this.setState({ isSignedIn: false, imageUrl: "", input: ""});
    } else if (setRoute === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: setRoute });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg type="cobweb" num={150} bg={true} color="#222426"/>
        <Navigation
          onRouteChange={this.onRouteChange} //function that changes route
          isSignedIn={this.state.isSignedIn} //pass this boolen to conditionally render contents of NavBar
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              userName={this.state.user.name}
              userEntries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        ) : this.state.route === "signin" || this.state.route === "signout" ? (
          <SignIn
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
            incorrectSignIn={this.state.incorrectSignIn}
            updateSignIn={this.updateSignIn}
          />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
            updateSignIn={this.updateSignIn}
          />
        )}
      </div>
    );
  }
}

export default App;
