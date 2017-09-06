"use strict";
var btn_feedback_open = document.querySelector(".feedback-btn");
var btn_feedback_close = document.querySelector(".feedback-form-close-btn");
var frm_feedback = document.querySelector(".feedback");

var rdb_slider_1 = document.querySelector("#slider-button-1");
var rdb_slider_2 = document.querySelector("#slider-button-2");
var rdb_slider_3 = document.querySelector("#slider-button-3");
var body = document.querySelector("body");

btn_feedback_open.addEventListener("click", function (event) {
    event.preventDefault();
    frm_feedback.classList.add("showeme");
});

btn_feedback_close.addEventListener("click", function (event) {
    event.preventDefault();
    frm_feedback.classList.remove("showeme");
});

rdb_slider_1.addEventListener("click", function (event) {
    body.classList.remove("body-background-2");
    body.classList.remove("body-background-3");
    body.classList.add("body-background-1");
});

rdb_slider_2.addEventListener("click", function (event) {
    body.classList.remove("body-background-1");
    body.classList.remove("body-background-3");
    body.classList.add("body-background-2");
});

rdb_slider_3.addEventListener("click", function (event) {
    body.classList.remove("body-background-1");
    body.classList.remove("body-background-2");
    body.classList.add("body-background-3");
});