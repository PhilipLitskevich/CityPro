// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const offset = 500;
const scrollUp = document.querySelector('.scroll-up')
const getTop = () => document.documentElement.scrollTop;

// onscroll
window.addEventListener('scroll', () => {
	if (getTop() > offset) {
		scrollUp.classList.add('scroll-up--active');
	} else {
		scrollUp.classList.remove('scroll-up--active');
	}
});

scrollUp.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
})

//Читать еще
 let readMoreBtns =  document.querySelectorAll('[data-read-more]');
	if (readMoreBtns.length > 0){
		readMoreBtns.forEach((btn) => {
			btn.addEventListener('click', () => {
			const parent = btn.parentNode;
			const textBlock = parent.querySelector('[class*="__text-block"]');
			if (btn.classList.contains('_active')){
				textBlock.style.removeProperty('height')
			}else{
				textBlock.style.height = textBlock.scrollHeight + 'px';
			};				
			textBlock.classList.toggle('_visible')
			 parent.classList.toggle('_active')
			 btn.classList.toggle('_active')
		})
 })
}           

document.addEventListener("formSent", function (e) {
	// Форма
	alert("Спасибо, мы свяжемся с вами!")
});