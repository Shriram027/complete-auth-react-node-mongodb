import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hackers know about our stack

const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("Home page...!");
});

/**Api routes */
app.use('/api', router);


/**Start server after successfully connected to the database */

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server conncted to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Unable to connect from server...!");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
