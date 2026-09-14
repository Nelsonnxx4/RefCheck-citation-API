import z from "zod";

export const verificationStatusSchema = z.enum([
	"pending",
	"processing",
	"verified",
	"uncertain",
	"contradicted",
	"failed",
]);

export const createVerificationInputSchema = z.object({
	claimId: z.string().trim().min(1, "Claim ID is required."),
});

export type VerificationStatus = z.infer<typeof verificationStatusSchema>;

export type CreateVerificationInput = z.infer<
	typeof createVerificationInputSchema
>;

export type VerificationRecord = {
	id: string;
	ClaimId: string;
	status: VerificationStatus;
	confidenceScore: number | null;
	summary: string | null;
	message?: string;
	createdAt: string;
	updatedAt: string;
};
