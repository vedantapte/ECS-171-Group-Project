import React from "react";
import axios from 'axios';
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
        return <div className="Model3"> <form onSubmit={this.handleSubmit}>
        <label>
          <div>
          Percentage of population that is African American:
          <br></br>
          <input type="number" step="any" name='racepctblack' required 
           onChange={event => this.setState({ racepctblack: event.target.value })}/>
          </div>
          <div>
          Percentage of population that is Caucasian:
          <br></br>

          <input type="number" step="any" name='racePctWhite' required 
          onChange={event => this.setState({ racePctWhite: event.target.value })}/>
          </div>
        </label>
        <br></br>
        <br></br>
      <input type="submit" value="Submit" />
      </form>
      <br></br>
      <p>Violent Crimes Per 100k: {this.state.ViolentCrimesPerPop}</p> </div>;
      } else {
        return null;
      }
    }
  }
export default Model3;