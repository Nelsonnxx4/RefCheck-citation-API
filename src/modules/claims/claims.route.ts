import { Router } from "express";
import { claimIdParamsSchema, createClaimBodySchema } from "./claims.schema";
import { claimsService } from "./claims.service";

export const claimsRouter = Router();

claimsRouter.post("/", async (req, res, next) => {
	try {
		const input = createClaimBodySchema.parse(req.body);

		const claim = await claimsService.createClaim(input);

		return res.status(201).json(claim);
	} catch (error) {
		next(error);
	}
});

claimsRouter.get("/:id", async (req, res, next) => {
	try {
		const params = claimIdParamsSchema.parse(req.params);

		const claim = await claimsService.getClaimById(params.id);

		return res.status(200).json(claim);
	} catch (error) {
		next(error);
	}
});
