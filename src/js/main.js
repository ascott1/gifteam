var socket = require('socket.io-client')();
var gifshot = require('gifshot');
var hat = require('hat');

// set a random user id
var userID = 'u' + hat();

var container = document.getElementById('users');
var userContainer = document.createElement('div');
var animatedImage = document.createElement('img')
userContainer.setAttribute('id', userID);
container.appendChild(userContainer);

var createGif = function() {
  gifshot.createGIF({}, function(obj) {
    if(!obj.error) {
      var image = obj.image;
      animatedImage.src = image;
    }
  });
  return animatedImage.src;
}

setInterval(function(){
  socket.emit('giffed', createGif(), userID);
}, 3000);

socket.on('giffed', function(img, id){
  var userEl = document.getElementById(id);
  var userImg = document.createElement('img');
  userImg.src = img;

  // if the element doesn't exist, create it
  if (typeof(userEl) === 'undefined' || userEl === null) {
    userEl = document.createElement('div');
    userEl.setAttribute('id', id);
    console.log(userEl);
    console.log('new div created');
    container.appendChild(userEl);
  } else {
    userEl.innerHTML = '';
  }

  userEl.appendChild(userImg);
});

// dirty user removal
socket.on('remove', function(){
  userContainer.innerHTML = '';
});

// create a gif immediately
socket.emit('giffed', createGif(), userID);
