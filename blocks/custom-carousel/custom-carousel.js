const carousel = document.querySelector(".custom-carousel");
const wrapper = document.querySelector(".custom-carousel-wrapper");
const cards = Array.from(carousel.children);
const dotsContainer = document.createElement("div");
dotsContainer.className = "dots-container";
wrapper.appendChild(dotsContainer);

let visibleCards = calculateVisibleCards();
let totalSlides;
let currentIndex = 0;


function calculateVisibleCards() {
    const width = window.innerWidth;
    if (width >= 1280) return 5;
    if (width >= 961) return 4;
    if (width >= 641) return 3;
    return 2;
}


function getTotalSlides() {
    return Math.ceil(cards.length / visibleCards);
}


function renderDots() {
    dotsContainer.innerHTML = "";
    totalSlides = getTotalSlides();
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.addEventListener("click", () => slideTo(i));
        if (i === currentIndex) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    }
}


function slideTo(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    const offset = -(index * visibleCards * (100 / visibleCards));
    carousel.style.transform = `translateX(${offset}%)`;
    renderDots();
}


function handleLastSlide() {
    const remainingCards = cards.length % visibleCards;
    if (remainingCards === 0) return;

    const totalCards = cards.length;
    const startIndex = totalCards - remainingCards;
    const lastCards = cards.slice(startIndex); 


    carousel.innerHTML = "";
    let slideStart = 0;
    while (slideStart < totalCards) {
        const slideEnd = Math.min(slideStart + visibleCards, totalCards);
        const slideCards = cards.slice(slideStart, slideEnd);

        
        slideCards.forEach(card => carousel.appendChild(card));

        slideStart = slideEnd;
    }


    if (remainingCards > 0) {
        const repeatCount = visibleCards - remainingCards;
        const previousCards = cards.slice(startIndex - repeatCount, startIndex);
        previousCards.forEach(card => carousel.appendChild(card));
    }
}


function initializeCarousel() {
    handleLastSlide();
    renderDots();
    slideTo(0); 
}


window.addEventListener("resize", () => {
    visibleCards = calculateVisibleCards();
    initializeCarousel();
});

initializeCarousel();