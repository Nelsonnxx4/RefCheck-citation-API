import express from "express";
import { claimsRouter } from "./modules/claims/claims.route";

const app = express();

app.use(express.json());
app.use("/claims", claimsRouter);

export default app;
