var socket = require('socket.io-client')();
var gifshot = require('gifshot');
var hat = require('hat');

// set a random user id
var userID = 'u' + hat();
console.log(userID);

var userContainer = document.createElement('div');
userContainer.setAttribute('id', userID);
document.body.appendChild(userContainer);


var gif = function() {
  gifshot.createGIF({}, function(obj) {
    if(!obj.error) {
      var image = obj.image,
      animatedImage = document.createElement('img');
      animatedImage.src = image;
      userContainer.innerHTML = '';
      userContainer.appendChild(animatedImage);
    }
  });
}

setInterval(function(){
  socket.emit('user gif');
}, 3000);

socket.on('user gif', function(msg){
  gif();
});

// create a gif as soon as a user connects
gif();
