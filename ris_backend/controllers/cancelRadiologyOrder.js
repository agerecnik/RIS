const handleCancelRadiologyOrder = (req, res, db, hl7, hl7Client) => {
	const { order, firstname, lastname, nationalId } = req.body;
	if(!order || !firstname || !lastname || !nationalId) {
		return res.status(400).json('Incorrect form submission!');
	}

	const msg = new hl7.Message(
	    "SendingApp",
	    "SendingFac",
	    "ReceivingApp",
	    "ReceivingFac",
	    "", //date/time of message
	    "",
	    ["ORM", "O01", "ORM_O01"], //message type (required)
	    "168715", //message control id (required)
	    "P", // processing id (required)
	    "2.5" //version id (required)
	);

	msg.addSegment(
	    "PID",
	    "",
	    "1",
	    [nationalId, "", "", "RIS"], //internal id (required), component 1 = id, component 4 = issuer of patient id
	    "",
	    [lastname, firstname],
	);

	msg.addSegment(
		"ORC",
		"CA",
		"ORDER-" + order, //placer order number
		"ORDER-" + order, //filler order number
	);

	msg.addSegment(
		"OBR",
		"ORDER-" + order, //placer order number
		"ORDER-" + order, //filler order number
		"",
		["", "", "", "", "", ""], //code value, code meaning, coding scheme designator
		"", "", "", "", "", "", "", "", "", "", "", "", "",
		"ORDER-" + order, //accession number
		"ORDER-" + order, //requsted procedure id
		"ORDER-" + order, //scheduled procedure step id
	);

	console.log('******sending message*****');
	hl7Client.send(msg, (err, ack) => {
		if (err) {
			return res.status(400).json('No response received from the PACS server!');
		}
		else if (ack) {
			console.log('******ack received*****');
			console.log(ack.log());
			db('orders')
			.where('id', '=', order)
			.del()
			.then(() => {
				res.status(200).json('Order cancelled successfully!');
			})
			.catch(err => res.status(400).json('Order could not be deleted from the database!'));
		}
	});
}

module.exports = {
  handleCancelRadiologyOrder: handleCancelRadiologyOrder
}