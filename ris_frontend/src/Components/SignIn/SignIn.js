import React from 'react';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInUsername: '',
			signInPassword: ''
		}
	}

	onUsernameChange = (event) => {
		this.setState({ signInUsername: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username: this.state.signInUsername,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
			else {
				this.props.updateStatus(user);
			}
		})
		.catch(err => this.props.updateStatus("Could not connect to the server!"));
	}

	componentDidMount() {
    	fetch('http://localhost:3000/examinations')
    	.then(response => response.json())
    	.then(examinations => {
      		this.props.loadExaminations(JSON.parse(examinations));
    	})
    	.catch(err => this.updateStatus("Could not retrieve the list of examinations!"));
  	}

	render () {
		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
	  				<div className="measure">
	    				<fieldset id="signIn" className="ba b--transparent ph0 mh0">
	      					<legend className="f1 fw6 ph0 mh0">Sign In</legend>
	      					<div className="mt3">
	        					<label className="db fw6 lh-copy f6">Username</label>
	        					<input onChange={this.onUsernameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" />
	      					</div>
	      					<div className="mv3">
	        					<label className="db fw6 lh-copy f6">Password</label>
	        					<input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
	      					</div>
	    				</fieldset>
	    				<div className="">
	      					<input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
	    				</div>
	  				</div>
				</main>
			</article>
		);
	}
}

export default SignIn;