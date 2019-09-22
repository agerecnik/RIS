import React from 'react';

class SendRadiologyOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examination: {},
			order: '',
			patientOrders: []
		};
	}

	onExaminationChange = (event) => {
		for (let i = 0; i < this.props.examinationsList.length; i++) {
			if (event.target.value === this.props.examinationsList[i].codeValue) {
				this.setState({ examination: this.props.examinationsList[i] });
			}
		}
	}

	onOrderChange = (event) => {
		this.setState({ order: event.target.value });

	}

	onSubmitRadiologyOrder = () => {
		fetch('http://localhost:3000/sendRadiologyOrder', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				examination: this.state.examination,
				id: this.props.id,
				firstname: this.props.firstname,
				lastname: this.props.lastname,
				address: this.props.address,
				dateofbirth: this.props.dateofbirth,
				nationalId: this.props.nationalId
			})
		})
		.then(response => response.json())
		.then(res => {
			this.props.onRouteChange('home');
			this.props.onRouteChange('sendradiologyorders');
			this.props.updateStatus(res);
		})
	}

	onCancelRadiologyOrder = () => {
		fetch('http://localhost:3000/cancelRadiologyOrder', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				order: this.state.order,
				firstname: this.props.firstname,
				lastname: this.props.lastname,
				nationalId: this.props.nationalId
			})
		})
		.then(response => response.json())
		.then(res => {
			this.props.onRouteChange('home');
			this.props.onRouteChange('sendradiologyorders');
			this.props.updateStatus(res);
		})
		.catch(err => this.props.updateStatus("Could not connect to the server!"));
	}

	componentDidMount() {
		fetch('http://localhost:3000/patientOrders', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				nationalId: this.props.nationalId
			})
		})
		.then(response => response.json())
		.then(orders => {
			if (Array.isArray(orders) && orders.length > 0) {
				this.setState({ patientOrders: orders });
				this.setState({ order: orders[0].id });
			}
			else {
				this.props.updateStatus(orders);
			}
		})
		.catch(err => this.props.updateStatus("Could not connect to the server!"));

		if (this.props.examinationsList.length > 0) {
			this.setState({ examination: this.props.examinationsList[0] });
		}
		
	}

	render() {
		let patientOrdersList = [];
		if (this.state.patientOrders.length > 0) {
			patientOrdersList = this.state.patientOrders.map((order, i) => {
				return (
					<option key={i} value={order.id}>{order.examination} {order.orderdate.substring(0,10)}</option>
				)
			}, this);
		}

		let examinationsList = [];
		if(this.props.examinationsList.length > 0) {
			examinationsList = this.props.examinationsList.map((examination, i) => {
				return (
					<option key={i} value={examination.codeValue}>{examination.codeMeaning}</option>
				)
			}, this);
		}

		return (
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
	  					<div className="measure">
	    					<fieldset id="sendRadiologyOrder" className="ba b--transparent ph0 mh0">
	      						<legend className="f1 fw6 ph0 mh0">Examination</legend>
	      						<div className="mt3">
	        						<label className="db fw6 lh-copy f6">Choose an examination</label>
	        						<select onChange={this.onExaminationChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="examination"  id="examination">
	        							{examinationsList}
	        						</select>
	      						</div>
	    					</fieldset>
	    					<div className="">
	      						<input onClick={this.onSubmitRadiologyOrder} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit" />
	    					</div>
	    				</div>
					</main>
				</article>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
	  					<div className="measure">
	    					<fieldset id="cancelRadiologyOrder" className="ba b--transparent ph0 mh0">
	      						<legend className="f1 fw6 ph0 mh0">Cancellation</legend>
	      						<div className="mt3">
	        						<label className="db fw6 lh-copy f6">Choose an order to cancel</label>
	        						<select onChange={this.onOrderChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="examination"  id="examination">
	        							{patientOrdersList}
	        						</select>
	      						</div>
	    					</fieldset>
	    					<div className="">
	      						<input onClick={this.onCancelRadiologyOrder} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit" />
	    					</div>
	  					</div>
					</main>
				</article>
			</div>
		);
	}
}

export default SendRadiologyOrder;