const jwt = require("jsonwebtoken");


const generateJwt=(uid)=>{

    return new Promise ((resolve, reject)=>{
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn:'24h',


        }, (err, token)=>{
            if(err){
                //Can't create token
                reject('We can not generate token');
            }else{
                //Create token
                resolve(token);
                
            }

        })

    })



};


module.exports={
    generateJwt
}