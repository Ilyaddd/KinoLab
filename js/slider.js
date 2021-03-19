// Начало меню бургера
document
    .querySelector(".header-burger")
    .addEventListener("click", function () {
        document.querySelector(".header-burger").classList.toggle("active");
        document
            .querySelector(".header-menu-wrapper")
            .classList.toggle("active");
        document.querySelector("body").classList.toggle("lock");
    });
// Конец меню бургера

// Начало слайдера
let sliderTrack = document.querySelector(".slider-track"); // Контейнер со всеми слайдами
let slides = document.querySelectorAll(".slide") // Массив всех слайдов
// Длина слайда + отступ между слайдами 30px  
let sliderWidth = null
// Временная заглушына с интервалом
setTimeout(() => { 
    slideWidth = slides[0].clientWidth + 30;
}, 200)
const numOfSlides = slides.length; // Колличество слайдов
let paginations = document
    .querySelector(".slider-pagination")
    .querySelectorAll(".slider-pagination-item"); // Точки для навигации(снизу)
    
    
  
// Функция перелистывания слайдов в обе стороны
function changeSlide(forward) {
    let active =
        sliderTrack
            .querySelector(".slide.active")
            .getAttribute("data-slide-index") - 1; // Ищем активный слайд и берём его номер
    // Перелистывание вперёд
    if (forward) {
        // Условие для полседнего слайда
        if (active + 1 == numOfSlides) {
            slides[active].classList.remove("active");
            slides[0].classList.add("active");
            sliderTrack.style.transform = `translate3D(0, 0, 0)`; // Двигаем контейнер со всеми слайдами в начало
            paginations[active].classList.remove("active");
            paginations[0].classList.add("active");
        }
        // Условие для всех слайдов кроме последнего
        else {
            slides[active].classList.remove("active"); // Удаляем класс active у активного слайда
            slides[++active].classList.add("active"); // Добавляем класс active следующему слайду
            console.log(slideWidth)           
            sliderTrack.style.transform = `translate3D(-${slideWidth * active}px, 0, 0)`; // Умножаем длину слайда на его номер и двагаем контейнер со слайдами на получившееся значение
            paginations[active - 1].classList.remove("active"); // Удаляем класс active у нынешней точки
            paginations[active].classList.add("active"); // Добавляем класс active слудующей точке
        }
    }
    // Перелистывание назад
    else {
        // Условие для первого слайда
        if (active == 0) {
            slides[active].classList.remove("active");
            slides[numOfSlides - 1].classList.add("active");
            sliderTrack.style.transform = `translate3D(-${
                slideWidth * (numOfSlides - 1)
            }px, 0, 0)`;
            paginations[active].classList.remove("active");
            paginations[numOfSlides - 1].classList.add("active");
        }
        // Условие для всех слайдов кроме первого
        else {
            slides[active].classList.remove("active");
            slides[--active].classList.add("active");
            sliderTrack.style.transform = `translate3D(-${
                slideWidth * active
            }px, 0, 0)`;
            paginations[active + 1].classList.remove("active");
            paginations[active].classList.add("active");
        }
    }
}
// Запуск автоматического перелистывания слайдов
setTimeout(() => {
    setInterval(() => {
        changeSlide(true);
    }, 5000);
}, 0);
// Кнопка назад
document.querySelector(".prev__btn").addEventListener("click", function () {
    changeSlide(false);
});
// Кнопка вперёд
document.querySelector(".next__btn").addEventListener("click", function () {
    changeSlide(true);
});
// Конец слайдера