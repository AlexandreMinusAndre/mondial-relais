import axios from "axios";
const PORT = process.env.PORT || 8080;

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const lastname = document.getElementsByName("Lastname")[0].value;
	const firstname = document.getElementsByName("Firstname")[0].value;
	const email = document.getElementsByName("Email")[0].value;
	const phone = document.getElementsByName("Phone")[0].value;
	const subject = document.getElementsByName("Subject")[0].value;
	const message = document.getElementsByName("Message")[0].value;

	try {
		await axios.post(`https://mondialrelais-back.herokuapp.com//api/mail`, {lastname, firstname, email, phone, subject, message}).then(({data}) => {
			console.log(data);
			form.innerHTML = `
				<div class="response-box">
					<p class="success">Votre message est en route.</p>
					<p>Merci d'avoir pris le temps de nous écrire.</p>
					<p>Nous reviendrons vers vous dès que possible.</p>
					<a href="/">Cliquez ici pour revenir à l'accueil</a>
					<div class="flying-envelope success"></div>
				</div>
			`;
		});
	} catch (err) {
		console.dir(err);
		form.innerHTML = `
			<div class="response-box">
				<p class="error">Votre message n'a pas pu être envoyé.</p>
				<a href="/contact">Cliquez ici pour réessayer</a>
				<code>${err.message}</code>
			</div>
		`;
	};
});