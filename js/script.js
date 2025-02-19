const slides = [{
    url : "./img/first-slide.png",
    city1: "Rostov-on-Don",
    city2: "LCD admiral",
    apartmentArea: "81 m2",
    repairTime: "3.5 months"
},
{
    url : "./img/second-slide.png",
    city1: "Sochi",
    city2: "Thieves",
    apartmentArea: "105 m2",
    repairTime: "4 months"
},
{
    url : "./img/third-slide.png",
    city1: "Rostov-on-Don",
    city2: "Patriotic",
    apartmentArea: "93 m2",
    repairTime: "3 months"
}];

function initSlider() {
    if(!slides || !slides.length) return;

    let sliderImage = document.querySelector(".slider__img");
    let sliderCity = document.querySelector(".city");
    let sliderArea = document.querySelector(".area");
    let sliderTime = document.querySelector(".time");
    let sliderArrowLeft = document.querySelector(".slider__arrow-left");
    let sliderArrowRight = document.querySelector(".slider__arrow-right");
    let sliderDots = document.querySelector(".slider__dots")
    let sliderLinks = document.querySelectorAll('.header__nav-item');
    
    initImages();
    initArrows();
    initDots();
    initLinks();
    changeContent(0);

    function initImages() {
        slides.forEach((image, index) => {
            let sliderImageItem = `<div class = "n${index} ${index === 0? "active" : ""}" data-index="${index}"><img src = "${slides[index].url}" alt = "beautiful interior"></div>`
           sliderImage.innerHTML += sliderImageItem;
        })
    }

    function initArrows(){ 
        sliderArrowLeft.addEventListener('click', () => {
            let curNumber = +sliderImage.querySelector(".active").dataset.index;
            let nextNumber = curNumber === 0? slides.length - 1 : curNumber - 1;
            moveSlider(nextNumber);
        })
        sliderArrowRight.addEventListener('click', () => {
            let curNumber = +sliderImage.querySelector(".active").dataset.index;
            let nextNumber = curNumber === slides.length - 1? 0 : curNumber + 1;
            moveSlider(nextNumber);
        })
    }

    function initDots(){
        slides.forEach((image, index) => {
            let dot = `<div class="slider__dot n${index} ${index === 0? "slider__dot_active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
          });
          sliderDots.querySelectorAll(".slider__dot").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
          })
    }

    function initLinks() {
        sliderLinks[0].classList.add("header__nav-item_active");
        sliderLinks.forEach((link, index) => {
            link.dataset.index = index; 
            console.log(link);
            link.addEventListener("click", function(){
             moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderImage.querySelector(".active").classList.remove("active");
        sliderImage.querySelector(".n" + num).classList.add("active");
        sliderDots.querySelector(".slider__dot_active").classList.remove("slider__dot_active");
        sliderDots.querySelector(".n" + num).classList.add("slider__dot_active");
        sliderLinks.forEach(link => link.dataset.index == num ? link.classList.add("header__nav-item_active") : link.classList.remove("header__nav-item_active"));
        changeContent(num);
    }

    function changeContent(num) {
        let cityItem = `<p>${slides[num].city1}</p><p>${slides[num].city2}</p>`;
        sliderCity.innerHTML = cityItem;
        let areaItem = `<p>${slides[num].apartmentArea}</p>`;
        sliderArea.innerHTML = areaItem
        let timeItem = `<p>${slides[num].repairTime}</p>`
        sliderTime.innerHTML = timeItem;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initSlider();
  });
