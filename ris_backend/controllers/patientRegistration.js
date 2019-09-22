const handlePatientRegistration = (req, res, db) => {
	const { firstname, lastname, address, dateofbirth, nationalId } = req.body;
	if (!firstname || !lastname || !address || !dateofbirth || !nationalId) {
		return res.status(400).json('Incorrect form submission!');
	}
	db.transaction(trx => {
		trx.insert({
			firstname: firstname,
			lastname: lastname,
			address: address,
			dateofbirth: dateofbirth,
			nationalid: nationalId
		})
		.into('patients')
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.then(() => {
		res.status(200).json('Patient registered successfully!');
	})
	.catch(err => res.status(400).json('Unable to register the patient!'));
}

module.exports = {
  handlePatientRegistration: handlePatientRegistration
};