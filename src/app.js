import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import indentificadorDeErro from "./middlewares/identificadorDeErro.js";
import menssagem404 from "./middlewares/menssagem404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(menssagem404);

app.use(indentificadorDeErro);

export default app;