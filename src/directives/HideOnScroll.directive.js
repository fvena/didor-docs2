const offsetScroll = 85
let lastScrollPosition = 0;

function scroll(e, el) {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition < 0) {
    return;
  }

  // Stop executing this function if the difference between
  // current scroll position and last scroll position is less than some offset
  if (Math.abs(currentScrollPosition - lastScrollPosition) < offsetScroll) {
    return;
  }

  if (currentScrollPosition < lastScrollPosition) {
    el.classList.remove("hideOnScroll");
  } else {
    el.classList.add("hideOnScroll");
  }

  lastScrollPosition = currentScrollPosition;
}

const hideOnScroll = {
  mounted(el) {
    const onScroll = e => scroll(e, el);
    window.addEventListener('scroll', onScroll, false);
  },

  beforeUnmount() {
    const onScroll = e => scroll(e, el);
    window.removeEventListener('scroll', onScroll);
  }
}

export default hideOnScroll;
