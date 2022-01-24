import mongoose from "mongoose"

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => console.log("connected to DB"))
}

export default connectDB
