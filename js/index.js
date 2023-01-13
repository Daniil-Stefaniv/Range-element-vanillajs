const formElementsAndActions = () => {
	const numInputsList = document.querySelectorAll(".number-input");
	const myForm = document.querySelector(".my-form");
	const progressElement = document.querySelector(".range-slider-progress");
	const rangeInputs = document.querySelectorAll(".range-slider-input");

	const rangeInputsGap = 500;

	const numberInputsActions = () => {
		numInputsList.forEach((input) => {
			const rangeInputEvent = (e) => {
				const min = parseInt(numInputsList[0].value);
				const max = Math.floor(parseInt(numInputsList[1].value));

				if (max - min > rangeInputsGap && max <= rangeInputs[0].max) {
					if (e.target.id === "min-input") {
						rangeInputs[0].value = min;
						progressElement.style.left = `${
							(min / rangeInputs[0].max) * 100
						}%`;
					} else {
						rangeInputs[1].value = max;
						progressElement.style.right = `${
							100 - (max / rangeInputs[0].max) * 100
						}%`;
					}
				}
			};

			input.addEventListener("input", rangeInputEvent);
		});
	};

	const RangeInputActions = () => {
		rangeInputs.forEach((input) => {
			const rangeInputEvent = (e) => {
				const min = parseInt(rangeInputs[0].value);
				const max = Math.floor(parseInt(rangeInputs[1].value));

				const progressLeft = (min / rangeInputs[0].max) * 100;
				const progressRight = 100 - (max / rangeInputs[0].max) * 100;

				if (max - min < rangeInputsGap) {
					if (e.target.id === "min-range") {
						rangeInputs[0].value = max - rangeInputsGap;
						numInputsList[0].value = max - rangeInputsGap;
					} else {
						rangeInputs[1].value = min + rangeInputsGap;
						numInputsList[1].value = min + rangeInputsGap;
					}
				} else {
					progressElement.style.left = `${progressLeft}%`;
					progressElement.style.right = `${progressRight}%`;
					numInputsList[0].value = min;
					numInputsList[1].value = max;
				}
			};

			input.addEventListener("input", rangeInputEvent);
		});
	};

	const formSubmitAction = () => {
		const submitForm = (e) => {
			e.preventDefault();
			const result = {
				min: numInputsList[0].value,
				max: numInputsList[1].value,
			};

			const dataToSend = JSON.stringify(result);

			const postData = async (url, data) => {
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: data,
				});
			};

			postData("putYourUrl", dataToSend);
		};

		myForm.addEventListener("submit", submitForm);
	};

	numberInputsActions();
	RangeInputActions();
	formSubmitAction();
};

formElementsAndActions();
