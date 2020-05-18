import React, { Component } from 'react';
import logo from './blg.jpg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import{test2} from './test2.js';
import{test3} from './test3.js';
// Import the web3 library
import Web3 from 'web3';

// Material UI
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class App extends Component {

  render() {

    return (
      <MuiThemeProvider>
        <div className="App">
          <Router>
            <switch>
              <Route exact path = '/' component={test2} />
              <Route exact path = '/test3' component={test3} />






            </switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
