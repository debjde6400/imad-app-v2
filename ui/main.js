console.log('Loaded!');

//change the main text
var element = document.getElementById('main-text');
element.innerHTML = 'A new text';

var img = document.getElementById('madi');
img.onclick = function (){
    img.style.marginLeft = '100px';
    
};