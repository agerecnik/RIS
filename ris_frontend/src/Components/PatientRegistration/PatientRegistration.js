import React from 'react';

class PatientRegistration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			address: '',
			dateOfBirth: '',
			nationalId: ''
		}
	}

	onFirstNameChange = (event) => {
		this.setState({ firstName: event.target.value })
	}

	onLastNameChange = (event) => {
		this.setState({ lastName: event.target.value })
	}

	onAddressChange = (event) => {
		this.setState({ address: event.target.value })
	}

	onDateOfBirthChange = (event) => {
		this.setState({ dateOfBirth: event.target.value })
	}

	onNationalIdChange = (event) => {
		this.setState({ nationalId: event.target.value })
	}

	onSubmitPatientRegistration = () => {
		fetch('http://localhost:3000/patientRegistration', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				firstname: this.state.firstName,
				lastname: this.state.lastName,
				address: this.state.address,
				dateofbirth: this.state.dateOfBirth,
				nationalId: this.state.nationalId
			})
		})
		.then(response => response.json())
		.then(res => {
			this.props.onRouteChange('home');
			this.props.updateStatus(res);
		})
		.catch(err => this.props.updateStatus("Could not connect to the server!"));	
	}

	render() {
		return (
	     	<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	        	<main className="pa4 black-80">
	          	<div className="measure">
	            	<fieldset id="patientRegistration" className="ba b--transparent ph0 mh0">
	              		<legend className="f1 fw6 ph0 mh0">Patient Registration</legend>
	              		<div className="mt3">
	                		<label className="db fw6 lh-copy f6">First name</label>
	                		<input
	                  			className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	                  			type="text"
	                  			name="firstName"
	                  			id="firstName"
	                  			onChange={this.onFirstNameChange}
	                		/>
	              		</div>
	              		<div className="mt3">
	                		<label className="db fw6 lh-copy f6">Last name</label>
	                		<input
	                  			className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	                  			type="text"
	                  			name="lastName"
	                  			id="lastName"
	                  			onChange={this.onLastNameChange}
	                		/>
	              		</div>
	              		<div className="mv3">
	                		<label className="db fw6 lh-copy f6">Address</label>
	                		<input
	                  			className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	                  			type="text"
	                  			name="address"
	                  			id="address"
	                  			onChange={this.onAddressChange}
	                		/>
	              		</div>
	              		<div className="mv3">
	                		<label className="db fw6 lh-copy f6">Date of Birth</label>
	                		<input
	                  			className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	                  			type="date"
	                  			name="dateOfBirth"
	                  			id="dateOfBirth"
	                  			onChange={this.onDateOfBirthChange}
	                		/>
	              		</div>
	              		<div className="mv3">
	                		<label className="db fw6 lh-copy f6">National ID</label>
	                		<input
	                  			className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
	                  			type="text"
	                  			name="nationalId"
	                  			id="nationalId"
	                  			onChange={this.onNationalIdChange}
	                		/>
	              		</div>
	            	</fieldset>
	            	<div className="">
	              		<input
	                		onClick={this.onSubmitPatientRegistration}
	                		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
	                		type="submit"
	                		value="Submit"
	              		/>
	            	</div>
	          	</div>
	        	</main>
	      	</article>
	    );
	}
}

export default PatientRegistration;