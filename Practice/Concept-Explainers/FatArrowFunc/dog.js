
let dog={
    count:3,
    jumps:()=>{
        this.count
        console.log("this is", this);
    }
}

console.log(dog.jumps());