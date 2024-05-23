function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
  

var count = 0;
var intervalId = setInterval(() => {
    count++;
    document.getElementById('count').innerHTML = count;
  }, 1000); 

var count = 0;

var intervalId = setInterval(() => {
  count++;
  document.getElementById('count').innerHTML = count;
  if (count >= 100 ) { // stop at 100
    clearInterval(intervalId);
  }
}, 100);;


var count = 1000;
var intervalId = setInterval(() => {
    count++;
    document.getElementById('count3').innerHTML = count;
  }, 1000); 

var count = 650;

var intervalId = setInterval(() => {
  count++;
  document.getElementById('count3').innerHTML = count;
  if (count >= 100 ) { // stop at 100
    clearInterval(intervalId);
  }
}, 1000)



var count = 0;
var intervalId = setInterval(() => {
    count++;
    document.getElementById('count2').innerHTML = count;
  }, 1000); 

var count = 3050;

var intervalId = setInterval(() => {
  count++;
  document.getElementById('count2').innerHTML = count;
  if (count >= 100 ) { // stop at 100
    clearInterval(intervalId);
  }
}, 100)
;





let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}




