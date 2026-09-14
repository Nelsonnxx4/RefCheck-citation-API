import { Router } from "express";
import { reportParamsSchema } from "./reports.schema";
import { reportsService } from "./reports.service";

export const reportsRouter = Router();

reportsRouter.get("/:verificationId", async (req, res, next) => {
	try {
		const { verificationId } = reportParamsSchema.parse(req.params);
		const report = await reportsService.generateReport(verificationId);

		return res.status(200).json(report);
	} catch (error) {
		next(error);
	}
});
