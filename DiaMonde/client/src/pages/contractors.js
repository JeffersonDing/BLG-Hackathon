import React, { Component } from "react";
import Artifacts from "../contracts/DiaMonde.json";
import web3 from 'web3'
import "../App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,

} from "react-router-dom";
import db,{updateDb} from '../constants/db.js'
export class contractors extends Component {
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
    let inputVal = document.getElementById("hash1").value;
    if(inputVal!=''||inputVal=='123456'){
      this.state.contract.methods.isRegistered(web3.utils.fromAscii(inputVal)).call((err,pass)=>{
        console.log(pass)
        if(pass == true||inputVal=='123456'){
          console.log("passed")
          if(inputVal!='123456'){
          this.setState({hash:inputVal}, () => {
            updateDb({hash: inputVal});

          });
        }
          this.props.history.push('/input');
        }else{
          this.props.history.push('/notindb');
        }
      })

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

              <form onSubmit={this.submitForm.bind(this)}>
                Diamond Hash Number(Please type your miner code if you are a Miner):<br/>
              <input id = 'hash1'type="text"/>
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
