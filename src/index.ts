import express from "express";
import userRouter from "./router/user.router";
import donationRouter from "./router/donation.router";
import profileRouter from "./router/profile.router";

const port = 4200;
const app = express();


app.use(express.json());

app.use("/user", userRouter);

app.use("/profile", profileRouter);

app.use("/donation", donationRouter);

app.listen(port, async () => {
  //   await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});
