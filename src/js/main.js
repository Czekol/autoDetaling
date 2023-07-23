const hamburgerBtn = document.querySelector('.hamburger');
const callIcon = document.querySelector('.nav__box-icon');
const phoneNumber = document.querySelector('.nav__box-call-number');
const navMobile = document.querySelector('.nav__mobile');
const navMobileLinks = document.querySelectorAll('.nav__mobile a');
const body = document.querySelector('body');
const nav = document.querySelector('.nav');
const accordionBtns = document.querySelectorAll('.both-cleaning__box-offer-btn');
const allSlidesCards = document.querySelectorAll('.card');
const fullPakietCards = document.querySelectorAll('.full-pakiet-card');
const insidePakietCards = document.querySelectorAll('.inside-pakiet-card');
const images = document.querySelectorAll('.realization__box-img');

const hamburgerMenu = () => {
	hamburgerBtn.classList.toggle('is-active');
	navMobile.classList.toggle('show-menu');
	body.classList.toggle('stop-scrolling');
	callIcon.classList.toggle('black-color');
	phoneNumber.classList.toggle('black-color');
};

const showNumber = e => {
	if (e.target !== callIcon) {
		phoneNumber.classList.add('show-number');
		nav.classList.add('dark-shadow');
	} else {
		phoneNumber.classList.toggle('show-number');
	}
};

const copyText = async () => {
	try {
		await navigator.clipboard.writeText(phoneNumber.textContent);
		phoneNumber.textContent = 'Skopiowano';
		phoneNumber.classList.remove('underline');
		setTimeout(() => (phoneNumber.textContent = '662 520 511'), 3500);
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
};

function isElementInViewport(el) {
	let rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function lazyLoadImages() {
	const images = document.querySelectorAll('.realization__box-img[data-src]');
	images.forEach(function (image) {
		if (isElementInViewport(image)) {
			image.setAttribute('src', image.getAttribute('data-src'));
			image.removeAttribute('data-src');
		}
	});
}

lazyLoadImages();

function openAccordionItems() {
	if (this.parentElement.nextElementSibling.classList.contains('active')) {
		this.parentElement.nextElementSibling.classList.remove('active');

		this.innerHTML = '<i class="both-cleaning-btn-icon fa-solid  fa-plus"></i>';
	} else {
		closeAccordionItems();
		this.parentElement.nextElementSibling.classList.add('active');
		this.innerHTML = '<i class="both-cleaning-btn-icon fa-solid  fa-minus h"></i>';
	}
}

const closeAccordionItems = () => {
	const allActiveItems = document.querySelectorAll('.both-cleaning__accordion-text');
	allActiveItems.forEach(item => item.classList.remove('active'));

	allActiveItems.forEach(item => item.classList.remove('active'));

	accordionBtns.forEach(btn => (btn.innerHTML = '<i class="both-cleaning-btn-icon fa-solid  fa-plus"></i>'));
};

const clickOutsideAccordion = e => {
	if (
		e.target.classList.contains('both-cleaning__box-offer-btn') ||
		e.target.classList.contains('both-cleaning__accordion-text')
	)
		return;

	closeAccordionItems();
};

function dropdownSlides() {
	if (this.classList.contains('inside-pakiet-card')) {
		insidePakietCards.forEach(card => {
			card.classList.remove('active');
			this.classList.add('active');
		});
	} else if (this.classList.contains('full-pakiet-card')) {
		fullPakietCards.forEach(card => {
			card.classList.remove('active');
			this.classList.add('active');
		});
	}
}
// if (accordionBtns[0].parentElement.nextElementSibling || accordionBtns[2].parentElement.nextElementSibling) {
// 		if (window.innerWidth >= 768) {
// 			accordionBtns[2].parentElement.nextElementSibling.classList.add('active');
// 		} else {
// 			accordionBtns[0].parentElement.nextElementSibling.classList.add('active');
// 		}
// }

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const handleClick = e => {
	body.classList.add('stop-scrolling');

	lightbox.classList.add('active');
	const img = document.createElement('img');
	img.src = e.target.src;
	while (lightbox.firstChild) {
		lightbox.removeChild(lightbox.firstChild);
	}
	lightbox.appendChild(img);
};

hamburgerBtn.addEventListener('click', hamburgerMenu);
window.addEventListener('scroll', showNumber);
callIcon.addEventListener('click', showNumber);
phoneNumber.addEventListener('click', copyText);
navMobileLinks.forEach(link => link.addEventListener('click', hamburgerMenu));
window.addEventListener('scroll', lazyLoadImages);
accordionBtns.forEach(btn => btn.addEventListener('click', openAccordionItems));
window.addEventListener('click', clickOutsideAccordion);
allSlidesCards.forEach(card => card.addEventListener('click', dropdownSlides));
images.forEach(image => image.addEventListener('click', handleClick));
lightbox.addEventListener('click', e => {
	if (e.target !== e.currentTarget) return;
	lightbox.classList.remove('active');
	body.classList.remove('stop-scrolling');
});
