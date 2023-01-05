const nameObj={
    naam:"Anurag",
    place:"Bhopal",
    fullname:function(state, country){
        console.log(`My name is ${this.naam} i am from ${this.place} state is ${state} and ${country}`);
    }
}

const newObj={
    naam:"anu",
    place:"Bhojpal"
}

nameObj.fullname.call(newObj);