const { response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = (req, res = response, next)=>{

    const token = req.header('x-token');

    console.log(token);

    if(!token){
        res.status(401).json({
            ok:false,
            msg: 'You do not have token.'
        });
    }
    
    try {

        const {uid} = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;
        
        next();
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg: 'You do not have authorization.'
        });
    }
    
    

}


module.exports={
    validarJWT
}