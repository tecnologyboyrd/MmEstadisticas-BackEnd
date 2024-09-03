const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    }
});

// Método para personalizar la salida JSON
citySchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.cityId = _id;
    return object;
});

const City = mongoose.model('City', citySchema);
module.exports = City;
