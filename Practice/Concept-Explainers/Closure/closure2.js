let result =[];

for (var i=0; i<5; i++){
    result[i] = function(){
        console.log(i);
    }
}

result[1]();
result[2]();
result[3]();

for (let i=0; i<5; i++){
    result[i] = function(){
        console.log(i);
    }
}

result[1]();
result[2]();
result[3]();