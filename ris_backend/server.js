const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const hl7 = require('simple-hl7');
const fs = require('fs');

const signin = require('./controllers/signin');
const patientFind = require('./controllers/patientFind');
const patientRegistration = require('./controllers/patientRegistration');
const sendRadiologyOrder = require('./controllers/sendRadiologyOrder');
const cancelRadiologyOrder = require('./controllers/cancelRadiologyOrder');
const patientOrders = require('./controllers/patientOrders');
const examinations = require('./controllers/examinations');
const newUser = require('./controllers/newUser');
const changePassword = require('./controllers/changePassword');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'ris'
  }
});

const app = express();
const hl7Client = hl7.Server.createTcpClient('localhost', 2575);

app.use(cors());
app.use(bodyParser.json());

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
app.post('/patientFind', (req, res) => { patientFind.handlePatientFind(req, res, db) });
app.post('/patientRegistration', (req, res) => { patientRegistration.handlePatientRegistration(req, res, db) });
app.post('/sendRadiologyOrder', (req, res) => { sendRadiologyOrder.handleSendRadiologyOrder(req, res, db, hl7, hl7Client) });
app.post('/cancelRadiologyOrder', (req, res) => { cancelRadiologyOrder.handleCancelRadiologyOrder(req, res, db, hl7, hl7Client) });
app.post('/patientOrders', (req, res) => { patientOrders.handlePatientOrders(req, res, db) });
app.get('/examinations', (req, res) => { examinations.handleExaminations(req, res, fs) });
app.post('/newUser', (req, res) => { newUser.handleNewUser(req, res, db, bcrypt) });
app.post('/changePassword', (req, res) => { changePassword.handleChangePassword(req, res, db, bcrypt) });

app.listen(3000, () => {
  console.log('app is running on port 3000');
})
