import dotenv from "dotenv";

import app from "./app";
import connect from "./utils/database";

const port = process.env.PORT ?? 5000;
const mode = process.env.MODE || "development";

dotenv.config({ path: "./.env" });

connect()
  .then((message) => {
    console.log(message);
    app.listen(port, () => console.log(`App started listening on port: ${port}, on ${mode} mode`));
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
