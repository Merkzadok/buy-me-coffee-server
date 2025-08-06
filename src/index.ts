import express from "express";
import userRouter from "./router/user.router";
import donationRouter from "./router/donation.router";
import profileRouter from "./router/profile.router";
import bankCardRouter from "./router/bank.router";

const port = 4200;
const app = express();

app.use(express.json());

app.use("/auth", userRouter);

app.use("/profile", profileRouter);

app.use("/donation", donationRouter);

app.use("/bank-card", bankCardRouter);

app.listen(port, async () => {
 
  console.log(`Example app listening on port http://localhost:${port}`);
});
