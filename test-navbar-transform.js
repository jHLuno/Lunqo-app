// Test script to verify navbar transform and positioning
// Run this in browser console:

// Check if navbar transform is "none"
const nav = document.querySelector('nav');
if (nav) {
  const transform = getComputedStyle(nav).transform;
  console.log('Navbar transform:', transform);
  console.log('Should be "none":', transform === 'none');
  
  const position = getComputedStyle(nav).position;
  console.log('Navbar position:', position);
  console.log('Should be "fixed":', position === 'fixed');
  
  const zIndex = getComputedStyle(nav).zIndex;
  console.log('Navbar z-index:', zIndex);
  console.log('Should be high enough:', parseInt(zIndex) >= 99999);
} else {
  console.log('Navbar element not found');
}

// Check for any transforms on all elements
const elementsWithTransform = [...document.querySelectorAll('*')]
  .filter(el => getComputedStyle(el).transform !== 'none')
  .map(el => el.tagName + '.' + el.className);

console.log('Elements with transform:', elementsWithTransform);
console.log('Should be empty or minimal:', elementsWithTransform.length); 