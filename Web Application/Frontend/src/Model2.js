import React from "react";
import axios from 'axios';
class Model2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  get show() {
    return this.props.activeSection === "Model2";
  }

  handleSubmit = async (event) => {
    if (event) {
    this.setState({ViolentCrimesPerPop: "Loading..."});    
    event.preventDefault();
    const resp = await axios.get(`http://localhost:8000/model2?PctPopUnderPov=${this.state.PctPopUnderPov}&pctWPubAsst=${this.state.pctWPubAsst}&pctWInvInc=${this.state.pctWInvInc}`,{ crossdomain: true }).then(res => res.data);
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
      return <div className="Model2"> <form onSubmit={this.handleSubmit}>
    <label>
    <div>
    PctPopUnderPov:
    <input type="number" step="any" name='PctPopUnderPov' required 
        onChange={event => this.setState({ PctPopUnderPov: event.target.value })}/>
    </div>
    <div>
    pctWPubAsst:
    <input type="number" step="any" name='pctWPubAsst' required 
    onChange={event => this.setState({ pctWPubAsst: event.target.value })}/>
    </div>
    <div>
    pctWInvInc:
    <input type="number" step="any" name='pctWInvInc' required 
    onChange={event => this.setState({ pctWInvInc: event.target.value })}/>
    </div>

    </label>
    <input type="submit" value="Submit" />
    </form>
    <p>Violent Crimes Per 100k: {this.state.ViolentCrimesPerPop}</p> </div>;
    } else {
      return null;
    }
  }
}

export default Model2;