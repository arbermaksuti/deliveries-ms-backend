import mongoose from "mongoose";

function connect(): Promise<string> {
  const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;

  const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

  return new Promise((resolve, reject) => {
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        resolve("Successfully connected to database.");
      })
      .catch((error) => {
        reject("Failed to connect to database.");
        console.log(error);
      });
  });
}

export default connect;
