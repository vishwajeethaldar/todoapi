import dotenv from 'dotenv'

dotenv.config()

let configs = (function (){
    let mongouri = process.env.MONGO_URI;
    let port = process.env.PORT;

    // Zoho Mail Information
    let Z_Mail = process.env.Z_Mail;
    let Z_Mail_Password= process.env.Z_Mail_Pass;
    let Z_Mail_Host= process.env.Z_Mail_Host;
    let Z_Mail_Port = process.env.Z_Mail_Port;
    let Z_Sec_Type = process.env.Z_Sec_Type;

    // JWT Keys
    let jwt_p = process.env.JWTSECRETPRIVATE;
    let jwt_o = process.env.JSWSECRET;

    return {mongouri, port,Z_Mail,Z_Mail_Password,Z_Mail_Host,Z_Mail_Port,Z_Sec_Type, jwt_p, jwt_o};
})()


export default configs