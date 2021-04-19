const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');

sign_up_btn.addEventListener('click',()=>{
   container.classList.add('sign-up-mode');
})

sign_in_btn.addEventListener('click',()=>{
   container.classList.remove('sign-up-mode');
})

// CAROUSEL
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;

prev.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = slides.length - 1;
    document.querySelector(".active").classList.remove("active");
    slides[currentIndex].classList.add("active");
  } else if (currentIndex < slides.length) {
    currentIndex--;
    document.querySelector(".active").classList.remove("active");
    slides[currentIndex].classList.add("active");
  }
});

next.addEventListener("click", () => {
  if (currentIndex === slides.length - 1) {
    currentIndex = 0;
    document.querySelector(".active").classList.remove("active");
    slides[currentIndex].classList.add("active");
  } else if (currentIndex < slides.length) {
    currentIndex++;
    document.querySelector(".active").classList.remove("active");
    slides[currentIndex].classList.add("active");
  }
});
