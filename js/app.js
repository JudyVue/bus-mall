'use strict.';

var allProducts = [];

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


console.log(allProducts);
var randomNumArray = [];

function threeRandomNumbers() {
   randomNumArray = [];
   randomNumArray.push(Math.floor(Math.random() * allProducts.length));
   randomNumArray.push(Math.floor(Math.random() * allProducts.length));
   while (randomNumArray[0] === randomNumArray[1]){
     console.log("dup detected with second element.");
     randomNumArray[1] = (Math.floor(Math.random() * allProducts.length));
   }
   randomNumArray.push(Math.floor(Math.random() * allProducts.length));
   while (randomNumArray[1] === randomNumArray[2] || randomNumArray[0] === randomNumArray[2]){
     console.log("dup detected with third element.");
     randomNumArray[2] = (Math.floor(Math.random() * allProducts.length));
   }
   console.log(randomNumArray);
}


function displayThreeImages(){
  threeRandomNumbers();
  //left
  var left = document.getElementById('left');
  left.src = allProducts[randomNumArray[0]].path;

  //center
  var center = document.getElementById('center');
  center.src = allProducts[randomNumArray[1]].path;

  //right
  var right = document.getElementById('right');
  right.src = allProducts[randomNumArray[2]].path;
}

function clearClickedImage (event){
  event.preventDefault();
  event.target.style.visibility = 'hidden';
}


left.addEventListener('click', clearClickedImage);
center.addEventListener('click', clearClickedImage);
right.addEventListener('click', clearClickedImage);

displayThreeImages();
console.log(displayThreeImages().left);
