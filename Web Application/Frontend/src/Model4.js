import React from "react";
import axios from 'axios';
class Model4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    get show() {
      return this.props.activeSection === "Model4";
    }

    handleSubmit = async (event) => {
        if (event) {
        this.setState({ViolentCrimesPerPop: "Loading..."});    
        event.preventDefault();
        const resp = await axios.get(`http://localhost:8000/model4?PctKids2Par=${this.state.PctKids2Par}&PctIlleg=${this.state.PctIlleg}&TotalPctDiv=${this.state.TotalPctDiv}&PctPopUnderPov=${this.state.PctPopUnderPov}&pctWPubAsst=${this.state.pctWPubAsst}&pctWInvInc=${this.state.pctWInvInc}&racepctblack=${this.state.racepctblack}&racePctWhite=${this.state.racePctWhite}`,{ crossdomain: true }).then(res => res.data);
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
        return <div className="Model4"> <form onSubmit={this.handleSubmit}>
        <label>
        <div>
        PctKids2Par:
        <input type="number" step="any" name='PctKids2Par' required 
         onChange={event => this.setState({ PctKids2Par: event.target.value })}/>
        </div>
        <div>
        PctIlleg:
        <input type="number" step="any" name='PctIlleg' required 
        onChange={event => this.setState({ PctIlleg: event.target.value })}/>
        </div>
        <div>
        TotalPctDiv:
        <input type="number" step="any" name='TotalPctDiv' required 
        onChange={event => this.setState({ TotalPctDiv: event.target.value })}/>
        </div>
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
    <div>
          racepctblack:
          <input type="number" step="any" name='racepctblack' required 
           onChange={event => this.setState({ racepctblack: event.target.value })}/>
          </div>
          <div>
          racePctWhite:
          <input type="number" step="any" name='racePctWhite' required 
          onChange={event => this.setState({ racePctWhite: event.target.value })}/>
          </div>
  
        </label>
      <input type="submit" value="Submit" />
      </form>
      <p>Violent Crimes Per 100k: {this.state.ViolentCrimesPerPop}</p></div>;
      } else {
        return null;
      }
    }
  }
export default Model4;