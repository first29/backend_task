import express from 'express';
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();
const port = process.env.PORT||3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoutes);
// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
