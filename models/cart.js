var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    userID : {
        required: true,
        type : String
    },
    burger : {
        required: true,
        type : Array
    },
    price : {
        required: true,
        type: Number
    },
    description : {
        required: true,
        type: Object
    },
    amount : {
        required: true,
        type: Number,
        default : 1
    },
    total : {
        required: true,
        type: Number
    },
});

module.exports = mongoose.model('Cart', cartSchema);