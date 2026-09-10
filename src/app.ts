import express from "express";
import { claimsRouter } from "./modules/claims/claims.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/claims", claimsRouter);
app.use(errorHandler);

export default app;
