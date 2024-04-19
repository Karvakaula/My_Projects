import "dotend/config";
import env from "../util/validate_env";
import mongoose from "mongoose";
import express from "express";
const app = express();
const port = env.PORT;

mongoose
  .connect(env.MONGO_STR)
  .then(() => {
    console.log("Mongo connection established");
    app.listen(port, () => {
      console.log("server running on port: ", port);
    });
  })
  .catch(console.error);
