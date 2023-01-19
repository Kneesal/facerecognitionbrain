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
    const USER_ID = "kneesal";
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "fd93c6250515439f8c46642e30e55c17";
    const APP_ID = "facerecognitionbrain";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
    const IMAGE_URL = this.state.input.trim();

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) =>
              this.setState(Object.assign(this.state.user, { entries: count }))
            )
            .catch(console.log)
        }
        return this.displayFaceBox(this.calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

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
