export interface Params{
    exec:Function;
    callback?:Function;
    keepAlive?:boolean;
}

export const run = (exec:Function|Params, ...args:Array<any>) => {
    let callback
    let keepAlive
    if (typeof exec === "object") {
        keepAlive = exec.keepAlive
        callback = exec.callback
        exec = exec.exec
    }
    return new Promise((resolve, reject) => {
        const file = new File([`try{const result=(${exec.toString()})(${args});this.postMessage(result)}catch(err){this.postMessage(err)}`], `${Date.now()}${(Math.random() * 10000).toFixed(0)}.js`, {
            type: "application/javascript",
        })
        const url = URL.createObjectURL(file)
        const worker = new Worker(url)
        URL.revokeObjectURL(url)
        worker.addEventListener('message', (event) => {
            if (!keepAlive) {
                worker.terminate()
                delete this.worker
            }
            if (callback) {
                callback(event)
            }
            if (Object.prototype.toString.call(event.data) === "[object Error]") {
                reject(event.data)
            } else {
                resolve(event.data)
            }
        })
    })
}