let obj1 ={
    name:"anurag",
    surname:"yadav",
    fullname:function(){
        console.log("name :", this.name+" "+ this.surname);
    }
}

let obj2={
    name:"abhi",
    surname:"silawat",
}

// obj1.fullname();

obj1.fullname.call(obj2);
obj1.fullname.apply(obj2);
let bindFunc = obj1.fullname.bind(obj2);
bindFunc()