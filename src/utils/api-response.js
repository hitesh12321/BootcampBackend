class APIResponse{

    constructor(statusCode, message, data){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 300; // if status code is between 200 and 299 then success is true otherwise false 
    }

}

module.exports = APIResponse;