import connectDB from "../../connectDB"
import User from "../../model/userModel"
import bcrypt from "bcryptjs"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body
      const user = await User.findOne({ email: email })

      if (user) {
        res.status(422).json({ message: "User already exists" })
      }

      console.log(email, password)
      const HashedPassword = await bcrypt.hash(password, 12)
      const newUser = await new User({
        email: email,
        password: HashedPassword,
      }).save()
      res.status(200).json({ message: "Sign Up Sucess" })
    }
  } catch (error) {
    console.log(error)
  }
}
