import React, { Component } from 'react';
import HeaderComponent from './Components/HeaderComponent/HeaderComponent';
import NavComponent from './Components/NavComponent';
import MainPageComponent from './Components/MainPageComponent';
import FooterComponent from './Components/FooterComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>testing</p>
        <HeaderComponent />
        <NavComponent />
        <MainPageComponent />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
