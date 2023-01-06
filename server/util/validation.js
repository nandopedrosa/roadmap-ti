class Validation {
    constructor(status, msg = "", payload = null) {
        this.status = status;
        this.msg = msg;
        this.payload = payload;
    }

    static STATUS_OK = "OK";
    static STATUS_ERROR = "ERROR";
    static STATUS_WARNING = "WARNING";

    //Checks if all the parameters are not empty
    static isFilled(params) {
        for (const param of params) {
            if (!param) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Validation;