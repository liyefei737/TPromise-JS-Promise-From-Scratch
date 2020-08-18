// If a promise object has a state of "Fufilled" or "Rejected", It's "Settled"
const PromiseState = {
    Pending: "Pending",
    Fufilled: "Fufilled",
    Rejected: "Rejected"
}

class TPromise{
    
    constructor(computation) {
        this._state = PromiseState.Pending;
        this._value = null;
        this._reason = null;
    }
    

}




module.exports = TPromise;