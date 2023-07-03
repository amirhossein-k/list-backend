const mongoose = require('mongoose')

const Schema  = mongoose.Schema

const listSchema = new Schema({
    title_value: {
        type:String,
        required: true
    },
    price_value: {
        type:String,
        required: true
    },
    priceTo_value: {
        type:String,
        required: true
    },
    describe_value: {
        type:String,
        required: true
    },
    picc: {
        type:Object,
        required: true
    },
    pic_id: {
        type:String,
        required: true
    },

},{timestamps:true})

module.exports = mongoose.model('list',listSchema)