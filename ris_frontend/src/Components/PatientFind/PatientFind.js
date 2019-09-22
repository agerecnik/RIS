import React from 'react';

class PatientFind extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patientNationalId: ''
		}
	}

	onNationalIdChange = (event) => {
		this.setState({patientNationalId: event.target.value});
	}

	onSubmitFind = () => {
		fetch('http://localhost:3000/patientFind', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				nationalId: this.state.patientNationalId
			})
		})
		.then(response => response.json())
		.then(patient => {
			if (patient.id) {
				this.props.loadPatient(patient);
				this.props.onRouteChange('home');
			}
			else {
				this.props.updateStatus(patient);
			}
		})
		.catch(err => this.props.updateStatus("Could not connect to the server!"));
	}

	render() {
		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
	  				<div className="measure">
	    				<fieldset id="patientFind" className="ba b--transparent ph0 mh0">
	      					<legend className="f1 fw6 ph0 mh0">Find patient</legend>
	      					<div className="mt3">
	        					<label className="db fw6 lh-copy f6">Patient's National ID</label>
	        					<input onChange={this.onNationalIdChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="patientNationalId"  id="patientNationalId" />
	      					</div>
	    				</fieldset>
	    				<div className="">
	      					<input onClick={this.onSubmitFind} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Find" />
	    				</div>
	  				</div>
				</main>
			</article>
		);
	}
}

export default PatientFind;