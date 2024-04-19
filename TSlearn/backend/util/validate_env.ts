import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";
import { port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_STR: str(),
  PORT: port(),
});
