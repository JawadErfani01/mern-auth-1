import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

// app.get("/", (req, res) => {
//   // Set a new cookie with the name 'test' and the value 'Hello, World!'
//   res.cookie("test", "Hello, World!");
//   res.cookie("auth", "true", { httpOnly: true });

//   // Send a response to inform the user that the cookie has been set
//   res.send("Cookie has been set!");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
