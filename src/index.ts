import express from "express";
import userRouter from "./router/user.router";
import donationRouter from "./router/donation.router";
import profileRouter from "./router/profile.router";
import bankCardRouter from "./router/bank.router";
import cors from "cors";

const port = 4200;
const app = express();
app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/profile", profileRouter);

app.use("/donation", donationRouter);

app.use("/bank-card", bankCardRouter);

app.listen(port, async () => {
  //   await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});
