import React, { Component } from "react";
import DiaMonde from "../contracts/DiaMonde.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import web3 from 'web3'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

import db, { updateDb } from "../constants/db";
export class history extends Component {
  constructor(props) {
        super(props)
        this.state = {
          contract:null,
          hash:'1023949209391',
          mine_date:20160121,
          raw_weight:21315,
          mine_loc:'Congo',
          cut_factoryloc:'South Afica',
          cut_mesurements:[12,22,10],
          cut_grade:'Extra Fine',
          polish_grade:'Fine',
          man_loc:'Germany',
          comp_name:'DeBeers Inc.',
          material:'White Gold 24k',
          product:'Ring',
          cer_measurements:[10,11,15],
          cer_weight:1091,
          cer_grade:'Extra Fine',
        }
      }
componentDidMount(){

}



render() {

    return (
      <section id="main">
          <div class="inner">
            <section id="one" class="wrapper style1">
              <div class="image fit flush">
                <img src="images/Animation.gif" alt="" />
              </div>
              <header class="special">
                <h2>Diamond history:</h2>
              </header>
              <div class="content">
                <br/><br/>
							<h2>1. Exploration/excavation</h2> <br/>
                            <p>Mine Date:{this.state.mine_date}</p><br/>
                            <p>Raw Weight:{this.state.raw_weight}</p><br/>
                            <p>Mine Location:{this.state.mine_loc}</p><br/>

                            <h2>2. Sorting/categorization</h2> <br/>
                            <p>Sort Date:N/A</p><br/>
                            <p>Factory Location:N/A</p><br/>
                            <p>Factory:N/A</p><br/>
                            <p>Category:N/A</p><br/>

                            <h2>3. Cutting/polishing</h2> <br/>
                            <p>Cut Measurements:{this.state.cut_mesurements}</p><br/>
                            <p>Factory Location:{this.state.cut_loc}</p><br/>
                            <p>Cut Grade:{this.state.cut_grade}</p><br/>
                            <p>Polish Grade:{this.state.polish_grade}</p><br/>

                            <h2>4. Manufacture</h2> <br/>
                            <p>Manufacturer:{this.state.comp_name}</p><br/>
                            <p>Material:{this.state.material}</p><br/>
                            <p>Product:{this.state.product}</p><br/>
                            <p>Location:{this.state.man_loc}</p><br/>

                            <h2>5. Certification</h2>
                            <p>Measurements:{this.state.cer_measurements}</p><br/>
                            <p>Weight:{this.state.cer_weight}</p><br/>
                            <p>Grade:{this.state.cer_grade}</p><br/>
              </div>

            </section>
      </div>
      </section>


    );
  }
}
export default withRouter(history);
