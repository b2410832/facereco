import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'



const app = new Clarifai.App({
 apiKey: '8f4b63cef0a747c38b676ca789a89a68'
});

const particlesOptions = {
      "particles": {
          "number": {
              "value": 50
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
  }


class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '', //what users input
      imageUrl: '', //display image
      box: {}, //face detect box
      route: 'home', //keep track of where we are on the page
      isSignedIn: false
    }
  }

  //Face Detection
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height, //參考clarifai官網
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value }); //input有變時，把input state更新為輸入值
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }); //按下按鈕後，將<FaceRecognition />照片更新為input內容
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))//並計算input照片的臉部位置&丟入displayFaceBox
      .catch(err => console.log(err));
  }

  // Switch Pages
  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({ isSignedIn: true});
    } else if(route === 'signout') {
      this.setState({ isSignedIn: false});
    }
    this.setState({ route: route});
  }



  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} /> 
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={this.state.isSignedIn}
        />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} //pass as props
                onButtonSubmit={this.onButtonSubmit} //pass as props
              />
              <FaceRecognition 
                imageUrl={this.state.imageUrl}
                box={this.state.box}
              />
            </div>
          : ( this.state.route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
          )
        }

      </div>
    )
  }
}

export default App;
