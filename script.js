"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

// // Ceating and adding elements
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

// Adding smooth scrolling to the 'learn more' button
const buttonScrollTo = document.querySelector(".btn--scroll-to");
buttonScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#section--1").scrollIntoView({ behavior: "smooth" });
});

// Adding smooth scrolling using event delegation to the nav bar links
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Code for the tabbed component.
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");

/*
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
