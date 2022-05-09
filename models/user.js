const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, required: true, maxlength: 30},
        password: { type: String, required: true },
        member: { type: Boolean, required: true },
        admin: { type: Boolean, required: true },
        profpic: { type: String, required: true }
    }
);

module.exports = mongoose.model("User", UserSchema);