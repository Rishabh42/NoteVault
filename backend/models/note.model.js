import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema({
    userId: Schema.Types.ObjectId,
    note: String
});

export const Note = mongoose.model('Note', noteSchema);

