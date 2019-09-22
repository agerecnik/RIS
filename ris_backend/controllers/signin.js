const handleSignin = (req, res, db, bcrypt) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json('Incorrect form submission!');
  }
  db.select('username', 'hash').from('users')
    .where('username', '=', username)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('username', '=', username)
          .then(user => {
            delete user[0].username;
            delete user[0].hash;
            res.json(user[0])
          })
          .catch(err => res.status(400).json('Unable to get the user!'))
      }
      else {
        res.status(400).json('Wrong credentials!')
      }
    })
    .catch(err => res.status(400).json('Unable to get the user!'))
}

module.exports = {
  handleSignin: handleSignin
}