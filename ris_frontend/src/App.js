import React, {Component} from 'react';
import Particles from 'react-particles-js';
import SignIn from './Components/SignIn/SignIn.js';
import Navigation from './Components/Navigation/Navigation.js';
import PatientRegistration from './Components/PatientRegistration/PatientRegistration.js';
import PatientFind from './Components/PatientFind/PatientFind.js';
import SendRadiologyOrder from './Components/SendRadiologyOrder/SendRadiologyOrder.js';
import AdminSettings from './Components/AdminSettings/AdminSettings.js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 200},
  }
}

const initialState = {
  input: '',
  route: 'signin',
  isSignedIn: false,
  status: '',
  examinationsList: [],
  user: {
    id: '',
    name: '',
    role: ''
  },
  patient: {
    id: '',
    firstname: '',
    lastname: '',
    address: '',
    dateofbirth: '',
    nationalId: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadExaminations = (data) => {
    this.setState({examinationsList: data});
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      role: data.role
    }});
  }

  loadPatient = (data) => {
    this.setState({patient: {
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      dateofbirth: data.dateofbirth,
      nationalId: data.nationalid
    }});
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
    this.setState({status: ''});
  }

  updateStatus = (status) => {
    this.setState({status: status});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} name={this.state.user.name} role={this.state.user.role} />
        <p id="status" className='f5 red'>{this.state.status}</p>
        {this.state.route === 'home' 
          ? <div style={{display: 'flex', justifyContent: 'center'}}>
              <p  className='white f3 pa2'> {`Currently selected patient is: ${this.state.patient.firstname} ${this.state.patient.lastname}`}</p>
            </div>
          : (
             this.state.route === 'signin'
             ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} updateStatus={this.updateStatus} loadExaminations={this.loadExaminations} />
             : (
                this.state.route === 'patientregistration'
                ? <PatientRegistration onRouteChange={this.onRouteChange} updateStatus={this.updateStatus} />
                : (
                    this.state.route === 'patientfind'
                    ? <PatientFind loadPatient={this.loadPatient} onRouteChange={this.onRouteChange} updateStatus={this.updateStatus} />
                    : (
                      this.state.route === 'settings'
                      ? <AdminSettings updateStatus={this.updateStatus} id={this.state.user.id} role={this.state.user.role} />
                      : <SendRadiologyOrder onRouteChange={this.onRouteChange} examinationsList={this.state.examinationsList} id={this.state.patient.id} firstname={this.state.patient.firstname} lastname={this.state.patient.lastname} address={this.state.patient.address} dateofbirth={this.state.patient.dateofbirth} nationalId={this.state.patient.nationalId} updateStatus={this.updateStatus} />
                      )
                  )
              )
            )
        }
      </div>
    );
  }
}

export default App;
