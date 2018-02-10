import React, { Component } from 'react';
import './App.css';
import WorkSpace from './components/WorkSpace'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <WorkSpace />
      </div>
    );
  }
}

export default App;
