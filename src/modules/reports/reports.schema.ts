import { z } from "zod";

export const reportParamsSchema = z.object({
	verificationId: z.string().trim().min(1, "Verification ID is required."),
});

export type ReportParams = z.infer<typeof reportParamsSchema>;
