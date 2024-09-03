/* 
    {
        "name": "Candido Poleno HP",
        "lastName": "Hernandez",
        "degree": "Grado 7"
    }

*/


const mongoose = require('mongoose');
const { Schema } = mongoose;

const PastorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    degree: {
        type: String,  // Asegúrate de que es 'String'
        required: true
    }
});

PastorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.pastorId = _id;  // Renombramos _id a pastorId
    return object;
});

const Pastor = mongoose.model('Pastor', PastorSchema);
module.exports = Pastor;
