import connectDB from "../../../../connectDB"
import User from "../../../../model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"

connectDB()

export default async (req, res) => {
  const { token } = req.query

  const { password, conPassword } = req.body

  if (password !== conPassword) {
    return res.status(400).json({ message: "Passwords do not match" })
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password needs to be at least 6 characters" })
  }

  if (token) {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
  }

  const user = await User.findById(req.user._id)

  if (user) {
    user.password = await bcrypt.hash(password, 12)

    user.resetToken = undefined
    await user.save()

    return res.status(200).json({ message: "success in updating user" })
  }
}
