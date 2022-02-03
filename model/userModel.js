import mongoose from "mongoose"
import validator from "validator"

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: { type: String },
})

export default mongoose.models.User || mongoose.model("User", userSchema)
