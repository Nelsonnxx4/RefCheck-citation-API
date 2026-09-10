import { randomUUID } from "node:crypto";

import type {
	VerificationRecord,
	CreateVerificationInput,
} from "./verification.schema";

const verifications = new Map<string, VerificationRecord>();

export const verificationService = {
	async createVerification(
		input: CreateVerificationInput,
	): Promise<VerificationRecord> {
		const id = randomUUID();

		const now = new Date().toISOString();

		const verification: VerificationRecord = {
			id: `verification_${id}`,
			ClaimId: input.claimId,
			status: "pending",
			confidenceScore: null,
			summary: null,
			createdAt: now,
			updatedAt: now,
		};
		verifications.set(verification.id, verification);
		return verification;
	},
};
