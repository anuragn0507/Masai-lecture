
function myMainFunc(){
    var name = "anurag";
    return function mySecFunc(){
        console.log(name)
    }
    
}

var func = myMainFunc();
func();