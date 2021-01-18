const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');
const input2 = document.getElementById('expiration');
const expiration = document.getElementById('expiration');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

var today = new Date();
expiration.value = today.toISOString().substr(0, 10);

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const liMaker = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

ul.addEventListener('dblclick', function(e) {
  //console.log(e.target)
  if (e.target.style.textDecorationLine == "line-through") {
    e.target.style.textDecorationLine = "none"
    e.target.style.color = "black"
    food = {
      name: clickedvalue = e.target.textContent.split(' ')[0],
      expdate: e.target.textContent.split(' ')[2]
    }
    newitemsArray.push(food)
    localStorage.setItem('items', JSON.stringify(newitemsArray));

  } else {
  e.target.style.textDecorationLine = "line-through"
  e.target.style.color = "red"
  clickedvalue = e.target.textContent.split(' ')[0]
  newitemsArray = itemsArray.filter(function( obj ) { return obj.name !== clickedvalue; });
  localStorage.setItem('items', JSON.stringify(newitemsArray));
  itemsArray = newitemsArray;
}

})

form.addEventListener('submit', function (e) {
  e.preventDefault();
  food = {
    name: input.value,
    expdate: expiration.value
  }
  itemsArray.push(food);
  itemsArray.sort(function(a, b) {
  a = new Date(a.expdate);
  b = new Date(b.expdate);
  return a - b
  });

  localStorage.setItem('items', JSON.stringify(itemsArray));
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  itemsArray.forEach(item => {
    liMaker(item.name + ' - ' + item.expdate);
  });
  input.value = "";
});

let data2 = data
let sortdata = data2.sort(function(a, b) {
  a = new Date(a.expdate);
  b = new Date(b.expdate);
  return a - b
});

data.forEach(item => {
  liMaker(item.name + ' - ' + item.expdate);
});

button.addEventListener('click', function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  itemsArray = [];
});
