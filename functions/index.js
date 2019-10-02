const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebaseconfig);

const db = admin.firestore();

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

exports.webApi = functions.https.onRequest(main);

app.post('/leads', async (req, res) => {
    try {
        const contact = {
            name: req.body['name'],
            email: req.body['email'],
            message: req.body['message']
        }

        console.log(req.body)

        const leadsRef = await db.collection("leads").add(contact);
    } catch (error) {
        res.status(400).send('Email is invalid please edit.')
    }
})
