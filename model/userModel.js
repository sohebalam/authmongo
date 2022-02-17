import mongoose from "mongoose"
import validator from "validator"

const userSchema = mongoose.Schema(
  {
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
    },
    resetToken: { type: String },
    update: { type: String },
    role: {
      type: String,
      default: ["subscriber"],
      enum: ["admin", "instructor", "subscriber"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model("User", userSchema)
