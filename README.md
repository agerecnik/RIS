# RIS
Open Source Radiology Information System (in development)

It works with dcm4chee 2.8.13 (haven not been tested with other versions). Working functions: adding a new patient, searching for a patient, adding a new user, sending a radiology order to a PACS server's (dcm4chee) modality worklist and cancelling an order that is on a modality worklist.

To test development build you need to install nodejs (https://nodejs.org/en/) and postgreSQL 10 (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). When installing postgreSQL, use username 'postgres' and password 'admin'. If you use different username and/or password you have to edit lines 23 and 24 in server.js in ris_backend folder. If your dcm4chee server is not running on localhost, change 'localhost' on line 30 in server.js to appropriate IP address. In examinations.json in ris_backend folder you can define your own radiology examinations. Backend runs on port 3000.

Connect to the postgreSQL database with command 'psql -U postgres' and create new database named 'ris' (CREATE DATABASE ris;). Connect to the newly created database by using command '\c ris;'.

Create the following tables:
CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, name TEXT NOT NULL, role VARCHAR(50) NOT NULL, username VARCHAR(50) UNIQUE NOT NULL, hash VARCHAR(100) NOT NULL);
CREATE TABLE patients(id SERIAL PRIMARY KEY NOT NULL, firstname TEXT NOT NULL, lastname TEXT NOT NULL, address TEXT NOT NULL, dateofbirth DATE NOT NULL, nationalid TEXT UNIQUE NOT NULL);
CREATE TABLE orders(id SERIAL PRIMARY KEY NOT NULL, examination TEXT NOT NULL, orderdate DATE NOT NULL DEFAULT CURRENT_DATE, patientid INTEGER NOT NULL REFERENCES patients);

Insert default user:
INSERT INTO users(name, role, username, hash) VALUES('admin', 'admin', 'admin', '$2b$10$z0TYT5R4sHL.ldFqpjJ5a.Y6DKx14E66O6jZVXrqjkYxmCUVgpc/a');

After completing the steps above cd into ris_backend and run command npm install. Then run command npm start to start the backend. Do the same for the frontend (cd ris_frontend, npm install, npm start). When starting up frontend you will be asked if it is okay to run it on another port (because 3000 is used by the backend).

Username: admin, password: admin123
