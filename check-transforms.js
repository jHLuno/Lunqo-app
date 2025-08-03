// Self-check script to verify no transforms interfere with fixed navbar
// Run this in browser console:

// List every ancestor of the nav that still has a transform
[...document.querySelectorAll('*')]
  .filter(el => getComputedStyle(el).transform !== 'none')
  .map(el => el.tagName + '.' + el.className);

// The array must be empty. If you still see elements, one of them is re-introducing a transform; 
// move the nav above it or delete the style.

// You should now have:
// ✅ Transparent header over the hero
// ✅ No black band  
// ✅ Header stays fixed on every scroll 