const handleSendRadiologyOrder = (req, res, db, hl7, hl7Client) => {
	const { examination, id, firstname, lastname, address, dateofbirth, nationalId } = req.body;
	if(!examination || !id || !firstname || !lastname || !dateofbirth || !nationalId) {
		return res.status(400).json('Incorrect form submission!');
	}
	db.transaction(trx => {
		trx.insert({
			examination: examination.codeMeaning,
			patientid: id
		})
		.into('orders')
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.then(() => {
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
		)

		msg.addSegment(
		    "PID",
		    "",
		    "1",
		    [nationalId, "", "", "RIS"], //internal id (required), component 1 = id, component 4 = issuer of patient id
		    "",
		    [lastname, firstname],
		    "",
		    dateofbirth.replace(/-/g, '') //removes all '-'
		)

		msg.addSegment(
		    "PV1",
		    "",
		    "RAD",
		    "", "", "", "",
		    ["REF_PHYS_ID", "REF_PHYS_FIRST", "REF_PHYS_LAST"],
		    ["", "ReferringPhysLast", "ReferringPhysFirst"]
		);

	 	db('orders').max('id')
		.then((id) => {
			msg.addSegment(
				"ORC",
				"NW",
				"ORDER-" + id[0].max, //placer order number
				"ORDER-" + id[0].max, //filler order number
				"", "", "",
				["", "", "", ""]
			)

			msg.addSegment(
				"OBR",
				"ORDER-" + id[0].max, //placer order number
				"ORDER-" + id[0].max, //filler order number
				"",
				["", "", "", examination.codeValue, examination.codeMeaning, examination.codingSchemeDesignator], //code value, code meaning, coding scheme designator
				"", "", "", "", "", "", "", "", "", "", "", "", "",
				"ORDER-" + id[0].max, //accession number
				"ORDER-" + id[0].max, //requsted procedure id
				"ORDER-" + id[0].max, //scheduled procedure step id
				"", "", "",
				"US",
				"", "", "", "", "", "", "", "", "",
				"PERFORMING_TECH"
			)

			msg.addSegment(
				"ZDS",
				["1.2.4.0.13.1.432252867." + id[0].max + ".1", "AETitle", "StationName"]
			);

			console.log('******sending message*****');
			hl7Client.send(msg, (err, ack) => {
				if (err) {
					return res.status(400).json('No response received from the PACS server!');
				}
				else if (ack) {
					console.log('******ack received*****');
					console.log(ack.log());
					res.status(200).json('Order sent!');
				}
			});
		})
		.catch(err => res.status(400).json('Order could not be sent!'));
	})
	.catch(err => res.status(400).json('Unable to register the order!'));
}

module.exports = {
  handleSendRadiologyOrder: handleSendRadiologyOrder
}