import { z } from "zod";

export const createSourceInputSchema = z.object({
	claimId: z.string().trim().min(1, "Claim ID is required."),
	url: z.string().trim().url("Source URL must be a valid URL."),
});

export type CreateSourceInput = z.infer<typeof createSourceInputSchema>;

export type SourceRecord = {
	id: string;
	claimId: string;
	url: string;
	title: string | null;
	publisher: string | null;
	extractedText: string | null;
	createdAt: string;
	updatedAt: string;
};
