const imgImports = {
	"theme-light" : {
		theme : require("../img/theme-light.webp")
	},
	"theme-dark" : {
		theme : require("../img/theme-dark.webp")
	},
	"theme-green" : {
		theme : require("../img/theme-dark.webp")
	}
};
(() => {
	const themeButton = document.querySelector(".theme-changer");
	const logo = document.querySelector(".logo");
	
	// function to set a given theme/color-scheme
	const setTheme = (themeName) => {
		localStorage.setItem('theme', themeName);
		document.documentElement.className = themeName;
		// logo.style.backgroundImage = `url(${imgImports[themeName].logo.replaceAll(window.location.origin + "/", "")})`;
		themeButton.style.backgroundImage = `url(${imgImports[themeName].theme.replaceAll(window.location.origin + "/", "")})`;
	}
	// function to toggle between light and dark theme
	const toggleTheme = () => {
		if (localStorage.getItem('theme') === 'theme-dark') {
			setTheme('theme-light');
		} else setTheme('theme-dark');
	}
	
	themeButton.addEventListener("click", toggleTheme);
	
	// Immediately invoked function to set the theme on initial load
	(() => {
		if (localStorage.getItem('theme') === 'theme-dark') setTheme('theme-dark')
		else setTheme('theme-light')
	})();
})();
