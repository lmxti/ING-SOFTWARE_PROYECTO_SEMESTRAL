const { PORT, HOST } = require("./config/env.config");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const indexRoutes = require("./routes/indexRoutes.js");
const { setupDB } = require("./config/db.config.js");
const { handleFatalError, handleError } = require("./utils/errorHandler.js");
const { createPersons, createRoles } = require("./config/initialSetup.js");

async function setupServer() {
  try {
    const server = express();
    server.use(express.json());
    server.use(cors());
    server.use(cookieParser());
    server.use(morgan("dev"));
    server.use(express.urlencoded({ extended: true }));
    server.use("/api", indexRoutes);

    server.listen(PORT, () => {
      console.log(`Server running at http://${HOST}:${PORT}/api`);
    });
  } catch (error) {
    handleError(error, "/server.js -> setupServer()");
  }
}

async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    await createRoles();
    await createPersons();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

setupAPI()
  .then(() => console.log("API iniciada correctamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
