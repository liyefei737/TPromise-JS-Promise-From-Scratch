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
        if (typeof computation === "function") {
            setTimeout(() =>{
                try {
                    computation(
                        this._fufill.bind(this),
                        this._reject.bind(this)
                    );
                } catch (error) {
                    
                }
            })
        }
    }
    

}




module.exports = TPromise;