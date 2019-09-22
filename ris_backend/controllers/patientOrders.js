const handlePatientOrders = (req, res, db) => {
	const { nationalId } = req.body;
	if(!nationalId) {
		return res.status(400).json('No patient id was sent!');
	}
	return db.select('orders.id', 'examination', 'orderdate', 'firstname', 'lastname', 'dateofbirth', 'nationalid').from('orders')
	    .innerJoin('patients', 'orders.patientid', 'patients.id')
	    .where('nationalid', '=', nationalId)
	    .then(orders => {
	    	res.json(orders);
	    })
	    .catch(err => res.status(400).json('Error getting the orders!'));
}

module.exports = {
  handlePatientOrders: handlePatientOrders
}