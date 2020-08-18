const TPromise = require('./TPromise');


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



const fs = require('fs');
const path = require('path');

const readFile = (filename, encoding) => new TPromise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, value) => {
        if (err) {
            return reject(err);
        }
        resolve(value);
    })
});

const delay = (timeInMs, value) => new TPromise(resolve => {
    setTimeout(() => {
        resolve(value);
    }, timeInMs);
});

readFile(path.join(__dirname, 'user_story.md'), 'utf8')
    .then(text => {
        console.log(`${text.length} characters read`);
        return delay(2000, text.replace(/[aeiou]/g, ''));
    })
    .then(newText => {
        console.log(newText.slice(0, 200));
    })
    .catch(err => {
        console.error('An error occured!');
        console.error(err);
    })
    .finally(() => {
        console.log('--- All done! ---');
    });