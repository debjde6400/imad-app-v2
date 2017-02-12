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

button.onclick = function(){
    //create a request object, capture the response and store in a variable, render the variable in correct span
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            //take some action
            if(request.status == 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //not done yet
    };
    //make the request
    request.open('GET','http://debjde6400.imad.hasura-app.io/counter',true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');

submit.onclick = function(){
    //create a request object, capture the response and store in a variable, render the variable in correct span
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttpRequest.DONE){
            //take some action
            if(request.status == 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i < names.length; i++){
                    list += '<li>'+names[i]+'</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML= list;
            }
        }
        //not done yet
    };
    //make the request
    request.open('GET','http://debjde6400.imad.hasura-app.io/submit-name?name='+ name,true);
    request.send(null);
};
