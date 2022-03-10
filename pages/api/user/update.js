import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export default async (req, res) => {
  const { email, update } = req.body

  //   console.log(req.body)

  try {
    if (req.method === "PUT") {
      const user = await User.findOne({ email })

      user.update = update

      const updatedUser = await user.save()

      return res.status(200).json({ message: updatedUser })
    } else {
      return res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (err) {
    console.log(err)
  }
}
