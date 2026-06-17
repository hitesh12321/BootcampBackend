class ApiError extends Error {
    constructor(statusCode, message , errors = [] , stack = "") {      
        super(message);

        this.statusCode = statusCode;
        this.success = false; // since this is an error response, success is always false
        this.message = message;
        this.data = null;
        this.errors = errors; // array of error details
        if (stack) {
            this.stack = stack;
        } else {
           Error.captureStackTrace(this, this.constructor);

        }

        
        }

}

module.exports = ApiError;