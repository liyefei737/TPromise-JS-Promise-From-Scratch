const TPromise = require('./TPromise.js');


const p = new TPromise((resolve, reject) => {

    setTimeout(() => {
        resolve(3);
    }, 1);
});


const then1 = p.then(v => console.log(v + 1));
const then2 = p.then(v => console.log(v + 2));


const then3 = p.then(v => { console.log(v + 1); return v + 1; });
const then4 = then3.then(v => console.log(v + 1));



const q = new TPromise((resolve, reject) => {

    setTimeout(() => {
        reject("something went wrong");
    }, 1);
});

const catchPromise = q.catch((reason) => {
    console.log(reason);
    return 66;
});


catchPromise.then((val) => {
    console.log(val);
})


const pThrowError = new TPromise((resolve, reject) => {
    throw Error("some error");
});

pThrowError.catch((err) => {
    console.log(`err is ${err}`);
});
