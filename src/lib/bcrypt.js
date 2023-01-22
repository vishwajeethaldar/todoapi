import bcrypt from "bcrypt"


const hashPwd = (()=>{

    const hash = async(password)=>{
        const saltOrRounds = 10;
        try {
            const hashed = await bcrypt.hash(password, saltOrRounds);
            return hashed
        } catch (error) {
            return error.message
        }
    } 
    
    const verify = async(hashedPwd, password)=>{
       try {
             return (await bcrypt.compare(password,hashedPwd));
       } catch (error) {
            return error.message
       }    
    }

    return {
        hash, verify
    }
})()


export default hashPwd