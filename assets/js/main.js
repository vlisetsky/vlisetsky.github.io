(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (header && toggle && nav) {
    function setOpen(isOpen) {
      header.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    }

    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    function updateScrollState() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
  }

  // Placeholder links stay on the page; real page paths in the header still navigate.
  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) {
      return;
    }
    var href = link.getAttribute("href");
    if (href === "#" || href === "") {
      event.preventDefault();
    }
  });

  document.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  var gallery = document.querySelector(".empower-gallery");
  var track = gallery && gallery.querySelector(".empower-gallery-track");
  if (gallery && track) {
    var originals = Array.prototype.slice.call(track.children);
    originals.forEach(function (item) {
      track.appendChild(item.cloneNode(true));
    });

    var index = 0;
    var timer = null;
    var gap = 13;
    var speed = 2500;

    function itemStep() {
      var item = track.querySelector(".empower-gallery-item");
      return item ? item.getBoundingClientRect().width + gap : 0;
    }

    function goTo(nextIndex, animate) {
      index = nextIndex;
      track.style.transition = animate ? "transform 0.55s ease" : "none";
      track.style.transform = "translateX(" + (-index * itemStep()) + "px)";
    }

    function tick() {
      goTo(index + 1, true);
      if (index >= originals.length) {
        window.setTimeout(function () {
          goTo(0, false);
        }, 560);
      }
    }

    function start() {
      if (timer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      timer = window.setInterval(tick, speed);
    }

    function stop() {
      if (!timer) {
        return;
      }
      window.clearInterval(timer);
      timer = null;
    }

    gallery.addEventListener("mouseenter", stop);
    gallery.addEventListener("mouseleave", start);
    window.addEventListener("resize", function () {
      goTo(index % originals.length, false);
    });
    start();
  }
})();
