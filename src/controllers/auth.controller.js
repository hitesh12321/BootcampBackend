const User = require("../models/user.models");
const ApiError = require("../utils/error-response");
const asyncHandler = require("../utils/async-error-handler");
const APIResponse = require("../utils/api-response");
const { sendEmail, emailverificationContent } = require("../utils/mail");

const generateAccessAndRefereshToken = async (userId)=>{

    try {
        const user = await User.findById(userId);
        if(!user){
            throw new ApiError(404 , "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});
        return {
            accessToken,
            refreshToken
        }
        
    } catch (error) {
        throw new ApiError(500 , 'something went wrong while generating access and refresh token ');
    }

};

const registerUser = asyncHandler(async (req, res) => {

    const {email , username , password , fullname , role } = req.body;

 const Exiteduser =  await  User.findOne({
        $or : [{email} , {username}]
    })

    if(Exiteduser){
        throw new ApiError(400 , "User already exists");
    }
    const user = await User.create({
        email,
        username,
        password,
        fullname,
        isEmailVerified : false,
    });
   const {unHanshedToken , hashedToken , tokenExpiry } =  user.generateTemporaryToken();
   user.emailVerificationToken = hashedToken;
   user.emailVerificationExpiry = tokenExpiry;
   await user.save({validateBeforeSave : false});

   await sendEmail({
    email : user.email,
    subject : "Please Verify your Email ",
    mailgenContent : emailverificationContent(user.username , `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHanshedToken}`)
   });

  const createdUser =  await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");
  if(!createdUser){
    throw new ApiError(500 , "Something went wrong while creating user");
  
  }

  return res.status(201).json(new APIResponse(200 , "User created successfully and Verification Email has been sent to your email" , {user : createdUser}));
});

module.exports = {
    registerUser,
    generateAccessAndRefereshToken
}