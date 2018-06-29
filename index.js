export const run=(exec,...args)=>{
    const file=new File([`try{const result=(${exec.toString()})(${args});this.postMessage(result)}catch(err){this.postMessage(err)}`],`${Date.now()}${parseInt(Math.random()*10000)}.js`,{
      type: "application/javascript",
    })
    const url=URL.createObjectURL(file)
    const worker=new Worker(url)
    URL.revokeObjectURL(url)
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