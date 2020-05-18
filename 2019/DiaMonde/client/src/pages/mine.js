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
export class mine extends Component {

  state = {
    contract:null,
    hash:'',

  };

  componentDidMount(){
    console.log(db.data.contract);
  this.setState({contract:db.data.contract},()=>{
    console.log(this.state.contract)

    })
  }
submitForm () {
    let _date = document.getElementById("date").value;
    let _weight=document.getElementById("weight").value;
    let _loc=document.getElementById("loc").value;
    if(_date!=''||_weight!=''||_loc!=''){
      this.state.contract.methods.mine(_date,_loc,_weight).send({from:'0x7C2C6d9F404bb083a154cc7Da19974668153c85f'},(err,res)=>{

          this.props.history.push('/thankyou')
      })


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
							<h2>Mining Stage</h2>
						</header>
						<div class="content">
							<form action ={this.submitForm.bind(this)}>
                              Mine Date:<br/>
                            <input id="date" type="text" name="date" ></input>
                              <br/><br/>

                              Mine Location:<br/>
                            <input id="loc" type="text" name="loc" ></input>
                              <br/><br/>
                              Raw Weight:<br/>
                            <input id="weight" type="text" name="weight" ></input>
                              <br/><br/>
                              <input type="button" value="Submit" onClick={this.submitForm.bind(this)}></input>
                            </form>
						</div>
					</section>
          </div>
          </section>

    );
  }
}
export default withRouter(mine);
