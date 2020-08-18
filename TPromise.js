// If a promise object has a state of "Fufilled" or "Rejected", It's "Settled"
const PromiseState = {
    PENDING: "Pending",
    FUFILLED: "Fufilled",
    REJECTED: "Rejected"
}

const isObjAPromise = obj => obj && typeof obj.then === "function";

class TPromise {

    constructor(computation) {
        this._state = PromiseState.PENDING;
        this._value = null;
        this._reason = null;
        this.thenQueue = []; // support multiple .then on the promise
        this.catchQueue = []; // support multiple .catch on the promise
        this.finallyQueue = [];
        if (typeof computation === "function") {
            setTimeout(() => {
                try {
                    computation(
                        this._fufill.bind(this),
                        this._reject.bind(this)
                    );
                } catch (error) {
                    this._reject(error);
                }
            })
        }
    }

    then(fufillFn, failFn) {
        const newPromise = new TPromise();
        this.thenQueue.push([newPromise, fufillFn, failFn]);
        return newPromise;


    }

    catch(catchFn) {
        return this.then(undefined, catchFn);
    }

    finally(sideEffectFn) {
        const newPromise = new TPromise();
        this.finallyQueue.push([newPromise, sideEffectFn]);
        return newPromise;
    }

    _fufill(value) {
        this._state = PromiseState.FUFILLED;
        this._value = value;
        this._broadcastFufilledVal();
    }

    _reject(reason) {
        this._state = PromiseState.REJECTED;
        this._reason = reason;
        this._broadcastRejectedReason();
    }

    _broadcastFufilledVal() {
        this.thenQueue.forEach(([childPromise, fufillFn]) => {
            if (typeof fufillFn === 'function') {
                const result = fufillFn(this._value);
                if (isObjAPromise(result)) {
                    // if a promise obj is given to resolve
                    // we wait for that promise to resolve
                    result.then(
                        value => childPromise._fufill(value),
                        reason => childPromise._reject(reason)
                    );
                } else {
                    childPromise._fufill(result);
                }
            } else {
                // no function given to .then
                childPromise._fufill(this._value);
            }
        })

        // the first fufill or reject takes precendence
        // the fufills or rejects that follow will get empty array 
        this.thenQueue = [];

        this.finallyQueue.forEach(([childPromise, sideEffectFn]) => {
            sideEffectFn();
            childPromise._fufill(this._value);
        });
        this.finallyQueue = [];

    }

    _broadcastRejectedReason() {
        this.thenQueue.forEach(([childPromise, _, catchFn]) => {
            if (typeof catchFn === 'function') {
                const result = catchFn(this._reason);
                if (isObjAPromise(result)) {
                    result.then(
                        value => childPromise._fufill(value),
                        reason => childPromise._reject(reason)
                    );
                } else {
                    // this allows .then after .catch
                    childPromise._fufill(result);
                }
            } else {
                // no function given to .then
                childPromise._reject(this._reason);
            }
        })
        this.thenQueue = [];

        this.finallyQueue.forEach(([childPromise, sideEffectFn]) => {
            sideEffectFn();
            childPromise._reject(this._value);
        });
        this.finallyQueue = [];

    }
}


module.exports = TPromise;