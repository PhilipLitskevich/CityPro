/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination} from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';


//Функции для нумерования слайдов
function customFraction(swiper, sectionName) {
	const fractionCurrent = document.getElementById(sectionName + "-fraction-current");
	const fractionMax = document.getElementById(sectionName + "-fraction-max");
	const slides = document.querySelectorAll("." + sectionName + "__slide");
	const slideCount = String(slides.length).padStart(2, '0');
	fractionMax.textContent = slideCount;
	fractionCurrent.textContent = String(swiper.realIndex + 1).padStart(2, '0');
}

function updateFraction(viewportWidth = 767.98) {
	const fractionCurrent = document.getElementById("portfolio-fraction-current");
	const fractionMax = document.getElementById("portfolio-fraction-max");
	const slides = document.querySelectorAll(".portfolio__slide");
	let slideCount;
	let slideCurrent;

	if (window.innerWidth > viewportWidth) {
		slideCount = String(slides.length);
		slideCurrent = String(this.realIndex + 1);
	} else {
		slideCount = String(slides.length).padStart(2, '0');
		slideCurrent = String(this.realIndex + 1).padStart(2, '0');
	}
	fractionMax.textContent = slideCount;
	fractionCurrent.textContent = slideCurrent;
}

// Инициализация слайдеров
function initSliders() {

	if (document.querySelector('.hero__slider')) {
		const swiperHero = new Swiper('.hero__slider', {
			modules: [Pagination],
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			grabCursor: true,
			loop: true,
			on: {
				slideChange: function () {
					customFraction(this, 'hero')
				}
			}
		});
		// Привязка контекста выполнения
		swiperHero.on('init', function () {
			swiperHero.slideChange = swiperHero.slideChange.bind(swiperHero);
		});
	}
}

if (document.querySelector('.services__slider')) {
	const swiperServices = new Swiper('.services__slider', {
		modules: [Pagination],
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		grabCursor: true,
		loop: true,
		spaceBetween: 20,
		updateOnWindowResize: true,
		watchOverflow: true,
		breakpoints: {
			320: {
				slidesPerView: 1,
				centeredSlides: true,
			},
			610: {
				slidesPerView: 2,
				centeredSlides: false,
			},
			850: {
				slidesPerView: 3,
				spaceBetween: 30,
				centeredSlides: false,
			},
			1100: {
				slidesPerView: 4,
				spaceBetween: 30,
				centeredSlides: false,
			},
		},
		on: {
			slideChange: function () {
				customFraction(this, 'services')
			},
			lock: function (){
				document.querySelector('.services__slider-navigation-wrapper').classList.add('lock')
			},
			unlock: function (){
				document.querySelector('.services__slider-navigation-wrapper').classList.remove('lock')
			}
		}
	});
	// Привязка контекста выполнения
	swiperServices.on('init', function () {
		swiperServices.slideChange = swiperServices.slideChange.bind(swiperServices);
	});
}


if (document.querySelector('.portfolio__slider')) {

	const swiperPortfolio = new Swiper('.portfolio__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Navigation, Pagination],
		loop: true,
		autoHeight: false,
		grabCursor: true,

		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},

		slidesPerView: 1,
		spaceBetween: 20,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		on: {
			init: function (slider) {
				updateFraction.call(this);

				const title = document.querySelector('.portfolio__title');
				const titleClone = title.cloneNode(true);
				title.remove();
				slider.slides.forEach(slide => {
					slide.insertBefore(titleClone.cloneNode(true), slide.firstChild);
				});
			},
			slideChange: function (swiper) {
				updateFraction.call(this);
			},
			slideChangeTransitionStart: function (swiper) {
				swiper.slides.forEach(slide => {
					const active = slide.querySelectorAll('._active');
					const visible = slide.querySelectorAll('._visible');


					if (active.length > 0) {
						active.forEach((item) => {
							item.classList.remove('_active');
						});
					}

					if (visible.length > 0) {
						visible.forEach((item) => {
							item.classList.remove('_visible');
							item.style.removeProperty('height');
						});
					}
				})
			}
		}
	});

	swiperPortfolio.on('init', function () {
		swiperPortfolio.slideChange = swiperPortfolio.slideChange.bind(swiperPortfolio);
	});
}

window.addEventListener("load", function (e) {
	initSliders();
});