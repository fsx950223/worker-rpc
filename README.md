## Principle
Use Browser File System generate a blob file to create a worker and run function in the worker, you can concurrent exec function in different workers. 
## Target
To solve webpack problems with worker-loader,just like bundle size and window is not defined,etc.
## Usage
``` sh
npm install worker-run
```
``` js
import {run} from 'worker-run'
function a(){console.log(123);return 123}
run(a).then(val=>console.log(val))
```