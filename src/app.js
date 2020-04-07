import express from "express";
import cors from "cors";
import routes from "./routes";

import "./database/index";

const app = express();

var corsOptions = {
  origin: `https://web-bethehero.herokuapp.com/`,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

export default app;
