import { randomUUID } from "node:crypto";
import type { ClaimRecord, CreateClaimInput } from "./claims.schema";

const claims = new Map<string, ClaimRecord>();

class ClaimNotFoundError extends Error {
	statusCode = 404;

	constructor(id: string) {
		super(`Claim with ID "${id}" was not found`);
		this.name = "ClaimNotFoundError";
	}
}

export const claimsService = {
	async createClaim(input: CreateClaimInput): Promise<ClaimRecord> {
		const now = new Date().toISOString();

		const claim: ClaimRecord = {
			id: `claim_${randomUUID()}`,
			...input,
			status: "pending",
			createdAt: now,
			updatedAt: now,
		};

		claims.set(claim.id, claim);

		return claim;
	},

	async getClaimById(id: string): Promise<ClaimRecord | null> {
		const claim = claims.get(id);

		if (!claim) {
			throw new ClaimNotFoundError(id);
		}

		return claim;
	},
};
