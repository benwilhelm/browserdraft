import React, { Component } from 'react';
import './App.css';
import Outer from './components/Outer'
import Inner from './components/Inner'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ padding: "2em" }}>
        <Outer>
          <Inner x="0"   y="0"   fill="red" />
          <Inner x="110" y="0"   fill="yellow" />
          <Inner x="0"   y="110" fill="green" />
          <Inner x="110" y="110" fill="orange" />
        </Outer>
      </div>
    );
  }
}

export default App;
