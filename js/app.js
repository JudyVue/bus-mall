'use strict';

var allProducts = [];
var totalClicks = 0;
var totalViewsArray = [];
//vars to put votes and names of pictures for chart purposes
var clicksArray = [];
var imageNamesArray = [];

function makeNewObjects(){
  new Product('bag', 'img/bag.jpg');
  new Product('banana', 'img/banana.jpg');
  new Product('bathroom', 'img/bathroom.jpg');
  new Product('boots', 'img/boots.jpg');
  new Product('breakfast', 'img/breakfast.jpg');
  new Product('bubblegum', 'img/bubblegum.jpg');
  new Product('chair', 'img/chair.jpg');
  new Product('dog duck', 'img/dog-duck.jpg');
  new Product('dragon', 'img/dragon.jpg');
  new Product('monster', 'img/monster.jpg');
  new Product('pen', 'img/pen.jpg');
  new Product('pet sweep', 'img/pet-sweep.jpg');
  new Product('scissors', 'img/scissors.jpg');
  new Product('shark', 'img/shark.jpg');
  new Product('sweep', 'img/sweep.jpg');
  new Product('tauntaun', 'img/tauntaun.jpg');
  new Product('unicorn', 'img/unicorn.jpg');
  new Product('usb', 'img/usb.jpg');
  new Product('water can', 'img/water-can.jpg');
  new Product('wine glass', 'img/wine-glass.jpg');
}


function handleLocalStorage(){
  if (localStorage.getItem('userResults')) {
   allProducts = JSON.parse(localStorage.getItem('userResults'));
   console.log('local storage exists');
  } else {
    makeNewObjects();
    console.log('local storage empty');
  }
}

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}


var randomNumArray = [];

//var used to account for the previously show pictures
var previouslyShown = [];

//this function generates three random numbers
function threeRandomNumbers() {
  // console.log(previouslyShown + ' were the prior indexes');
  randomNumArray = [];
  randomNumArray.push(Math.floor(Math.random() * allProducts.length));

  randomNumArray.push(Math.floor(Math.random() * allProducts.length));
  while (randomNumArray[0] === randomNumArray[1]){
    // console.log('dup detected with second element.');
    randomNumArray[1] = (Math.floor(Math.random() * allProducts.length));
  }
  randomNumArray.push(Math.floor(Math.random() * allProducts.length));
  while (randomNumArray[1] === randomNumArray[2] || randomNumArray[0] === randomNumArray[2]){
    // console.log('dup detected with third element.');
    randomNumArray[2] = (Math.floor(Math.random() * allProducts.length));
  }
  while (randomNumArray[0] === previouslyShown[0] ||
        randomNumArray[0] === previouslyShown[1] ||
        randomNumArray[0] === previouslyShown[2] ||
        randomNumArray[1] === previouslyShown[0] ||
        randomNumArray[1] === previouslyShown[1] ||
        randomNumArray[1] === previouslyShown[2] ||
        randomNumArray[2] === previouslyShown[0] ||
        randomNumArray[2] === previouslyShown[1] ||
        randomNumArray[2] === previouslyShown[2] ||
        randomNumArray[0] === randomNumArray[1] ||
        randomNumArray[1] === randomNumArray[2] ||
        randomNumArray[0] === randomNumArray[2]) {
    randomNumArray[0] = (Math.floor(Math.random() * allProducts.length));
    randomNumArray[1] = (Math.floor(Math.random() * allProducts.length));
    randomNumArray[2] = (Math.floor(Math.random() * allProducts.length));
    console.log('had a match between old and new indexes');
  }
  // console.log(randomNumArray + ' are the current indexes');
}

//this function displays the images
function displayThreeImages(){
  threeRandomNumbers();
  //left
  var left = document.getElementById('left');
  left.src = allProducts[randomNumArray[0]].path;
  left.alt = allProducts[randomNumArray[0]].name;
  allProducts[randomNumArray[0]].views += 1;
  // console.log(allProducts[randomNumArray[0]].name + ' has ' + allProducts[randomNumArray[0]].views + ' views');

  //center
  var center = document.getElementById('center');
  center.src = allProducts[randomNumArray[1]].path;
  center.alt = allProducts[randomNumArray[1]].name;
  allProducts[randomNumArray[1]].views += 1;
  // console.log(allProducts[randomNumArray[1]].name + ' has ' + allProducts[randomNumArray[1]].views + ' views');

  //right
  var right = document.getElementById('right');
  right.src = allProducts[randomNumArray[2]].path;
  right.alt = allProducts[randomNumArray[2]].name;
  allProducts[randomNumArray[2]].views += 1;
  // console.log(allProducts[randomNumArray[2]].name + ' has ' + allProducts[randomNumArray[2]].views + ' views');
}

//tallies clicks of pictures
function handleClick(event) {
  // console.log(event.target); // tells us which DOM element was clicked

  if (event.target.id === 'photoSection') {
    alert('Please click on a photo, not the empty space');
    return;
  }

  for (var i = 0; i < allProducts.length; i++) {
    if(event.target.alt === allProducts[i].name) {
      allProducts[i].clicks += 1;
      localStorage.setItem('userResults', JSON.stringify(allProducts));
      updateChartArrays();
    }
  }

  //increments clicks
  totalClicks += 1;



  //stops the cycle at 25
  if (totalClicks > 25){
    photoSection.removeEventListener('click', handleClick);
    resultsButton.hidden = false;
    return;
  }

  previouslyShown = randomNumArray;
  displayThreeImages();

}

function handleResultsButton() {
  drawChart();
  resultsButton.style.visibility = 'hidden';
}




handleLocalStorage();
displayThreeImages();

var photoSection = document.getElementById('photoSection');
photoSection.addEventListener('click', handleClick);

var resultsButton = document.getElementById('resultsButton');
resultsButton.addEventListener('click', handleResultsButton);

//function to calculate click/views percentage
function calcPercentage(){
  for (var i = 0 ; i < allProducts.length ; i ++) {
    var percentage;
    if (allProducts[i].views === 0){
      percentage = 0;
    }
    else {
      percentage = parseInt(Math.floor((allProducts[i].clicks / allProducts[i].views) * 100));
    }
    return percentage;
  }
}


////////chart JS part//////
//chart functions adapted from demo code on class Github
//global variable to grab the canvas from html

//pushes # of clicks and pic names into arrays


function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    clicksArray[i] = allProducts[i].clicks;
    imageNamesArray[i] = allProducts[i].name;
    totalViewsArray[i] = allProducts[i].views;
  }



var resultsDisplay = document.getElementById('resultsDisplay').getContext('2d');

var data = {
  labels: imageNamesArray,
  datasets: [
    {
      label: 'Total Clicks per Picture',
      backgroundColor: [
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
      ],
      borderColor: [
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
        'black',
      ],
      borderWidth: 10,
      data: clicksArray,
    }
  ]
};

function drawChart() {
  var ctx = resultsDisplay;
  voteChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero: true
      }
    }]
 });
}                           
