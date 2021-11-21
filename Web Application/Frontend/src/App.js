import React from "react";
import Model1 from "./Model1";
import Model2 from "./Model2";
import Model3 from "./Model3";
import Model4 from "./Model4";
import { CCard, CCardHeader, CCardBody} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
//source for form: https://vegibit.com/a-simple-react-js-form-example/
//button logic: https://stackoverflow.com/questions/52006335/how-to-change-display-onclick-in-react


const Buttons = ({ onToggle, activeSection }) => (
  <div className="buttons">
    <h4>Pick a model.</h4>
    <div className="buttons-flex">
      <button className={"button-individual" + (activeSection==="Model1"? " button-selected":"")} name="Model1" color="dark" onClick={onToggle}>
        Family
      </button>
      <button className={"button-individual" + (activeSection==="Model2"? " button-selected":"")} name="Model2" color="dark" onClick={onToggle}>
        Wealth
      </button>
      <button className={"button-individual" + (activeSection==="Model3"? " button-selected":"")} name="Model3" color="dark" onClick={onToggle}>
        Race
      </button>
      <button className={"button-individual" + (activeSection==="Model4"? " button-selected":"")} name="Model4" color="dark" onClick={onToggle}>
        All
      </button>
    </div>
    
  </div>
);

const Main = ({ activeSection }) => (
  <React.Fragment>
    <Model1 activeSection={activeSection} />
    <Model2 activeSection={activeSection} />
    <Model3 activeSection={activeSection} />
    <Model4 activeSection={activeSection} />
  </React.Fragment>
);




export class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        PctKids2Par: 0,
        PctIlleg: 0,
        TotalPctDiv: 0,
        PctPopUnderPov: 0,
        pctWPubAsst: 0,
        pctWInvInc: 0,
        racepctblack: 0,
        racePctWhite: 0,
        activeSection: "Model1",
        ViolentCrimesPerPop: ""
       };
      
       this.handleToggleSection = this.handleToggleSection.bind(this);
      
  }

  handleToggleSection(e) {
    const { name } = e.target;
    this.setState(() => ({
      activeSection: name
    }));
  }

  render(){
  return (
    <div className="App-all">
    <Buttons onToggle={this.handleToggleSection} activeSection={this.state.activeSection} />
    <Main activeSection={this.state.activeSection} />
    <div>
      <CCard style={{ width: '18rem'}}>
        <CCardHeader>About</CCardHeader>
        <CCardBody>Family: A model that uses family-related attributes to predict violent crime. <br></br> Wealth: A model that uses wealth-related attributes to predict violent crime. <br></br> Race: A model that uses race-related attributes to predict violent crime. <br></br> All: A model that uses all of the above attributes to predict violent crime.</CCardBody>
      </CCard>
      </div>
    </div>      
  );
  }
}

export default App;
