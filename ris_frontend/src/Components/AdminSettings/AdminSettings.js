import React from 'react';

class AdminSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: {
				name: '',
				role: 'doctor',
				username: '',
				password: '',
				retypedPassword: '',
			},
			userPassword: {
				currentPassword: '',
				newPassword: '',
				retypedNewPassword: ''
			}

		}
	}

	onNewUserNameChange = (event) => {
		this.setState({newUser: {
			name: event.target.value,
			role: this.state.newUser.role,
			username: this.state.newUser.username,
			password: this.state.newUser.password,
			retypedPassword: this.state.newUser.retypedPassword
			}
		});
	}

	onNewUserRoleChange = (event) => {
		this.setState({newUser: {
			name: this.state.newUser.name,
			role: event.target.value,
			username: this.state.newUser.username,
			password: this.state.newUser.password,
			retypedPassword: this.state.newUser.retypedPassword
			}
		});
	}

	onNewUserUsernameChange = (event) => {
		this.setState({newUser: {
			name: this.state.newUser.name,
			role: this.state.newUser.role,
			username: event.target.value,
			password: this.state.newUser.password,
			retypedPassword: this.state.newUser.retypedPassword
			}
		});
	}

	onNewUserPasswordChange = (event) => {
		this.setState({newUser: {
			name: this.state.newUser.name,
			role: this.state.newUser.role,
			username: this.state.newUser.username,
			password: event.target.value,
			retypedPassword: this.state.newUser.retypedPassword
			}
		});
	}

	onNewUserRetypedPasswordChange = (event) => {
		this.setState({newUser: {
			name: this.state.newUser.name,
			role: this.state.newUser.role,
			username: this.state.newUser.username,
			password: this.state.newUser.password,
			retypedPassword: event.target.value
			}
		});
	}

	onUserCurrentPasswordChange = (event) => {
		this.setState({userPassword: {
			currentPassword: event.target.value,
			newPassword: this.state.userPassword.newPassword,
			retypedNewPassword: this.state.userPassword.retypedNewPassword
			}
		});
	}

	onUserNewPasswordChange = (event) => {
		this.setState({userPassword: {
			currentPassword: this.state.userPassword.currentPassword,
			newPassword: event.target.value,
			retypedNewPassword: this.state.userPassword.retypedNewPassword
			}
		});
	}

	onUserRetypedNewPasswordChange = (event) => {
		this.setState({userPassword: {
			currentPassword: this.state.userPassword.currentPassword,
			newPassword: this.state.userPassword.newPassword,
			retypedNewPassword: event.target.value
			}
		});
	}

	onSubmitNewUser = () => {
		if (!this.state.newUser.name || !this.state.newUser.role || !this.state.newUser.username || !this.state.newUser.password || !this.state.newUser.retypedPassword){
			this.props.updateStatus("User registration fields should not be empty!")
		} else if (this.state.passwordUser !== this.state.retypePasswordUser) {
				this.props.updateStatus("User passwords do not match!")
			} else {
					fetch('http://localhost:3000/newUser', {
						method: 'post',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							name: this.state.newUser.name,
							role: this.state.newUser.role,
							username: this.state.newUser.username,
							password: this.state.newUser.password,
							retypedPassword: this.state.newUser.retypedPassword
						})
					})
					.then(response => response.json())
					.then(res => {
						this.props.updateStatus(res);
					})
					.catch(err => this.props.updateStatus("Failed sending the data to the server!"));
				}
	}

	onSubmitPasswordChange = () => {
		fetch('http://localhost:3000/changePassword', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: this.props.id,
				currentPassword: this.state.userPassword.currentPassword,
				newPassword: this.state.userPassword.newPassword,
				retypedNewPassword: this.state.userPassword.retypedNewPassword
			})
		})
		.then(response => response.json())
		.then(res => {
			this.props.updateStatus(res);
		})
		.catch(err => this.props.updateStatus("Failed sending the data to the server!"));
	}

	render() {
		if (this.props.role === "admin")	{
			return (
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
		    		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		        		<main className="pa4 black-80">
		        			<div className="measure">
		            			<fieldset id="newUser" className="ba b--transparent ph0 mh0">
		              				<legend className="f1 fw6 ph0 mh0">New User</legend>
		              				<div className="mt3">
		                				<label className="db fw6 lh-copy f6">Name</label>
		                				<input
		                  					className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  					type="text"
		                  					name="newUserName"
		                  					id="newUserName"
		                  					onChange={this.onNewUserNameChange}
		                				/>
		              				</div>
		              				<div className="mt3">
		                				<label className="db fw6 lh-copy f6">Role</label>
		                				<select value={this.state.newUser.role} onChange={this.onNewUserRoleChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="newUserRole" id="newUserRole">
		                  					<option value="doctor">Doctor</option>
		                  					<option value="nurse">Nurse</option>
		                  					<option value="radiographer">Radiographer</option>
		                  					<option value="admin">Admin</option>
		                				</select>
		              				</div>
		              				<div className="mv3">
		                				<label className="db fw6 lh-copy f6">Username</label>
		                				<input
		                  					className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  					type="text"
		                  					name="newUserUsername"
		                  					id="newUserUsername"
		                  					onChange={this.onNewUserUsernameChange}
		                				/>
		              				</div>
		              				<div className="mv3">
		                				<label className="db fw6 lh-copy f6">Password</label>
		                				<input
		                  					className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  					type="password"
		                  					name="newUserPassword"
		                  					id="newUserPassword"
		                  					onChange={this.onNewUserPasswordChange}
		                				/>
		             				</div>
		              				<div className="mv3">
		                				<label className="db fw6 lh-copy f6">Retype Password</label>
		                				<input
		                 					className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  					type="password"
		                  					name="newUserRetypedPassword"
		                  					id="newUserRetypedPassword"
		                  					onChange={this.onNewUserRetypedPasswordChange}
		                				/>
		              				</div>
		              				<div className="">
			            				<input
				            				onClick={this.onSubmitNewUser}
				            				className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				            				type="submit"
				            				value="Submit"
			            				/>
		              				</div>
		            			</fieldset>
		           			</div>
		        		</main>
		    		</article>

		    		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		        		<main className="pa4 black-80">
		          			<div className="measure">
		            			<fieldset id="changePassword" className="ba b--transparent ph0 mh0">
		              				<legend className="f1 fw6 ph0 mh0">Change Password</legend>
		              				<div className="mt3">
		                				<label className="db fw6 lh-copy f6">Current Password</label>
		                				<input
		                  					className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  					type="password"
		                  					name="currentPassword"
		                  					id="currentPassword"
		                  					onChange={this.onUserCurrentPasswordChange}
		                				/>
		              				</div>
		              				<div className="mt3">
		                				<label className="db fw6 lh-copy f6">New Password</label>
		                				<input
		                  					className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  					type="password"
		                  					name="newPassword"
		                  					id="newPassword"
		                  					onChange={this.onUserNewPasswordChange}
		                				/>
		              				</div>
		              				<div className="mt3">
		                				<label className="db fw6 lh-copy f6">Retype New Password</label>
		                				<input
		                  					className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  					type="password"
		                  					name="retypedNewPassword"
		                  					id="retypedNewPassword"
		                  					onChange={this.onUserRetypedNewPasswordChange}
		                				/>
		              				</div>
		              				<div className="">
			            				<input
				            				onClick={this.onSubmitPasswordChange}
				            				className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				            				type="submit"
				            				value="Submit"
			            				/>
		              				</div>
		            			</fieldset>
		          			</div>
		        		</main>
		      		</article>
		      	</div>
	    	);
		} else {
			return (
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		        	<main className="pa4 black-80">
		          		<div className="measure">
		            		<fieldset id="changePassword" className="ba b--transparent ph0 mh0">
		              			<legend className="f1 fw6 ph0 mh0">Change Password</legend>
		              			<div className="mt3">
		                			<label className="db fw6 lh-copy f6">Current Password</label>
		                			<input
		                  				className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  				type="password"
		                  				name="currentPassword"
		                  				id="currentPassword"
		                  				onChange={this.onUserCurrentPasswordChange}
		                			/>
		              			</div>
		              			<div className="mt3">
		                			<label className="db fw6 lh-copy f6">New Password</label>
		                			<input
		                  				className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  				type="password"
		                  				name="newPassword"
		                  				id="newPassword"
		                  				onChange={this.onUserNewPasswordChange}
		                			/>
		              			</div>
		              			<div className="mt3">
		                			<label className="db fw6 lh-copy f6">Retype New Password</label>
		                			<input
		                  				className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
		                  				type="password"
		                  				name="retypedNewPassword"
		                  				id="retypedNewPassword"
		                  				onChange={this.onUserRetypedNewPasswordChange}
		                			/>
		              			</div>
		              			<div className="">
			            			<input
				            			onClick={this.onSubmitPasswordChange}
				            			className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				            			type="submit"
				            			value="Submit"
			            			/>
		              			</div>
		            		</fieldset>
		          		</div>
		        	</main>
		      	</article>
			);
		}
	}
}

export default AdminSettings;