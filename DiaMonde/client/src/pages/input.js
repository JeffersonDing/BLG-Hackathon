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

export class input extends Component {

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
    <div class="content">

            <h3>Information:</h3>

                      <form method="post" action="thanks.html">
                        <div class="row uniform">
                          <div class="6u 12u$(xsmall)">
                            <input type="text" name="name" id="name" value="" placeholder="Name" />
                          </div><br/>
                          <div class="12u$">
                            <div class="select-wrapper">
                              <select name="position" id="position">
                                <option value="">- Position -</option>
                                <option value="1">Excavation</option>
                                <option value="1">Sorting</option>
                                <option value="1">Cutting/Polishing</option>
                                <option value="1">Transportation</option>
                                <option value="1">Retail</option>
                              </select>
                            </div>
                          </div>
                          <div class="4u 12u$(small)">
                            <input type="radio" id="Verified" name="verification" checked/>
                            <label for="Verified">Verified</label>
                          </div>
                          <div class="4u 12u$(small)">
                            <input type="radio" id="Unverified" name="verification"/>
                            <label for="Unverified">Unverified</label>
                          </div>
                          <div class="6u 12u$(small)">
                            <input type="checkbox" id="copy" name="copy"/>
                            <label for="copy">Email me a copy of this message</label>
                          </div>
                          <div class="6u$ 12u$(small)">
                            <input type="checkbox" id="human" name="human" checked/>
                            <label for="human">I am a human and not a robot</label>
                          </div>
                          <div class="12u$">
                            <textarea name="message" id="message" placeholder="Enter additional info" rows="6"></textarea>
                          </div>
                          <div class="12u$">
                            <ul class="actions">
                              <li><input type="button" value="Submit"/></li>
                              <li><input type="reset" value="Reset" class="alt" /></li>
                            </ul>
                          </div>

                          </div>
                      </form>

                      <hr/>
            </div>
          </section>
          </div>
</section>
    );
  }
}
export default withRouter(input);
