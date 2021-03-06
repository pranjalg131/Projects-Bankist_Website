"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const buttonScrollTo = document.querySelector(".btn--scroll-to");
const navLinks = document.querySelector(".nav__links");
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Adding smooth scrolling to the 'learn more' button
buttonScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#section--1").scrollIntoView({ behavior: "smooth" });
});

// Adding smooth scrolling using event delegation to the nav bar links
navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/*
Code for the tabbed component.
We will use event delegation over here, attaching the event handler to the common parent of all the tabs ie the tabContainer and then finding the matching condition to handle the events.
*/
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Gaurd Check
  if (!clicked) return;

  // Removing active class from all tabs and contents
  tabs.forEach((t) => {
    t.classList.remove("operations__tab--active");
  });
  contents.forEach((c) => {
    c.classList.remove("operations__content--active");
  });

  // Adding active class to the current tab
  clicked.classList.add("operations__tab--active");
  // For the content , take out the tab number from data attribute
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Code for link hover in the navigation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Code for sticky navigation
const navHeight = nav.getBoundingClientRect().height;

const handleSticky = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const optns = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(handleSticky, optns);
headerObserver.observe(header);

const sections = document.querySelectorAll(".section");

const showSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  // to avoid unnecessay logging of events and waste of resources
  observer.unobserve(entry.target);
};

const sectionOptions = {
  root: null,
  threshold: 0.15,
};

const observeSections = new IntersectionObserver(showSections, sectionOptions);
sections.forEach((section) => {
  observeSections.observe(section);
  section.classList.add("section--hidden");
});

const lazyimgs = document.querySelectorAll("img[data-src]");

const lazyLoadImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  // To avoid removing the blur effect prematurely
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};

const lazyLoadOptns = {
  root: null,
  threshold: 0,
  rootMargin: "200px", // to load them ahead of time to give the illusion of instant loading.
};

const imgObserver = new IntersectionObserver(lazyLoadImage, lazyLoadOptns);
lazyimgs.forEach((img) => imgObserver.observe(img));

// TODO : Building the slider component.
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const leftBtn = document.querySelector(".slider__btn--left");
  const rightBtn = document.querySelector(".slider__btn--right");
  const dotsContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlides = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `
  <button class="dots__dot dots__dot--active" data-slide="${i}"></button>
  `
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });

    activateDot(slide);
  };

  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    createDots(); // This is so that create Dots does not throw the error
    goToSlide(0);
  };
  init();

  rightBtn.addEventListener("click", nextSlide);
  leftBtn.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextSlide();
    }
    if (e.key == "ArrowLeft") {
      prevSlide();
    }
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });
};
slider();

//  Ceating and adding elements
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML =
//   'We use cookies for improved functionality and analytics <button class = "btn btn--close-cookie">Got it!<button>';

// const header = document.querySelector(".header");
// header.append(message);

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });
