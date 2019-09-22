const handlePatientFind = (req, res, db) => {
  const { nationalId } = req.body;
  if(!nationalId) {
    return res.status(400).json('Incorrect form submission!');
  }
  return db.select('*').from('patients')
    .where('nationalid', '=', nationalId)
    .then(patient => {
      if (patient.length){
        res.json(patient[0]);
      }
      else {
        res.status(400).json('Patient does not exist!');
      }
    })
    .catch(err => res.status(400).json('Error getting the patient or the patient does not exist!'));
}

module.exports = {
  handlePatientFind: handlePatientFind
}