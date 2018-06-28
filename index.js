export const run=(exec)=>{
    var file=new File(['this.addEventListener("message",(event)=>{try{var result=eval("("+event.data+")()");this.postMessage(result)}catch(err){this.postMessage(err)}})'],`${Date.now()+parseInt(Math.random()*10000)}.js`,{
      type: "application/javascript",
    })
    var url=URL.createObjectURL(file)
    var worker=new Worker(url)
    return new Promise((resolve,reject)=>{
        worker.postMessage(exec.toString())
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