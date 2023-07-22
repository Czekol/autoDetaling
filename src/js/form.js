const username = document.querySelector('#username');
const number = document.querySelector('#number');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const checkbox = document.querySelector('#checkbox');
const sendBtn = document.querySelector('.form__btn');
const msgStatus = document.querySelector('.msg-status');

const showError = (input, msg) => {
	input.placeholder = msg;
	input.classList.add('error');
};

const clearError = input => {
	input.placeholder = '';
	input.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		if (el.value.trim() === '') {
			if (!el.classList.contains('error')) {
				showError(el, `Wpisz ${el.placeholder}`);
			}
		} else {
			clearError(el);
		}
	});
};

const checkEmail = email => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkNumber = number => {
	const re = /[a-zA-Z]/;
	if (re.test(number.value) || number.value.trim() === '') {
		showError(number, 'Numer jest niepoprawny');
	} else {
		clearError(number);
	}
};

const checkCheckbox = checkBox => {
	if (checkBox.checked != true) {
		checkBox.nextElementSibling.classList.add('error');
	} else {
		checkBox.nextElementSibling.classList.remove('error');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.error-item');
	let errorCount = 0;

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		if (document.location.search === '?mail_status=sent') {
			msgStatus.classList.add('success');
			msgStatus.textContent = 'Wiadomość wysłana!';

			setTimeout(() => {
				msgStatus.classList.remove('success');
				location.reload();
			}, 3000);
		}

		if (document.location.search === '?mail_status=error') {
			msgStatus.classList.add('error');
			msgStatus.textContent = 'Wystąpił błąd.';

			setTimeout(() => {
				msgStatus.classList.remove('error');
				location.reload();
			}, 3000);
		}
	}
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();

	checkForm([username, email, number, message]);
	checkEmail(email);
	checkNumber(number);
	checkCheckbox(checkbox);
	checkErrors();
});
