let cors = require("cors");
import express from "express";
import swaggerDocs from "./utils/swagger";
import users from "./routes/users.routes";
import categories from "./routes/categories.routes";
import centreinteret from "./routes/centreInteret.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
  })
);

categories(app);
centreinteret(app);
users(app);

swaggerDocs(app);
const port = process.env.PORT;

app.use("/", (req, res) => {
  res.send(`api ${port} et la documentation se trouve <a href="/docs">ici</a>`);
});

app.use(({ res }) => {
  res?.status(404).json({
    message: "impossible de trouver la ressousrce demandé",
  });
});

export default app;
