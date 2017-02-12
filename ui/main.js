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

function moveLeft()
{
    marginLeft = marginLeft - 5;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function (){
    var interval;
    while(true)
    {
        if(marginLeft!=400)
        interval = setInterval(moveRight,50);
        else
        interval = setInterval(moveLeft,50);
    }
};