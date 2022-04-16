import axios from "axios";
// const PORT = process.env.PORT || 8080;

document.querySelector("form").addEventListener("submit", async (e) => {
	e.preventDefault();

	const mail = document.getElementsByName("Email")[0].value;
	const password = document.getElementsByName("Password")[0].value;
	try {
		await axios.post(`https://mondialrelais-back.herokuapp.com/api/login`, {mail, password}).then(({data}) => {
			localStorage.setItem('logToken', data);
			alert("Welcome to your account!")
		});
	} catch (err) {
		if (err.response.data.details === undefined) {
			return alert("Email ou mot de passe invalide.");
		};
		document.querySelector()(err.response.data.details[0].message);
	};
});