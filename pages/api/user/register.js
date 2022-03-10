import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import { sendEmail } from "../../../helpers/sendMail"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password, firstName, lastName } = req.body

      // console.log(email, password, firstName, lastName)

      const user = await User.findOne({ email: email })

      if (user) {
        return res.status(422).json({ error: "User already exists" })
      }

      const HashedPassword = await bcrypt.hash(password, 12)
      const newUser = await new User({
        email: email,
        password: HashedPassword,
        name: `${firstName} ${lastName}`,
      }).save()

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      })

      console.log(token)

      newUser.emailToken = token
      await newUser.save()

      const { origin } = absoluteUrl(req)
      const link = `${origin}/src/user/email/${token}`

      const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`

      // console.log("message", message)

      // console.log("here")

      await sendEmail({
        to: newUser.email,
        subject: "Password Reset",
        text: message,
      })

      return res.status(200).json({
        message: `Email sent to ${newUser.email}, please check your email`,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
