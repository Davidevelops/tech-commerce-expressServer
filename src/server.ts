import { connectToDB } from "./config/db";
import app from "./app";

connectToDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log("server running on port: ", process.env.PORT)
  );
});
