import dotenv from "dotenv";
import cors from "cors";
import express, { Express } from "express";

import accountRoutes from "./routes/account.routes";

dotenv.config(); // to use the .env file

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(cors(corsOptions)); // to allow cross-origin requests

app.use("/api", accountRoutes);

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

// connect to MongoDB and starting the server
startServer();
