import axios from "axios";
const PORT = process.env.PORT || 8080;

document.querySelector("form").addEventListener("submit", async (e) => {
	e.preventDefault();

	const mail = document.getElementsByName("Email")[0].value;
	const password = document.getElementsByName("Password")[0].value;
	const password2 = document.getElementsByName("Password2")[0].value;

	if (password !== password2){
		return alert("Les mots de passe ne correspondent pas.");
	}

	try {
		await axios.post(`https://mondialrelais-back.herokuapp.com/api/createAccount`, { mail, password }).then(({data}) => {
			localStorage.setItem('registerToken', data.token);
			return alert("Account successfully created !");
		});
	} catch (err) {
		if (err.response.data.details === undefined) {
			return alert("Email ou mot de passe invalide.");
		};
		alert(err.response.data.details[0].message);
	};
});