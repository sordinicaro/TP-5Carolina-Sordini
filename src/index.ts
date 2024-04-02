import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { info } from "./db/pasteleria.json"
import { userRouters } from "./router/userRouters";
import { cackesRouters } from "./router/cackesRouters";
import morgan from "morgan"

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT_API!;



app.get("/api", (req, res) => {
  res.json(info)
})

app.use("/api/users", userRouters)
app.use("/api/cackes", cackesRouters)


app.use("*", (req, res) => {
  res.status(404).json({ error: "recurso not found" });
});


app.listen(PORT, () => {
  console.log(`SERVER_LISTENING_ON_PORT -> http://localhost:${PORT}`);
});
