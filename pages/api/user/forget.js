import connectDB from "../../../connectDB"
import User from "../../../model/userModel"
import jwt from "jsonwebtoken"
import absoluteUrl from "next-absolute-url"
import { sendEmail } from "../../../helpers/sendMail"

connectDB()

export default async (req, res) => {
  console.log(req.body)

  try {
    if (req.method === "POST") {
      const { email } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        res.status(404).json({ error: "email not found" })
      }

      console.log(user)

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      })

      // console.log(token)

      user.resetToken = token
      await user.save()

      const { origin } = absoluteUrl(req)
      const link = `${origin}/src/user/reset/${token}`

      const message = `<div>Click on the link below to reset your password, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`

      // console.log("message", message)

      // console.log("here")

      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message,
      })

      return res.status(200).json({
        message: `Email sent to ${user.email}, please check your email`,
      })
    }
  } catch (error) {
    console.log(error)
  }
}
