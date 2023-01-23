import {User, Token, Blockedtoken} from '../models/index.js';
import {hashPwd,sendEmail, joseJwt} from '../lib/index.js';

// Auth Controller
const authC = (()=>{

    // Sign in Controller 
    const signIn = async(email, password)=>{
        

        let existuser = await User.findOne({email:email});
        
        if(!existuser){
            return {code:404, data:"Email Not Registered"}
        }

        if(existuser.accountStatus==="blocked"){
            return {code:401, data:"Account is terminated, contact admin "}
        }

        if(existuser.accountStatus==="hold"){
            let emailstatus = await sendOtp(email, "Validate your email", "OTP to validate your account")
            if(emailstatus.status){
                return {code:403, data:"Email sent to your Registered Account"}
            }
        }

        let varifyPassword = await hashPwd.verify(existuser.password, password)
        
        if(!varifyPassword){
            return {code:401, data:"Invalid credintials, incorrect password"}
        }

        // payload for jwt token
        let payload = {email:email,id:existuser._id, role:existuser.role}

        // access token
        let accessToken  = await joseJwt.sing(payload, "access")
        // refresh token
        let refreshToken  = await joseJwt.sing(payload, "refresh")
        
        let isTokenExist = await Token.findOne({user:existuser._id})
        
        if(!isTokenExist){
            // storing refresh token into database
            let token = new Token({user:existuser._id, refreshToken:refreshToken})
            await token.save();
        }else{
            await Token.findOneAndUpdate({user:existuser._id}, {$set:{refreshToken:refreshToken}})
        }
        // return access token to user
        return {code:200, data:accessToken}
    }


    // Sign out
    const signOut = async(userid, accessToken)=>{
        
        let user = await User.findOne({_id:userid})
        
        if(!user){
            return {code:404, data:"user not exists"}
        }

        // Delete Refresh Token
        await Token.findOneAndDelete({user:userid})
    
        // Add Access Token into Blocked Token List

        let blockedToken = await Blockedtoken.findOne({user:userid})

        if(blockedToken){
            await Blockedtoken.findOneAndUpdate({user:userid}, {$push:{access:accessToken}})
        }else{
            blockedToken = await Blockedtoken.create({user:userid})
            await Blockedtoken.findOneAndUpdate({user:userid}, {$push:{access:accessToken}})
        }

        // return success msg
        return {code:200, data:"Logged out successfully"}
    }


    // Send an OTP
    const sendOtp = async (email, subject, body)=>{

       try {

        let isUserExist = await User.findOne({email:email}) 
        if(!isUserExist){
            return {
                code:404, data:"email not registered"
            }
        }

         // Generating an OTP
         let otp = Math.floor(Math.random()*(999999-111111)+111111);
 
         body = `${body} ${otp}`
         let res =  await sendEmail(email, subject, body)
        
         if(res.status){
            await User.findOneAndUpdate({email:email}, {$set:{otp:otp}})
            return {status:true, data:"OTP Send Successfully!"}
         }else{
            return {status:false, data:`Email Error! ${res.msg}`}
         }

       } catch (error) {
        return {code:false, data:`Internal Server Error ${error.message}`}
       }
    }


    // Generate a Refresh Token

    const generateRefreshToken = async(token, userid)=>{
        let decoded = await joseJwt.verify(token, "access")
        
        if(decoded){
           return {code:200, data:decoded.payload}     
        }

        let refreshToken = await Token.findOne({user:userid})

        decoded = await joseJwt.verify(refreshToken.refreshToken, "refresh")

        if(!decoded){
            return {code:403, data:"Session out! please login again"}
        }

        let user = await User.findOne({_id:userid})

        let payload = {id:user._id, role:user.role, email:user.email}

        token = await joseJwt.sing(payload, "access")

        return {code:200, data:{token:token, decoded:token.payload}}
    }
    return {
        signIn,
        signOut,
        sendOtp,
        generateRefreshToken
    }
})()


export default authC;