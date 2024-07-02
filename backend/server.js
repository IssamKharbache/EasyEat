import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app configuration

const app = express();

const port = process.env.PORT || 4000;

//middleware

app.use(express.json());
app.use(cors());

//connect to database
connectDB();

//api endpoints
//food api
app.use("/api/food", foodRouter);
//user api
app.use("/api/user", userRouter);
//cart api
app.use("/api/cart", cartRouter);
//order api
app.use("/api/order", orderRouter);

//image api
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => res.send("Api working"));
app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
