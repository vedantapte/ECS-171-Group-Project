import React from "react";
import axios from 'axios';
import { Slider } from "@material-ui/core";
class Model4 extends React.Component {
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
      return this.props.activeSection === "Model4";
    }

    handleSubmit = async (event) => {
        if (event) {
        this.setState({ViolentCrimesPerPop: "Loading..."});    
        event.preventDefault();
        const resp = await axios.get(`http://localhost:8000/all?PctKids2Par=${this.state.PctKids2Par}&PctIlleg=${this.state.PctIlleg}&TotalPctDiv=${this.state.TotalPctDiv}&PctPopUnderPov=${this.state.PctPopUnderPov}&pctWPubAsst=${this.state.pctWPubAsst}&pctWInvInc=${this.state.pctWInvInc}&racepctblack=${this.state.racepctblack}&racePctWhite=${this.state.racePctWhite}`,{ crossdomain: true }).then(res => res.data);
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
        return <div className="Model4"> 
        <blockquote>Model that uses all of the attributes in family, wealth, and race model to predict violent crime.</blockquote>
        
        <form onSubmit={this.handleSubmit}>
        <label>
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
            <Slider value={this.state.PctIlleg} onChange={(event, value) => this.setState({ PctIlleg: value })}/>
            <p className="slider-text">{this.state.PctIlleg? this.state.PctIlleg:"0"}</p>
        </div>
        </div>
        <div>
        Rate of population who are divorced (Normalized):
        <div className="slider">
            <Slider value={this.state.TotalPctDiv} onChange={(event, value) => this.setState({ TotalPctDiv: value })}/>
            <p className="slider-text">{this.state.TotalPctDiv? this.state.TotalPctDiv:"0"}</p>
        </div>
        </div>
        <div>
        Rate of people under the poverty level (Normalized):
        <div className="slider">
            <Slider value={this.state.PctPopUnderPov} onChange={(event, value) => this.setState({ PctPopUnderPov: value })}/>
            <p className="slider-text">{this.state.PctPopUnderPov? this.state.PctPopUnderPov:"0"}</p>
        </div>
    </div>
    <div>
    Rate of households with public assistance income in 1989 (Normalized):
    <div className="slider">
            <Slider value={this.state.pctWPubAsst} onChange={(event, value) => this.setState({ pctWPubAsst: value })}/>
            <p className="slider-text">{this.state.pctWPubAsst? this.state.pctWPubAsst:"0"}</p>
        </div>
    </div>
    <div>
    Rate of households with investment / rent income in 1989 (Normalized):
    <div className="slider">
            <Slider value={this.state.pctWInvInc} onChange={(event, value) => this.setState({ pctWInvInc: value })}/>
            <p className="slider-text">{this.state.pctWInvInc? this.state.pctWInvInc:"0"}</p>
        </div>
    </div>
    <div>
    Rate of population that is African American (Normalized):
    <div className="slider">
            <Slider value={this.state.racepctblack} onChange={(event, value) => this.setState({ racepctblack: value })}/>
            <p className="slider-text">{this.state.racepctblack? this.state.racepctblack:"0"}</p>
        </div>
          </div>
          <div>
          Rate of population that is Caucasian (Normalized):
          <div className="slider">
            <Slider value={this.state.racePctWhite} onChange={(event, value) => this.setState({ racePctWhite: value })}/>
            <p className="slider-text">{this.state.racePctWhite? this.state.racePctWhite:"0"}</p>
        </div>
          </div>
  
        </label>
        <br></br>
        <br></br>

        <input type="submit" value="Submit" className="submit-button" />
      </form>
      <br></br>

      <p>{this.state.ViolentCrimesPerPop? "(Normalized) Violent Crimes Per 100K: " + this.state.ViolentCrimesPerPop : ""}</p> </div>;
      } else {
        return null;
      }
    }
  }
export default Model4;