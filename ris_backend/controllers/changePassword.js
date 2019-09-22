const handleChangePassword = (req, res, db, bcrypt) => {
	const {id, currentPassword, newPassword, retypedNewPassword } = req.body;
	if (!id, !currentPassword || !newPassword || !retypedNewPassword) {
		return res.status(400).json('Incorrect form submission!');
	}

	db.select('hash').from('users')
    .where('id', '=', id)
    .then(data => {
      	const isValid = bcrypt.compareSync(currentPassword, data[0].hash);
      	if (isValid) {
      		if (newPassword !== retypedNewPassword) {
				return res.status(400).json('Passwords do not match!');
			}
			bcrypt.hash(newPassword, 10, (err, hash) => {
				if (err) {
					return res.status(400).json('Unable to calculate a password hash!');
				}
				db('users')
				.where('id', '=', id)
				.update({
					hash: hash
				})
				.then(() => {
					res.status(200).json('Password changed successfully!');
				})
				.catch(err => res.status(400).json('Unable to change the password!'));
			})
      	}
      	else {
        	res.status(400).json('Wrong credentials!')
      	}
    })
    .catch(err => res.status(400).json('Error changing the password!'));
}

module.exports = {
  handleChangePassword: handleChangePassword
};