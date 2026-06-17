const APIResponse = require('../utils/api-response');
const asyncHandler = require('../utils/async-error-handler');

const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new APIResponse(200, "Health check successful", null));
});

module.exports = { healthCheck };

// const healthCheck = async(req, res , next) => {

//     try {
//
//         // we get response in form of json data , as format we defined in APIResponse
//         res.status(200).json(new APIResponse(200, "Health check successful", null)); 
//     } catch (error) {
//         // res.status(500).json(new ApiError(500, "Health check failed", [], error.stack));
//         next(error); // pass the error to the next middleware (error handling middleware)
//     }


// }

