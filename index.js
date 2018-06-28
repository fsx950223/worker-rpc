export const run=(exec,...args)=>{
    var file=new File([`try{var result=eval("(${exec.toString()})(${args})");this.postMessage(result)}catch(err){this.postMessage(err)}`],`${Date.now()+parseInt(Math.random()*10000)}.js`,{
      type: "application/javascript",
    })
    var url=URL.createObjectURL(file)
    var worker=new Worker(url)
    return new Promise((resolve,reject)=>{
        worker.addEventListener('message',(event)=>{
             worker.terminate()
             delete worker
             if(Object.prototype.toString.call(event.data)==="[object Error]"){
                reject(event.data)
             }else{
                resolve(event.data)
             }
        })
    })
   
}