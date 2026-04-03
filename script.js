/* =============================================
   KIKI REUSE — script.js
   ============================================= */

'use strict';

/* ─── IntersectionObserver for .reveal ─────── */
(function () {
  var elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  // Fallback: force-show all reveals after 120ms
  // (handles elements already in viewport on load)
  var fallbackTimer = setTimeout(function () {
    elements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 120);

  if (!('IntersectionObserver' in window)) {
    // No IntersectionObserver support — show all immediately
    clearTimeout(fallbackTimer);
    elements.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });

  // Once observer fires for all in-view elements, clear fallback
  // The fallback only runs if observer hasn't already handled them
})();


/* ─── Header scroll state ───────────────────── */
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;

  var scrolled = false;

  function onScroll() {
    var shouldScroll = window.scrollY > 20;
    if (shouldScroll !== scrolled) {
      scrolled = shouldScroll;
      if (scrolled) {
        header.style.background = 'rgba(17, 16, 20, 0.92)';
      } else {
        header.style.background = 'rgba(17, 16, 20, 0.72)';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ─── Mobile nav toggle ─────────────────────── */
var mobileNavOpen = false;

function closeMobileNav() {
  mobileNavOpen = false;
  var nav = document.getElementById('mobile-nav');
  var btn = document.getElementById('hamburger');
  if (nav) nav.classList.remove('is-open');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'メニューを開く');
  }
  document.body.style.overflow = '';
}

(function () {
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    mobileNavOpen = !mobileNavOpen;

    if (mobileNavOpen) {
      mobileNav.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'メニューを閉じる');
      document.body.style.overflow = 'hidden';
    } else {
      closeMobileNav();
    }
  });

  // Close on overlay click (outside nav links)
  mobileNav.addEventListener('click', function (e) {
    if (e.target === mobileNav) {
      closeMobileNav();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNavOpen) {
      closeMobileNav();
    }
  });
})();


/* ─── Smooth anchor scroll (offset for fixed header) */
(function () {
  var HEADER_HEIGHT = 68;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').slice(1);
      if (!targetId) return; // href="#" → scroll to top

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      var targetTop = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
})();


/* ─── Hamburger animated icon ───────────────── */
(function () {
  var hamburger = document.getElementById('hamburger');
  if (!hamburger) return;

  var spans = hamburger.querySelectorAll('span');
  if (spans.length < 3) return;

  hamburger.addEventListener('click', function () {
    if (mobileNavOpen) {
      // "X" shape
      spans[0].style.cssText = 'transform: translateY(6.5px) rotate(45deg);';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0);';
      spans[2].style.cssText = 'transform: translateY(-6.5px) rotate(-45deg);';
    } else {
      spans[0].style.cssText = '';
      spans[1].style.cssText = '';
      spans[2].style.cssText = '';
    }
  });
})();
