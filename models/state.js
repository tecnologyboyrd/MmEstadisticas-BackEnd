const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    }
});

// Método para personalizar la salida JSON
stateSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.stateId = _id;
    return object;
});

const State = mongoose.model('State', stateSchema);
module.exports = State;
