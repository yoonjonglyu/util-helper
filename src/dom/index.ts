import hasClass from './hasClass/hasClass';
import addClass from './addClass/addClass';
import removeClass from './removeClass/removeClass';
import toggleClass from './toggleClass/toggleClass';
import copyToClipboard from './copyToClipboard/copyToClipboard';
import scrollToTop from './scrollToTop/scrollToTop';
import isInViewport from './isInViewport/isInViewport';
import lockScroll from './lockScroll/lockScroll';

const Dom = Object.freeze({
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  copyToClipboard,
  scrollToTop,
  isInViewport,
  lockScroll,
});

export {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  copyToClipboard,
  scrollToTop,
  isInViewport,
  lockScroll,
};

export default Dom;
