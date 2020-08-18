### TPromise, Javascript Promise class implemented from scratch

`TPromise.js` -> Promise Class
`index.js` -> tests
user stories implemented:

A promise is a object with then method

.then, .catch .finally each returns a new promise

once a value is settled on a promise, it stays the same i.e. keeping calling .then on a resolve promise gives you the same value


the function f user passed into TPromise(f), should be called after the entire code runs through


when the _fufill method is called, the async operation succeeded


support chaning

support multiple .then on a promise


handle the case that no function is given for a .then()


if a user gives a promise object p in resolve, we wait for p to resolve and give out the resolved value of p


a promise either fufills or rejects, have machanism making sure only 1 runs


allow .then after .catch


when the function passed in throws an error, promise rejects
