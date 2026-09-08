import { z } from "zod";

export const claimStatusSchema = z.enum([
	"pending",
	"processing",
	"verified",
	"uncertain",
	"contradicted",
	"failed",
]);

export const createClaimBodySchema = z
	.object({
		text: z
			.string()
			.trim()
			.min(10, "Claim text must be at least 10 characters long.")
			.max(5000, "Claim text must be 5,000 characters or fewer."),
		sourceUrl: z.string().trim().url().optional(),
		pageUrl: z.string().trim().url().optional(),
		pageTitle: z.string().trim().min(1).max(100).optional(),
		selectedHtml: z.string().trim().max(20000).optional(),
		surroundingText: z.string().trim().max(10000).optional(),
		submittedFrom: z.enum(["api", "web", "extension"]).default("api"),
	})
	.strict();

export const claimIdParamsSchema = z.object({
	id: z.string().trim().min(1, "Claim ID is required."),
});

export type ClaimStatus = z.infer<typeof claimStatusSchema>;
export type CreateClaimInput = z.infer<typeof createClaimBodySchema>;
export type ClaimIdParams = z.infer<typeof claimIdParamsSchema>;

export type ClaimRecord = CreateClaimInput & {
	id: string;
	status: ClaimStatus;
	createdAt: string;
	updatedAt: string;
};
