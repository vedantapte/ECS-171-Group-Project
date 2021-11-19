import React from "react";
import axios from 'axios';
import { Slider } from "@material-ui/core";

class Model1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  get show() {
    return this.props.activeSection === "Model1";
  }

  handleSubmit = async (event) => {
    if (event) {
    this.setState({ViolentCrimesPerPop: "Loading..."});    
    event.preventDefault();
    const resp = await axios.get(`http://localhost:8000/model1?PctKids2Par=${this.state.PctKids2Par}&PctIlleg=${this.state.PctIlleg}&TotalPctDiv=${this.state.TotalPctDiv}`,{ crossdomain: true }).then(res => res.data);
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
      return <div className="Model1"> <form onSubmit={this.handleSubmit}>
        <div>
        PctKids2Par:
        <Slider value={this.state.PctKids2Par} onChange={event => this.setState({ PctKids2Par: event.target.value })}/>
        </div>
        <div>
        PctIlleg:
        <Slider value={this.state.PctIlleg} onChange={event => this.setState({ PctIlleg: event.target.value })}/>
        </div>
        <div>
        TotalPctDiv:
        <Slider value={this.state.TotalPctDiv} onChange={event => this.setState({ TotalPctDiv: event.target.value })}/>
        </div>
    <input type="submit" value="Submit" />
    </form>
    <p>Violent Crimes Per 100K: {this.state.ViolentCrimesPerPop}</p> </div>;
    } else {
      return null;
    }
  }
}

export default Model1;