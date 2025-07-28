import express from "express";

const port = 4200;
const app = express();

app.listen(port, async () => {
  //   await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});
