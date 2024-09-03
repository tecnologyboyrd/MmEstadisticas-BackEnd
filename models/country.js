const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

// Método para personalizar la salida JSON
countrySchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.countryId = _id;
    return object;
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
