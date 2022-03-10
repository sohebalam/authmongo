import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export default async (req, res) => {
  const { email, password } = req.body

  // console.log(req.body)
  try {
    if (req.method === "POST") {
      if (!email || !password) {
        return res.status(422).json({ error: "please ass all the fields" })
      }
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ error: "Invalid credentials" })
      }
      const doMatch = await bcrypt.compare(password, user.password)
      if (doMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        })

        if (!doMatch) {
          return res.status(401).json({ error: "Invalid credentials" })
        }

        const { email, _id, name } = user

        res.status(201).json({
          token,
          user: { email, _id, name },
          message: "login successful",
        })
      }
    } else {
      return res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (err) {
    console.log(err)
  }
}
