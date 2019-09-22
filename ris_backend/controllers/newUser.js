const handleNewUser = (req, res, db, bcrypt) => {
	const { name, role, username, password, retypedPassword } = req.body;
	if (!name || !role || !username || !password || !retypedPassword) {
		return res.status(400).json('Incorrect form submission!');
	}

	if (password !== retypedPassword) {
		return res.status(400).json('Passwords do not match!');
	}

	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			return res.status(400).json('Unable to calculate password hash!');
		}
		db.transaction(trx => {
			trx.insert({
				name: name,
				role: role,
				username: username,
				hash: hash
			})
			.into('users')
			.then(trx.commit)
			.catch(trx.rollback);
		})
		.then(() => {
			res.status(200).json('User registered successfully!');
		})
		.catch((err) => {
			res.status(400).json('Unable to register the user!');
		});
	});
}

module.exports = {
  handleNewUser: handleNewUser
};