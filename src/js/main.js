const hamburgerBtn = document.querySelector('.hamburger');
const callIcon = document.querySelector('.nav__box-icon');
const phoneNumber = document.querySelector('.nav__box-call-number');
const navMobile = document.querySelector('.nav__mobile');
const navMobileLinks = document.querySelectorAll('.nav__mobile a');
const body = document.querySelector('body');
const nav = document.querySelector('.nav');
const accordionBtns = document.querySelectorAll('.both-cleaning__box-offer-btn');
const switchBtn = document.querySelector('.switch');
const allSlidesCards = document.querySelectorAll('.card');
const insideNumber1 = document.querySelector('.inside-number1');
const insideNumber2 = document.querySelector('.inside-number2');
const insideNumber3 = document.querySelector('.inside-number3');
const pakietsRebate = document.querySelector('.price__box-discount');
const images = document.querySelectorAll('.realization__box-img');

const hamburgerMenu = () => {
	hamburgerBtn.classList.toggle('is-active');
	navMobile.classList.toggle('show-menu');
	body.classList.toggle('stop-scrolling');
};

const switchPakiet = () => {
	if (allSlidesCards[0].classList.contains('inside')) {
		allSlidesCards.forEach(card => card.classList.remove('active'));
		allSlidesCards[0].classList.add('active');
		insideNumber1.textContent = '3/5';
		insideNumber2.textContent = '4/5';
		insideNumber3.textContent = '5/5';
		switchBtn.textContent = 'wnętrze';
		pakietsRebate.textContent='450-550zł'
		pakietsRebate.nextElementSibling.textContent='Rabat 27-34%'
		pakietsRebate.parentElement.nextElementSibling.textContent='400-500zł'

	} else {
		allSlidesCards.forEach(card => card.classList.remove('active'));
		allSlidesCards[2].classList.add('active');
		insideNumber1.textContent = '1/3';
		insideNumber2.textContent = '2/3';
		insideNumber3.textContent = '3/3';
		switchBtn.textContent = 'całość';
		pakietsRebate.textContent='250-450zł'
		pakietsRebate.nextElementSibling.textContent='Rabat 25-36%'
		pakietsRebate.parentElement.nextElementSibling.textContent='200-400zł'

	}
	allSlidesCards[0].classList.toggle('inside');
	allSlidesCards[1].classList.toggle('inside');
	allSlidesCards.forEach(card1 => card1.classList.toggle('inside-grow'));
};

function isElementInViewport(el) {
	let rect = el.getBoundingClientRect();
	let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	let margin = 620;

	return (
		rect.top >= -margin &&
		rect.left >= 0 &&
		rect.bottom <= viewportHeight + margin &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

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
	allSlidesCards.forEach(card => {
		card.classList.remove('active');
		this.classList.add('active');
	});
}
if (document.body.classList.contains('insideCleaningSubpage')) {
	if (window.innerWidth >= 768) {
		accordionBtns[2].parentElement.nextElementSibling.classList.add('active');
	} else {
		accordionBtns[0].parentElement.nextElementSibling.classList.add('active');
	}
}

hamburgerBtn.addEventListener('click', hamburgerMenu);
navMobileLinks.forEach(link => link.addEventListener('click', hamburgerMenu));
if (switchBtn) {
	switchBtn.addEventListener('click', switchPakiet);
}
allSlidesCards.forEach(card => card.addEventListener('click', dropdownSlides));
window.addEventListener('scroll', lazyLoadImages);
images.forEach(image => image.addEventListener('click', handleClick));
accordionBtns.forEach(btn => btn.addEventListener('click', openAccordionItems));
window.addEventListener('click', clickOutsideAccordion);
lightbox.addEventListener('click', e => {
	if (e.target !== e.currentTarget) return;
	lightbox.classList.remove('active');
	body.classList.remove('stop-scrolling');
});
