import React, { Component } from "react";
import DiaMonde from "../contracts/DiaMonde.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

export class history extends Component {

  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount=async()=>{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DiaMonde.networks[networkId];
      const instance = new web3.eth.Contract(DiaMonde.abi,deployedNetwork);
}
render() {

    return (
      <section id="main">
          <div class="inner">
            <section id="one" class="wrapper style1">
              <div class="image fit flush">
                <img src="images/hands.jpg" alt="" />
              </div>
              <header class="special">
                <h2>Diamond history:</h2>
              </header>
              <div class="content">
                <p>1. Exploration/excavation</p> <br/>
                              <p>2. Sorting/categorization</p> <br/>
                              <p>3. Cutting/polishing</p> <br/>
                              <p>4. Diamond exchange</p> <br/>
                              <p>5. Retail</p>
              </div>

            </section>
      </div>
      </section>


    );
  }
}
export default withRouter(history);
