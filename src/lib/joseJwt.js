import * as jose from 'jose'
import configs from '../config/locals.js'

// secret key for access token
export const secret = new TextEncoder().encode(configs.jwt_p)
// secret for refresh token
export const secret2 = new TextEncoder().encode(configs.jwt_o)

let alg = 'HS256'

const joseJwt = {

    sing: async function name(payload, type) {
        let token =""
        
        if(type==="access"){
            token = await new jose.SignJWT(payload).setProtectedHeader({ alg }).setExpirationTime('1h').sign(secret2)
            
        }else{
            token = await new jose.SignJWT(payload).setProtectedHeader({ alg }).setExpirationTime('24h').sign(secret)
            
        }
        return token;
    },
    verify:async function(token, type){
        if(type==="access"){
            let x = await jose.jwtVerify(token, secret2)
            return x
        }else{
            let x = await jose.jwtVerify(token, secret)
            return x
        }
    }


}

export default joseJwt