import React, { Component } from 'react';
import Calendar from './Calendar';
import Footer from './footer';
import Header from './header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Calendar />
        <Footer />
      </div>
    );
  }
}

export default App;
