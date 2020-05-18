import React, { Component } from 'react';
import logo from './blg.jpg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Web3 from 'web3'

import tokenArtifacts from './build/contracts/Token.json'

// Material UI
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class test3 extends Component {


  // Import build Artifacts
  //eslint-disable-next-line

    constructor(props) {
      super(props)
      this.state = {
        token: null, // token contract
        availableAccounts:[],
        defaultAccount:0,
        tokenSymbol:0,
        rate:1,
        tokenBalance:0,
        ethBalance:0,
        amount:0,
        transferAmount: 0,
        transferUser: '',
      }
    }

  componentDidMount() {
  this.web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:7545"))
  if (this.web3.eth.net.isListening()) {
    this.web3.eth.getAccounts().then(accounts=>{
      const defaultAccount = accounts[0]
      for(var i=0;i<accounts.length;i++){
        this.setState({
              availableAccounts:this.state.availableAccounts.concat(
                  <MenuItem value={i} key={accounts[i]} primaryText={accounts[i]}></MenuItem>
                  )
                })
              }
        this.web3.eth.net.getId().then(netId=>{
          if (netId in tokenArtifacts.networks) {
            const tokenAddress = tokenArtifacts.networks[netId].address
            console.log(tokenAddress)
            const token = new this.web3.eth.Contract(tokenArtifacts.abi,tokenAddress)
            this.setState({token})
            console.log(token)
            this.state.token.methods.symbol().call().then(tokenSymbol=>{
              this.setState({tokenSymbol})
            })
            this.state.token.methods.rate().call().then(rate=>{
              this.setState({rate})
              })
              this.loadEventListeners()
            }
          })
          this.loadAccountBalances(defaultAccount)

        })
      }
    }
    /**
     * Load the accounts token and ether balances.
     * @param  {Address} account The user's ether address.
     */


  loadAccountBalances(account) {
  if(this.state.token != null){
    this.state.token.methods.balanceOf(account).call((err,balance)=>{
      this.setState({tokenBalance:balance})
    })

  this.web3.eth.getBalance(account,(err,ethbalance)=>{
    this.setState({ethBalance:ethbalance})
  })
  }
  }


    // Create listeners for all events.
    loadEventListeners() {
      console.log("EventListener ready")
      this.state.token.events.Transfer ({fromBlock: 'latest',toBlock: 'latest'}, (error, result)=> {
    this.web3.eth.getAccounts().then(accounts=>{
       this.loadAccountBalances(accounts[this.state.defaultAccount])
    })
  });
    }

    // Buy new tokens with eth
    buy(amount) {
      this.web3.eth.getAccounts().then(accounts=>{
        this.state.token.methods.buy().send({from:accounts[this.state.defaultAccount],value:amount},(err,res)=>{
          err?console.error(err):console.log(res)
        })

      })

    }
    // Transfer tokens to a user
    transfer(user, amount) {
      if (amount > 0) {
        this.web3.eth.getAccounts().then(accounts=>{
        this.state.token.methods.transfer(user, amount).send({from: accounts[this.state.defaultAccount]}, (err, res) => {
          err ? console.error(err) : console.log(res)
        })
  })
  }
  }

    // When a new account in selected in the available accounts drop down.
    handleDropDownChange = (event, index, defaultAccount) => {
      this.setState({defaultAccount})
      this.loadAccountBalances(this.state.availableAccounts[index].key)
    }


  render() {
    return (
      <div>
        <h3>Active Account3</h3>
        <DropDownMenu maxHeight={300} width={500} value={this.state.defaultAccount} onChange={this.handleDropDownChange}>
          {this.state.availableAccounts}
        </DropDownMenu>
        <h3>Balances</h3>
        <p className="App-intro">{this.state.ethBalance / 1e18} ETH</p>
        <p className="App-intro"> {this.state.tokenBalance} {this.state.tokenSymbol}</p>
        <br />
        <div>
          <h3>Buy Tokens</h3>
          <h5>Rate: {this.state.rate} {this.state.tokenSymbol} / wei</h5>
          <TextField floatingLabelText="Token Amount." style={{width: 200}} value={this.state.amount}
            onChange={(e, amount) => {this.setState({ amount })}}
          />
          <RaisedButton label="Buy" labelPosition="before" primary={true}
            onClick={() => this.buy(this.state.amount/this.state.rate)}
          />
        </div>
        <br />
          <div>
            <h3>Transfer Tokens</h3>
            <TextField floatingLabelText="User to transfer tokens to." style={{width: 400}} value={this.state.transferUser}
              onChange={(e, transferUser) => { this.setState({ transferUser }) }}
            />
            <TextField floatingLabelText="Amount." style={{width: 100}} value={this.state.transferAmount}
              onChange={(e, transferAmount) => { this.setState({ transferAmount })}}
            />
            <RaisedButton label="Transfer" labelPosition="before" primary={true}
             onClick={() => this.transfer(this.state.transferUser, this.state.transferAmount)}
            />
          </div>
      </div>
    )

  }
}

const test3WithRouter = withRouter(test3)
