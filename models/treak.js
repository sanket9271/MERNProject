const mongoose = require('mongoose');

const treakSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    imageurls: [],
    difficulty: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

const treakModel=mongoose.model('treaks',treakSchema);
module.exports=treakModel;