const handleExaminations = (req, res, fs) => {
	fs.readFile('./examinations.json', 'utf8', (err, examinationsList) => {
    if (err) {
        return res.status(400).json('Could not find or read the examinations file!');
    }
    try {
        res.json(examinationsList);
    } catch (err) {
    	res.status(400).json('Could not parse JSON string!');
    }
	});
	
}

module.exports = {
  handleExaminations: handleExaminations
}