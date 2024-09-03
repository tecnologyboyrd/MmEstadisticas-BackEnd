const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChurchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pastor: {
        type: Schema.Types.ObjectId, // Referencia al ID del Pastor
        ref: 'Pastor',
        required: true
    },
    country: {
        type: Schema.Types.ObjectId, // Referencia al ID del Country
        ref: 'Country',
        required: true
    },
    state: {
        type: Schema.Types.ObjectId, // Referencia al ID del State
        ref: 'State',
        required: true
    },
    city: {
        type: Schema.Types.ObjectId, // Referencia al ID del City
        ref: 'City',
        required: true
    }
});

ChurchSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.churchId = _id;
    return object;
});

const Church = mongoose.model('Church', ChurchSchema);
module.exports = Church;
