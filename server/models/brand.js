const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name:{
        require:true,
        type: String,
        unique: 1,
        maxlenght: 100
    }
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = {
    Brand
};