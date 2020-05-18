import React, { Component } from "react";
import DiaMonde from "./contracts/DiaMonde.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import client from './pages/client.js'
import history from './pages/history.js'
import input from './pages/input.js'
import thanks from './pages/thankyou.js'
import error from './pages/error.js'
import mine from './pages/mine.js'
import cut from './pages/cut.js'
import sort from './pages/sort.js'
import manufacture from './pages/manufacture.js'
import cer from './pages/cer.js'
import contractors from './pages/contractors.js'
import notindb from './pages/notindb.js'
class App extends Component {
render() {
    return (
      <div className="App">
          <Router>
            <Switch>
              <Route exact path = '/' component={client} />
              <Route exact path = '/history' component={history} />
              <Route exact path = '/input' component={input} />
              <Route exact path = '/thankyou' component={thanks} />
              <Route exact path = '/error' component={error} />
              <Route exact path = '/mine' component={mine} />
              <Route exact path = '/cut' component={cut} />
              <Route exact path = '/sort' component={sort} />
              <Route exact path = '/manufacture' component={manufacture} />
              <Route exact path = '/cer' component={cer} />
              <Route exact path = '/contractors' component={contractors} />
              <Route exact path = '/notindb' component={notindb} />
            </Switch>
          </Router>
        </div>
    );
  }
}
export default App;
