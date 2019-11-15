console.log("JS Loaded");

const testFire = () => {
	console.log("gotem");
};

var writeData = () => {
	firebase.database().ref("user").set({
		name: document.getElementById("name").value,
		age: document.getElementById("sid").value,
	});
}
const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", writeData());
