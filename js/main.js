const scriptURL = "https://script.google.com/macros/s/AKfycbwE6IxWPlixN4l_deEUEE2vamFTCDfM2npIE_78LqwJf79Dv9H9eXFezJZ_fqvTCI4E/exec";
const form = document.forms["registrationForm"];
const btnRegister = document.querySelector(".btnRegister");
const loading = document.querySelector(".loading");
const paymentAlert = document.querySelector(".paymentAlert");
const teamName = document.getElementById("teamName");
const teamPhoneNumber = document.getElementById("teamPhoneNumber");
const player1IGN = document.getElementById("player1IGN");
const player2IGN = document.getElementById("player2IGN");
const player3IGN = document.getElementById("player3IGN");
const player4IGN = document.getElementById("player4IGN");
const player5IGN = document.getElementById("player5IGN");
const player6IGN = document.getElementById("player6IGN");
const redirectError = document.querySelector(".redirectError");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Get all the values
	let teamNameValue = teamName.value.trim();
	let teamPhoneNumberValue = teamPhoneNumber.value.trim();
	let player1IGNValue = player1IGN.value.trim();
	let player2IGNValue = player2IGN.value.trim();
	let player3IGNValue = player3IGN.value.trim();
	let player4IGNValue = player4IGN.value.trim();
	let player5IGNValue = player5IGN.value.trim();
	let player6IGNValue = player6IGN.value.trim();

	// Check primary IGNs has value and maximum length
	let validationIGN1 = checkPrimaryIGN(player1IGNValue, player1IGN);
	let validationIGN2 = checkPrimaryIGN(player2IGNValue, player2IGN);
	let validationIGN3 = checkPrimaryIGN(player3IGNValue, player3IGN);
	let validationIGN4 = checkPrimaryIGN(player4IGNValue, player4IGN);
	let validationIGN5 = checkSecondaryIGN(player5IGNValue);
	let validationIGN6 = checkSecondaryIGN(player6IGNValue);

	// If 5 and 6 has inputs but deleted.
	if (!validationIGN5) {
		resetClass(player5IGN);
	}
	if (!validationIGN6) {
		resetClass(player6IGN);
	}

	// Primary Validations
	let validationIGNs = false;
	let validationTeamName = checkTeamName(teamNameValue);
	let validationPhone = checkPhone(teamPhoneNumberValue);

	// Primary IGNs validations
	if (validationIGN1 && validationIGN2 && validationIGN3 && validationIGN4) {
		// Check for length 3 - 30
		let IGN1Details = checkIGNDetails(player1IGNValue, player1IGN);
		let IGN2Details = checkIGNDetails(player2IGNValue, player2IGN);
		let IGN3Details = checkIGNDetails(player3IGNValue, player3IGN);
		let IGN4Details = checkIGNDetails(player4IGNValue, player4IGN);

		//Secondary IGNs validations
		if (validationIGN5 && validationIGN6) {
			// Check for length 3 - 30
			let IGN5Details = checkIGNDetails(player5IGNValue, player5IGN);
			let IGN6Details = checkIGNDetails(player6IGNValue, player6IGN);

			//Set array for values and duplicates
			let array = [player1IGNValue, player2IGNValue, player3IGNValue, player4IGNValue, player5IGNValue, player6IGNValue];

			// Check for duplicates
			let duplicates = findDuplicates(array);

			// Validation to check if 5 and 6 are valid
			let gate5n6 = false;

			if (duplicates.length !== 0) {
				// Set all to success first
				for (let i = 0; i < array.length; i++) {
					setSuccessFor(eval("player" + [i + 1] + "IGN"));
				}
				// Set the duplicates to error
				for (let i = 0; i < duplicates.length; i++) {
					for (let j = 0; j < array.length; j++) {
						if (duplicates[i] === array[j]) {
							let ign = "player" + (j + 1) + "IGN";
							setErrorFor(eval(ign), "IGN tidak boleh sama.");
						}
					}
				}
			} else {
				// If there are no duplicates, set all to success and continue
				for (let i = 0; i < array.length; i++) {
					setSuccessFor(eval("player" + [i + 1] + "IGN"));
				}
				gate5n6 = true;
			}

			if (IGN1Details && IGN2Details && IGN3Details && IGN4Details && IGN5Details && IGN6Details && gate5n6) {
				validationIGNs = true;
			} else {
				// Send Error message
				checkIGNDetails(player1IGNValue, player1IGN);
				checkIGNDetails(player2IGNValue, player2IGN);
				checkIGNDetails(player3IGNValue, player3IGN);
				checkIGNDetails(player4IGNValue, player4IGN);
				checkIGNDetails(player5IGNValue, player5IGN);
				checkIGNDetails(player6IGNValue, player6IGN);
			}
		} else if (validationIGN5) {
			// Check for length 3 - 30
			let IGN5Details = checkIGNDetails(player5IGNValue, player5IGN);

			//Set array for values and duplicates
			let array = [player1IGNValue, player2IGNValue, player3IGNValue, player4IGNValue, player5IGNValue];

			// Check for duplicates
			let duplicates = findDuplicates(array);

			// Validation to check if 5 is valid
			let gate5 = false;

			if (duplicates.length !== 0) {
				// Set all to success first
				for (let i = 0; i < array.length; i++) {
					setSuccessFor(eval("player" + [i + 1] + "IGN"));
				}
				// Set the duplicates to error
				for (let i = 0; i < duplicates.length; i++) {
					for (let j = 0; j < array.length; j++) {
						if (duplicates[i] === array[j]) {
							let ign = "player" + (j + 1) + "IGN";
							setErrorFor(eval(ign), "IGN tidak boleh sama.");
						}
					}
				}
			} else {
				// If there are no duplicates, set all to success and continue
				for (let i = 0; i < array.length; i++) {
					setSuccessFor(eval("player" + [i + 1] + "IGN"));
				}
				gate5 = true;
			}

			if (IGN1Details && IGN2Details && IGN3Details && IGN4Details && IGN5Details && gate5) {
				validationIGNs = true;
			} else {
				// Send Error message
				checkIGNDetails(player1IGNValue, player1IGN);
				checkIGNDetails(player2IGNValue, player2IGN);
				checkIGNDetails(player3IGNValue, player3IGN);
				checkIGNDetails(player4IGNValue, player4IGN);
				checkIGNDetails(player5IGNValue, player5IGN);
			}
		} else {
			//Set array for values and duplicates
			let array = [player1IGNValue, player2IGNValue, player3IGNValue, player4IGNValue];

			//Check for duplicates
			let duplicates = findDuplicates(array);

			let gate4 = false;

			if (duplicates.length !== 0) {
				// Set all to success first
				for (let i = 0; i < array.length; i++) {
					setSuccessFor(eval("player" + [i + 1] + "IGN"));
				}
				// Set duplicates to error
				for (let i = 0; i < duplicates.length; i++) {
					for (let j = 0; j < array.length; j++) {
						if (duplicates[i] === array[j]) {
							let ign = "player" + (j + 1) + "IGN";
							setErrorFor(eval(ign), "IGN tidak boleh sama.");
						}
					}
				}
			} else {
				// If there are no duplicates, set all to success and continue
				for (let i = 0; i < array.length; i++) {
					setSuccessFor(eval("player" + [i + 1] + "IGN"));
				}
				gate4 = true;
			}
			if (IGN1Details && IGN2Details && IGN3Details && IGN4Details && gate4) {
				validationIGNs = true;
			} else {
				// Send error message
				checkIGNDetails(player1IGNValue, player1IGN);
				checkIGNDetails(player2IGNValue, player2IGN);
				checkIGNDetails(player3IGNValue, player3IGN);
				checkIGNDetails(player4IGNValue, player4IGN);
			}
		}
	}

	if (validationPhone && validationTeamName && validationIGNs) {
		//Loading muncul, submit ilang
		loading.classList.toggle("d-none");
		btnRegister.classList.toggle("d-none");

		fetch(scriptURL, { method: "POST", body: new FormData(form) })
			.then((response) => {
				// Loading ilang
				loading.classList.toggle("d-none");
				// Reset Form
				validationIGNs = false;
				form.reset();
				// Reset Classes
				resetClass(teamName);
				resetClass(teamPhoneNumber);
				resetClass(player1IGN);
				resetClass(player2IGN);
				resetClass(player3IGN);
				resetClass(player4IGN);
				resetClass(player5IGN);
				resetClass(player6IGN);

				// Redirect Error Message
				redirectError.classList.toggle("d-none");

				// Redirect to WA
				alert("Anda akan dialihkan untuk chat admin WA kami untuk memberikan bukti pembayaran. Pastikan pembayaran sudah dilakukan.");
				window.location.assign("https://wa.me/6288212599372?text=Nama%20Tim:%0AIni%20bukti%20pembayarannya%0ATerima%20Kasih!");

				console.log("Success!", response);
			})
			.catch((error) => {
				// Loading ilang
				loading.classList.toggle("d-none");
				console.error("Error!", error.message);

				// Reset form
				alert("Terjadi sebuah masalah. Silahkan refresh page ini dan isi ulang form!");
				form.reset();

				// Reset Classes
				resetClass(teamName);
				resetClass(teamPhoneNumber);
				resetClass(player1IGN);
				resetClass(player2IGN);
				resetClass(player3IGN);
				resetClass(player4IGN);
				resetClass(player5IGN);
				resetClass(player6IGN);
			});
	}
});

