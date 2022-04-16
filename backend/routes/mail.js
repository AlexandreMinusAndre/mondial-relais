const express = require("express");
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');

app.use(express.json());

router.post("/mail", async (req, res) => {
	const {lastname, firstname, email, phone, subject, message} = req.body;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MAIL,
			pass: process.env.MAILPASS
		}
	});

	const mailOptions = {
		from: process.env.MAIL, // Mail du serveur
		to: process.env.ADMINMAIL, // Mail de réception
		subject : `Contact Mondial Relais - ${subject}`,
		html: `
			<style>
				*{
					margin: 0;
					padding: 0;
				}
			</style>
			<div>
				<p>Message en provenance du formulaire de contact de Mondial Relais :</p>
			</div>
			<div>
				${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}
			</div>
			<br>
			<hr>
			<br>
			<div>
				<p style="bold">${lastname} ${firstname}</p>
				<p style="bold">${email}</p>
				<p style="bold">${phone}</p>
			</div>
		`
	};
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) res.send(error);
		else res.send('Email sent: ' + info.response);
	});
});

module.exports = router;