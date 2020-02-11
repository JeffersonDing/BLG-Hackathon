import React, { Component } from "react";
import Web3 from 'web3'
import Artifacts from '../contracts/DiaMonde.json'
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,

} from "react-router-dom";

export class client extends Component {
  constructor(props) {
        super(props)
        this.state = {
          contract:null,
          hash:'',
        }
      }

  componentDidMount=async()=>{
    this.web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"))
      if (this.web3.eth.net.isListening()) {
        this.web3.eth.getAccounts().then(accounts=>{
          const defaultAccount = accounts[0]
            this.web3.eth.net.getId().then(netId=>{
              if (netId in Artifacts.networks) {
                const diaMondeAddress = Artifacts.networks[netId].address
                const contract = new this.web3.eth.Contract(Artifacts.abi,diaMondeAddress)
                this.setState({contract})
                console.log(this.state.contract)
              }
            })
          })
        }
      }
submitForm=async()=>{
    console.log(this.state.contract)
    let inputVal = document.getElementById("hash").value;
    if(inputVal!=''){
      console.log(this.state.contract)
      this.state.contract.methods.isRegistered(inputVal).call((err,pass)=>{
        console.log(pass)
        if(pass == true){
          console.log("passed")
          this.setState({hash:inputVal});
          this.props.history.push('/history');
        }else{
          console.log("fail")
          this.props.history.push('/error');
        }
      })

  }else{
    console.log("fail")
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
              </form>

            </div>
            </section>
          </div>

          </section>
    );
  }
}
export default withRouter(client);
