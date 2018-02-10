import React, { Component } from 'react';
import './App.css';
import WorkSpace from './components/WorkSpace'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ width: "100vw", height: "100vh" }}>
        <Provider store={store}>
          <WorkSpace />
        </Provider>
      </div>
    );
  }
}

export default App;
