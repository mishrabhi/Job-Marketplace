const mongoose = require('mongoose');

const newCompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Company name is required"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    description: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["company"],
        default: "company"
    }
},
{timestamps: true}
)

module.exports = mongoose.model("Company", newCompanySchema)



