import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import mongoose from "mongoose";
import { registerRoutes } from "./routes";
import errorHandler from "./middleware/error.middleware";

const PORT = config.server.port;

const app: Express = express();

app.use(express.json());
app.use(cors());

// immediately invoked function
(async function startup() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });
    console.log("Connected to MongoDB successfully.");

    app.get("/health", (req: Request, res: Response) => {
      res.status(200).json({ message: `Server is runnnig properly` });
    });

    registerRoutes(app);

    // Error handler middleware should be the last middleware
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is listening on port:${PORT} `);
    });
  } catch (error) {
    console.log(`Could not make a connection to the database : ${error}`);
  }
})();
