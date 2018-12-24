// This is a faking API. Just to introduce some delay and to demonstrated how async calls work
// and to show how redux thunk makes this very easy task.
import sampleData from './sampleData';

// promise me to execute the function callback that I provide after some delay 
const delay = (milliSec) => {
    return new Promise(someCallbackToResolve => setTimeout(someCallbackToResolve, milliSec) )
}

export const fetchSampleData = () => {
    return delay(1000).then(() => { Promise.resolve(sampleData)})
}

