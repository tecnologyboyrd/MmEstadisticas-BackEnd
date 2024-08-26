const mongoose = require('mongoose');


const dbConnexion = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Connexion worong, talk with admin');
        
    }

}

module.exports={
    dbConnexion
}