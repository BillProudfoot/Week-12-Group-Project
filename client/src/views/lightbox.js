var LightBox = function(){
  this.showOnClick();
}

LightBox.prototype = {
  showOnClick: function(){
    var lightBox = document.querySelector("#chart-lightbox");
    lightBox.addEventListener('click', function(){
      lightBox.style.display = 'none';
    })
  }
}





module.exports = LightBox;
