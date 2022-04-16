(() => {
	const burger = document.querySelector("#navbar .burger");
	const cross = document.querySelector("#overlay .cross");
	const overlay = document.querySelector("#overlay");
	const showOverlay = () => {
		burger.style.setProperty("display", "none");
		cross.style.setProperty("display", "flex");
		overlay.style.setProperty("display", "flex");
	}
	
	const hideOverlay = () => {
		burger.style.setProperty("display", "flex");
		cross.style.setProperty("display", "none");
		overlay.style.setProperty("display", "none");
	}
	
	burger.addEventListener("click", showOverlay);
	overlay.addEventListener("click", hideOverlay);
	cross.addEventListener("click", hideOverlay);
})();