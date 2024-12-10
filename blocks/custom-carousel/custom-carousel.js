const carousel = document.querySelector(".custom-carousel");
const wrapper = document.querySelector(".custom-carousel-wrapper");
const cards = Array.from(carousel.children);
const dotsContainer = document.createElement("div");
dotsContainer.className = "dots-container";
wrapper.appendChild(dotsContainer);

let visibleCards = calculateVisibleCards();
let totalSlides;
let currentIndex = 0;

// Calculate number of visible cards based on screen size
function calculateVisibleCards() {
    const width = window.innerWidth;
    if (width >= 1280) return 5;
    if (width >= 961) return 4;
    if (width >= 641) return 3;
    return 2;
}

// Calculate how many slides we need
function getTotalSlides() {
    return Math.ceil(cards.length / visibleCards);
}

// Render the dots for navigation
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

// Slide to a specific index
function slideTo(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    const offset = -(index * visibleCards * (100 / visibleCards));
    carousel.style.transform = `translateX(${offset}%)`;
    renderDots();
}

// Function to handle the last slide without repeating cards, but filling the area
function handleLastSlide() {
    const remainingCards = cards.length % visibleCards;
    if (remainingCards === 0) return;

    const totalCards = cards.length;
    const startIndex = totalCards - remainingCards;
    const lastCards = cards.slice(startIndex); // Get the last remaining cards

    // Clear the carousel and add the cards for the slides
    carousel.innerHTML = "";
    let slideStart = 0;
    while (slideStart < totalCards) {
        const slideEnd = Math.min(slideStart + visibleCards, totalCards);
        const slideCards = cards.slice(slideStart, slideEnd);

        // Add cards to the carousel
        slideCards.forEach(card => carousel.appendChild(card));

        slideStart = slideEnd;
    }

    // If remaining cards are not enough, repeat the last cards before it (not from start, but from last used ones)
    if (remainingCards > 0) {
        const repeatCount = visibleCards - remainingCards;
        const previousCards = cards.slice(startIndex - repeatCount, startIndex);
        previousCards.forEach(card => carousel.appendChild(card));
    }
}

// Initialize the carousel
function initializeCarousel() {
    handleLastSlide();
    renderDots();
    slideTo(0); // Start with the first slide
}

// Recalculate on window resize
window.addEventListener("resize", () => {
    visibleCards = calculateVisibleCards();
    initializeCarousel();
});

initializeCarousel();