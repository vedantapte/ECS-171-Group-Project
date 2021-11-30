import React from "react";
import axios from 'axios';
import { Slider } from "@material-ui/core";
class Model3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    get show() {
      return this.props.activeSection === "Model3";
    }

    handleSubmit = async (event) => {
        if (event) {
        this.setState({ViolentCrimesPerPop: "Loading..."});    
        event.preventDefault();
        const resp = await axios.get(`http://localhost:8000/race?racepctblack=${this.state.racepctblack}&racePctWhite=${this.state.racePctWhite}`,{ crossdomain: true }).then(res => res.data);
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
        return <div className="Model3"> 
        <blockquote>Model that uses race-related attributes to predict violent crime.</blockquote>
        
        <form onSubmit={this.handleSubmit}>
        <label>
          <div>
          Percentage of population that is African American:
          <div className="slider">
            <Slider value={this.state.racepctblack} onChange={(event, value) => this.setState({ racepctblack: value })}/>
            <p className="slider-text">{this.state.racepctblack? this.state.racepctblack:"0"}</p>
          </div>
          </div>
          <div>
          Percentage of population that is Caucasian:
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
      <p>Violent Crimes Per 100k: {this.state.ViolentCrimesPerPop}</p> </div>;
      } else {
        return null;
      }
    }
  }
export default Model3;