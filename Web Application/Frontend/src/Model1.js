import React from "react";
import axios from 'axios';
import { Slider } from "@material-ui/core";

class Model1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { PctKids2Par: 0,
          PctIlleg: 0,
          TotalPctDiv: 0,
          PctPopUnderPov: 0,
          pctWPubAsst: 0,
          pctWInvInc: 0,
          racepctblack: 0,
          racePctWhite: 0};
    }
  get show() {
    return this.props.activeSection === "Model1";
  }

  handleSubmit = async (event) => {
    if (event) {
    this.setState({ViolentCrimesPerPop: "Loading..."});    
    event.preventDefault();
    const resp = await axios.get(`http://localhost:8000/family?PctKids2Par=${this.state.PctKids2Par}&PctIlleg=${this.state.PctIlleg}&TotalPctDiv=${this.state.TotalPctDiv}`,{ crossdomain: true }).then(res => res.data);
    console.log(resp);
    this.setState({ViolentCrimesPerPop: resp.ViolentCrimesPerPop});    
    }
    
  };

  componentDidMount(){
    this.handleSubmit();
  }

  componentDidUpdate() {
    this.handleSubmit();
  }

  

  render() {
    if (this.show) {
      return <div className="Model1"> 
      <blockquote>Model that uses family-related attributes to predict violent crime.</blockquote>
      
      <form onSubmit={this.handleSubmit}>
        <div>
        Rate of kids in family housing with two parents (Normalized):
        <div className="slider">
          <Slider value={this.state.PctKids2Par} onChange={(event, value) => this.setState({ PctKids2Par: value })}/>
          <p className="slider-text">{this.state.PctKids2Par? this.state.PctKids2Par:"0"}</p>
        </div>
        </div>
        <div>
        Rate of kids born to never married (Normalized):
        <div className="slider">
          <Slider value={this.state.PctIlleg} onChange={(event, value) => this.setState({ PctIlleg: value})}/>
          <p className="slider-text">{this.state.PctIlleg? this.state.PctIlleg:"0"}</p>
        </div>
        </div>
        <div>
        Rate of population who are divorced (Normalized):
        <div className="slider">
          <Slider value={this.state.TotalPctDiv} onChange={(event, value) => this.setState({ TotalPctDiv: value})}/>
          <p className="slider-text">{this.state.TotalPctDiv? this.state.TotalPctDiv:"0"}</p>
        </div>
        </div>
    <input type="submit" value="Submit" className="submit-button" />
    </form>
    <p>{this.state.ViolentCrimesPerPop? "Violent Crimes Per 100K: " + this.state.ViolentCrimesPerPop : ""}</p> </div>;
    } else {
      return null;
    }
  }
}

export default Model1;