 getData(function(a){
    getMoreData(a, function(b){
        getMoreData(b, function(c){
            getMoreData(c, function(d){
                getMoreData(d, function(e){
                    console.log(d);
                })
            })
        })
    })
})


async function asyncAwaitVersion(){
    const a = await getData();
    const b = await getMoreData(a)
    const c = await getMoreData(b)
}



async function asyncFunc(){
    const a = await getData();
}