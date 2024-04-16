import mongoose from "mongoose";
import  dotenv from "dotenv";
dotenv.config();
const url = process.env.CONNECTION_URL;

const connectionFunc = async () => {
  try {
    await mongoose.connect(`${url}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        dbName: 'DataVisualization'
      });
    console.log("Successfully connected to database")
  } catch (error) {
    console.log("this is error", error);
  }
}

export default connectionFunc;