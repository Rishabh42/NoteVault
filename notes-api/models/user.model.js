import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    publicAddress: {
        type: String,
        unique: true
    },
    nonce: {
        type: Number,
        required: true,
        default: () => Math.floor(Math.random() * 1000000)
    }
})
export const User = mongoose.model('User', userSchema);

