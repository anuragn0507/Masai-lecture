
function myMainFunc(){
    var name = "anurag";
    return function mySecFunc(){
        console.log(name)
    }
    
}

var func = myMainFunc();
func();


function mynew(){
    var name= "anurag Yadav";
    return function sec(){
        console.log(name);
    }
}

var newFunc = mynew();
newFunc();



