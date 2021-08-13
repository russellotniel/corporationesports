const scriptURL = "https://script.google.com/macros/s/AKfycbwE6IxWPlixN4l_deEUEE2vamFTCDfM2npIE_78LqwJf79Dv9H9eXFezJZ_fqvTCI4E/exec";
const form = document.forms["registrationForm"];
const btnRegister = document.querySelector(".btnRegister");
const loading = document.querySelector(".loading");
const myAlert = document.querySelector(".myAlert");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	//Loading muncul, submit ilang
	var teamPhoneNumber = form["teamPhoneNumber"].value;
	var player1IGN = form["player1IGN"].value;
	var player2IGN = form["player2IGN"].value;
	var player3IGN = form["player3IGN"].value;
	var player4IGN = form["player4IGN"].value;
	var player5IGN = form["player5IGN"].value;
	var player6IGN = form["player6IGN"].value;

	if (player5IGN !== "" && player6IGN !== "") {
		var validationIGNs = checkIGN6(player1IGN, player2IGN, player3IGN, player4IGN, player5IGN, player6IGN);
	} else if (player5IGN !== "") {
		var validationIGNs = checkIGN5(player1IGN, player2IGN, player3IGN, player4IGN, player5IGN);
	} else {
		var validationIGNs = checkIGN4(player1IGN, player2IGN, player3IGN, player4IGN);
	}

	var validationPhone = checkPhone(teamPhoneNumber);

	if (validationPhone && validationIGNs) {
		loading.classList.toggle("d-none");
		btnRegister.classList.toggle("d-none");
		fetch(scriptURL, { method: "POST", body: new FormData(form) })
			.then((response) => {
				// Loading ilang, submit muncul
				loading.classList.toggle("d-none");
				btnRegister.classList.toggle("d-none");
				// Alert muncul
				myAlert.classList.toggle("d-none");
				//Reset Form
				form.reset();
				console.log("Success!", response);
			})
			.catch((error) => console.error("Error!", error.message));
	} else {
		alert("Silahkan isi ulang form ini.");
		form.reset();
	}
});

function checkPhone(phone) {
	if (phone.startsWith("08", 0)) {
		if (phone.length == 10 || phone.length == 12) {
			return true;
		} else {
			alert("Nomor HP harus 10 atau 12 angka.");
			return false;
		}
	} else {
		alert("Nomor HP harus dimulai dengan '08'");
		return false;
	}
}

function checkIGN4(player1IGN, player2IGN, player3IGN, player4IGN) {
	const IGNs = [player1IGN, player2IGN, player3IGN, player4IGN];
	for (let i = 0; i < IGNs.length; i++) {
		if (IGNs[i] === IGNs[i + 1]) {
			alert("IGN tidak boleh sama. Silahkan diganti. 4");
			break;
		}
	}
}

function checkIGN5(player1IGN, player2IGN, player3IGN, player4IGN, player5IGN) {
	const IGNs = [player1IGN, player2IGN, player3IGN, player4IGN, player5IGN];
	for (let i = 0; i < IGNs.length; i++) {
		if (IGNs[i] === IGNs[i + 1]) {
			alert("IGN tidak boleh sama. Silahkan diganti. 5");
			break;
		}
	}
}

function checkIGN6(player1IGN, player2IGN, player3IGN, player4IGN, player5IGN, player6IGN) {
	const IGNs = [player1IGN, player2IGN, player3IGN, player4IGN, player5IGN, player6IGN];
	for (let i = 0; i < IGNs.length; i++) {
		if (IGNs[i] === IGNs[i + 1]) {
			alert("IGN tidak boleh sama. Silahkan diganti. 6");
			break;
		}
	}
}
