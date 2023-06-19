const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0
  },
  responses: {
    type: String,
    default: {},
    required: false
  }
},{
  timestamps:true,
  // id: true
});

module.exports = mongoose.model("User", userSchema)