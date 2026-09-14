import express from "express";
import { claimsRouter } from "./modules/claims/claims.route";
import { reportsRouter } from "./modules/reports/reports.route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/claims", claimsRouter);
app.use("/api/reports", reportsRouter);
app.use(errorHandler);

export default app;
