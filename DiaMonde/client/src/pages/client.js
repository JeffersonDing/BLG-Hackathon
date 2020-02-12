import React, { Component } from "react";
import web3 from 'web3'
import Artifacts from '../contracts/DiaMonde.json'
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,

} from "react-router-dom";

import db, { updateDb } from "../constants/db";

export class client extends Component {
  constructor(props) {
        super(props)
        this.state = {
          contract:null,
          hash:'',
        }
      }

  componentDidMount=async()=>{
    this.web3 = new web3(new web3.providers.WebsocketProvider("ws://localhost:7545"))
      if (this.web3.eth.net.isListening()) {
        this.web3.eth.getAccounts().then(accounts=>{
          const defaultAccount = accounts[0]
            this.web3.eth.net.getId().then(netId=>{
              if (netId in Artifacts.networks) {
                const diaMondeAddress = Artifacts.networks[netId].address
                const contract = new this.web3.eth.Contract(Artifacts.abi,diaMondeAddress)
                this.setState({contract}, () => {
                  updateDb({contract});
                })
              }
            })
          })
        }
      }
submitForm=async()=>{
    let inputVal = document.getElementById("hash").value;
    if(inputVal!=''){
        if(true == true){
          console.log("passed")
          updateDb({hash: inputVal});
          this.setState({hash:inputVal})
          this.props.history.push('/history');
        }else{
          this.props.history.push('/notindb');
        }

  }else{
    this.props.history.push('/error');
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

              <form >
                Diamond Serial Number:<br/>
              <input id = 'hash'type="text"/>
                <br/>
                <input type="button" value="Submit" onClick={this.submitForm}/>
                  <br/><br/>
                  <h2>Tips:</h2>
                    <p>The Kimberley Process is a system of international accountability where governments provide certification documents to verify that diamonds do not perpetuate conflicts. Many nations subscribe to the Kimberely process, but it is very difficult to hold the multinational corporations accountable that actually mine these diamonds. </p>
          </form>

            </div>
            </section>
          </div>

          </section>
    );
  }
}
export default withRouter(client);
