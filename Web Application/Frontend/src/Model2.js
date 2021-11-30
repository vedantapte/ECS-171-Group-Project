import React from "react";
import axios from 'axios';
import { Slider } from "@material-ui/core";
class Model2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {PctKids2Par: 0,
          PctIlleg: 0,
          TotalPctDiv: 0,
          PctPopUnderPov: 0,
          pctWPubAsst: 0,
          pctWInvInc: 0,
          racepctblack: 0,
          racePctWhite: 0};
    }
  get show() {
    return this.props.activeSection === "Model2";
  }

  handleSubmit = async (event) => {
    if (event) {
    this.setState({ViolentCrimesPerPop: "Loading..."});    
    event.preventDefault();
    const resp = await axios.get(`http://localhost:8000/wealth?PctPopUnderPov=${this.state.PctPopUnderPov}&pctWPubAsst=${this.state.pctWPubAsst}&pctWInvInc=${this.state.pctWInvInc}`,{ crossdomain: true }).then(res => res.data);
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
      return <div className="Model2"> 
      <blockquote>Model that uses wealth-related attributes to predict violent crime.</blockquote>
      <form onSubmit={this.handleSubmit}>
    <label>
    <div>
    Percentage of people under the poverty level:
    <div className="slider">
          <Slider value={this.state.PctPopUnderPov} onChange={(event, value) => this.setState({ PctPopUnderPov: value })}/>
          <p className="slider-text">{this.state.PctPopUnderPov? this.state.PctPopUnderPov:"0"}</p>
    </div>
    </div>
    <div>
    Percentage of households with public assistance income in 1989:
    <div className="slider">
          <Slider value={this.state.pctWPubAsst} onChange={(event, value) => this.setState({ pctWPubAsst: value })}/>
          <p className="slider-text">{this.state.pctWPubAsst? this.state.pctWPubAsst:"0"}</p>
    </div>
    </div>
    <div>
    Percentage of households with investment / rent income in 1989:
    <div className="slider">
          <Slider value={this.state.pctWInvInc} onChange={(event, value) => this.setState({ pctWInvInc: value })}/>
          <p className="slider-text">{this.state.pctWInvInc? this.state.pctWInvInc:"0"}</p>
    </div>
    </div>

    </label>
    <br></br>
    <br></br>

    <input type="submit" value="Submit" className="submit-button" />
    </form>
    <br></br>
    <p>{this.state.ViolentCrimesPerPop? "Violent Crimes Per 100K: " + this.state.ViolentCrimesPerPop : ""}</p> </div>;
    } else {
      return null;
    }
  }
}

export default Model2;