function checkTeamName(teamNameValue) {
	if (teamNameValue === "") {
		setErrorFor(teamName, "Silahkan isi nama tim kalian.");
		return false;
	} else {
		setSuccessFor(teamName);
		return true;
	}
}

function checkPhone(teamPhoneNumberValue) {
	if (teamPhoneNumberValue === "") {
		setErrorFor(teamPhoneNumber, "Silahkan isi nomor HP.");
		return false;
	} else if (teamPhoneNumberValue.startsWith("08", 0)) {
		let regex = /^(\d{10}|\d{11}|\d{12}|\d{13})$/.test(teamPhoneNumberValue);
		if (regex) {
			setSuccessFor(teamPhoneNumber);
			return true;
		} else if (teamPhoneNumberValue < 3 || teamPhoneNumberValue > 13) {
			setErrorFor(teamPhoneNumber, "Nomor HP harus 10 sampai 13 angka.");
		} else if (!regex) {
			setErrorFor(teamPhoneNumber, "Silahkan isi nomor HP yang valid.");
			return false;
		}
	} else {
		setErrorFor(teamPhoneNumber, "Nomor HP harus dimulai dengan '08'.");
		return false;
	}
}

function checkPrimaryIGN(playerIGNValue, playerIGN) {
	if (playerIGNValue === "") {
		setErrorFor(playerIGN, "Silahkan isi IGN.");
		return false;
	}
	return true;
}

function checkSecondaryIGN(playerIGNValue) {
	if (playerIGNValue === "") {
		return false;
	}
	return true;
}

function checkIGNDetails(playerIGNValue, playerIGN) {
	if (playerIGNValue.length > 30) {
		setErrorFor(playerIGN, "IGN tidak boleh lebih dari 30 characters.");
		return false;
	} else if (playerIGNValue.length < 3) {
		setErrorFor(playerIGN, "IGN tidak boleh kurang dari 3 characters.");
		return false;
	}

	return true;
}

function findDuplicates(array) {
	const duplicates = [];
	const compare = [];

	for (let i = 0; i < array.length; i++) {
		if (!compare.includes(array[i])) {
			compare.push(array[i]);
		} else {
			duplicates.push(array[i]);
		}
	}
	return duplicates;
}

function setErrorFor(input, message) {
	const formDiv = input.parentElement;
	const small = formDiv.querySelector("small");

	small.innerText = message;
	formDiv.className = "formDiv error";
}

function setSuccessFor(input) {
	const formDiv = input.parentElement;
	formDiv.className = "formDiv success";
}

function resetClass(input) {
	const formDiv = input.parentElement;
	formDiv.classList.remove("success");
	formDiv.classList.remove("error");
}
