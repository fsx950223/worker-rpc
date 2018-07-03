## Principle
Use Browser File System generate a blob file to create a worker and run function in the worker, you can concurrent exec function in different workers. 
## Target
To solve webpack problems with worker-loader,just like bundle size and window is not defined,etc.
## Usage
``` sh
npm install worker-run
```
### simple
``` js
import {run} from 'worker-run'
function a(){console.log(123);return 123}
run(a).then(val=>console.log(val))
```
### keepAlive
When you set keepAlive to true,worker will run until page closed. 
``` js
import {run} from 'worker-run'
function a(val){setInterval(()=>console.log(val),1000);return val+1}
run({exec:a,keepAlive:true},123).then(val=>console.log(val))
```
### callback
Callback will be called when worker received message event
``` js
import {run} from 'worker-run'
function a(val){setInterval(()=>console.log(val),1000);return val+1}
function b(event){console.log(event)}
run({exec:a,keepAlive:true,callback:b},123).then(val=>console.log(val))
```