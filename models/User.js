const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: String,
    password: String,
    createdDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", UserSchema);
