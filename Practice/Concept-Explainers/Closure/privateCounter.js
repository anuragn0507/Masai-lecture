function counter(){
    let counter =0;

    return {
        add: function(value){counter = counter +value},
        retrieve: function(){return "The counter value is", counter}
    }
}

let a = counter();
a.add(4);
console.log(a.retrieve());
