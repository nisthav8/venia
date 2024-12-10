// function matchHeights() {
//     const left = document.querySelector('.body > main > div > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(1)')[0];
//     const right = document.querySelector('.body > main > div > div:nth-child(4) > div > div:nth-child(1)  > div:nth-child(1)')[0];

//     // Reset heights to auto to account for resizing
//     left.style.height = 'auto';
//     right.style.height = 'auto';

//     // Get the taller child
//     const maxHeight = Math.max(left.offsetHeight, right.offsetHeight);

//     // Set both children to the same height
//     left.style.height = `${maxHeight}px`;
//     right.style.height = `${maxHeight}px`;
//   }

//   // Run on load
//   window.addEventListener('load', matchHeights);

//   // Run on window resize
//   window.addEventListener('resize', matchHeights);
