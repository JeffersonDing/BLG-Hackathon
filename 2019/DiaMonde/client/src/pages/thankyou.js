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

export class thanks extends Component {

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
submitForm (e) {
		e.preventDefault()
		this.props.history.push('/history');
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
              <h2>Thank you!</h2>
            </header>

          </section>
        </div>
      </section>


    );
  }
}
export default withRouter(thanks);
