import mongoose from "mongoose";
const MONGO_URI = "mongodb+srv://ovais123raza:ovais@smit.nweyu.mongodb.net/?retryWrites=true&w=majority&appName=SMIT";

const connect = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log("Error Connecting to DB", error.message);
  }
};

export default connect;
