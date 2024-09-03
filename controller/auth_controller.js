const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/jwt");
const user = require("../models/user");

const createUser = async(req, res = response)=>{
    const {email, password} = req.body;

    try {

        const existEmail = await User.findOne({email});

        if(existEmail){
            return res.status(400).json({
                ok:false,
                msg: 'Email no valid, try with other'
            });
        }


        const user = new User(req.body);


        //Encrypt user Password
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, salt);

        
        await user.save();


        //Generar mi JWT
        const token = await generateJwt(user.id);


        res.json({
            ok: true,
            user,
            token
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'There are an error, contact your administrator',
        });
    }
    
}

const loginUser = async(req, res = response)=>{
    const {email, password} = req.body;

    //Validate User

    try {
        const userDB = await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: 'This email is not valid.'
            });
        }

        //Validate el password
        const validPassword = bcrypt.compareSync(password, userDB.password);


        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'User name or password invalid.'
            });

        }

        //Generate JWT

        const token = await generateJwt(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
            
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Error, contact the administrator'
        });
        
    }


}

const renewToken = async (req, res = response)=>{

    const getUid = req.uid;

    const newJwt = await generateJwt(getUid);

    const getDbUser = await user.findById(getUid);




    res.json({
        ok: true,
        user: getDbUser,
        msg:'Renew Token working.',
        token: newJwt,

    })
}

module.exports={
    createUser,
    loginUser,
    renewToken
};