'use strict.';

//global variable to grab the canvas from html
var resultsDisplay = document.getElementById('resultsDisplay').getContext('2d');


var allProducts = [];

var totalClicks = 0;

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('dogDuck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('monster', 'img/monster.jpg');
new Product('pen', 'img/pen.jpg');
new Product('petSweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.jpg');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.jpg');
new Product('waterCan', 'img/water-can.jpg');
new Product('wineGlass', 'img/wine-glass.jpg');

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
      console.log(allProducts[i].name + ' has ' + allProducts[i].clicks + ' clicks');
    }
  }

  //increments clicks
  totalClicks += 1;
  console.log('There have been ' + totalClicks + ' total clicks');

  //stops the cycle at 25
  if (totalClicks > 24) {
    photoSection.removeEventListener('click', handleClick);
    console.log('max number of clicks reached');
    resultsButton.hidden = false;
    return;
  }

  previouslyShown = randomNumArray;
  displayThreeImages();
}

function handleResultsButton() {
  alert('this is when you draw the chart');
}

// Executing code below
displayThreeImages();

var photoSection = document.getElementById('photoSection');
photoSection.addEventListener('click', handleClick);

var resultsButton = document.getElementById('resultsButton');
resultsButton.addEventListener('click', handleResultsButton);
