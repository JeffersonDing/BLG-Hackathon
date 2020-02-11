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

export class contractors extends Component {

  state = {
    hash:"",

  };

  componentDidMount=async()=>{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DiaMonde.networks[networkId];
      const instance = new web3.eth.Contract(DiaMonde.abi,deployedNetwork);
}
submitForm () {
    let inputVal = document.getElementById("hash").value;
    if(inputVal!=''){
		this.props.history.push('/history');
  }else{
    this.props.history.push('/error')
  }
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
              <h2>Verify your diamond:</h2>
            </header>
            <div class="content">

              <form onSubmit={this.submitForm.bind(this)}>
                Diamond Hash Number(Please Leave Blank if you are a Miner):<br/>
              <input id = 'hash'type="text"/>
                <br/>
                <input type="button" value="Submit" onClick={this.submitForm} />
              </form>

            </div>
            </section>
          </div>

          </section>
    );
  }
}
export default withRouter(contractors);
