import {User, Label, Todo} from '../models/index.js';
import {hashPwd,sendEmail} from '../lib/index.js';
import { config } from '../config/index.js';

const authC = (()=>{
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
        return {code:200, data:"Logged in Successfull"}
    }

    const signOut = async(userid)=>{
            
    }

    const sendOtp = async (email, subject, body)=>{

       try {

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

    const validateOtp = ()=>{
        
    }

    return {
        signIn,
        signOut,
        sendOtp,
        validateOtp
    }
})


export default authC;