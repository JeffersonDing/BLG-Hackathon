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
  constructor(props) {
        super(props)
        this.state = {
        dropdown:'',

        }
      }

  componentDidMount=async()=>{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DiaMonde.networks[networkId];
      const instance = new web3.eth.Contract(DiaMonde.abi,deployedNetwork);
}

handleOnChange(event){
  this.setState({dropdown:event.currentTarget.value},()=>{
    console.log(this.state.dropdown)

  })

}
submitForm=async()=>{
  switch (this.state.dropdown) {
    case '1':
      this.props.history.push('/mine');
      break;
    case '2':
    this.props.history.push('/sort');
    break;
    case '3':
    this.props.history.push('/cut');
    break;
    case '4':
    this.props.history.push('/manufacture');
    break;
    case '5':
    this.props.history.push('/cer');
    break;
    default:
    break;

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
    <div class="content">

            <h3>Information:</h3>

                      <form method="post" action="thanks.html">
                        <div class="row uniform">
                        <br/>
                          <div class="12u$">
                            <div class="select-wrapper">
                              <select name="position" id="position" onChange={this.handleOnChange.bind(this)}>
                                <option value="0">- Position -</option>
                                <option value="1">Excavation</option>
                                <option value="2">Sorting</option>
                                <option value="3">Cutting/Polishing</option>
                                <option value="4">Manufacture</option>
                                <option value="5">Certification</option>
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

                          <div class="6u$ 12u$(small)">
                            <input type="checkbox" id="human" name="human" checked/>
                            <label for="human">I am a human and not a robot</label>
                          </div>

                          <div class="12u$">
                            <ul class="actions">
                              <li><input type="button" value="Submit" onClick={this.submitForm}/></li>
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
