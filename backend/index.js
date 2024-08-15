import express from "express";
import ConectToDb from "./DataBase/Database.js";
import userRouter from "./Router/UserRouter.js";
import router from "./Router/PinRouter.js";
import SaveRouter from "./Router/SaveRouter.js";
const app = express();
ConectToDb();
app.use(express.json());
app.use("/user", userRouter);
app.use("/item", router);
app.use("/saveitem", SaveRouter);
app.get("/", (req, res) => {
  res.send("hello World");

});
app.listen(4000, console.log("run"));