const mongoose = require("mongoose")

const nameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model("names", nameSchema)
