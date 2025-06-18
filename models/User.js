const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    accountType: {
        type: String, 
        enum: ["admin", "user"],
        default: "user"
    }
});

module.exports = mongoose.model("SaaS Management", userSchema, "User")