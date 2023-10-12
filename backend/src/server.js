import express, { json } from "express";
const app = express();
const port = 3000;
import { setupDB } from "./config/db.config.js";
import notificationRoutes from "./api/routes/notification.routes.js";



app.use(json());
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Hola mister!");
});

 
app.listen(port, () => {
  console.log(`API de la url http://localhost:${port}`);
  setupDB();
});
