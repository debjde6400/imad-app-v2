console.log('Loaded!');

//change the main text
var element = document.getElementById('main-text');
element.innerHTML = 'A new text';

var img = document.getElementById('madi');
var marginLeft = 0;

function moveRight()
{
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}


img.onclick = function (){
    var interval = setInterval(moveRight,50);
};

var button = document.getElementById('counter');
var counter = 0;
button.onclick = function(){
    //make a request to the counter endpoint, capture the response and store in a variable, render the variable in correct span
    
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    
};