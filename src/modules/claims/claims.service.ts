import { randomUUID } from "node:crypto";
import type { ClaimRecord, CreateClaimInput } from "./claims.schema";
import type { VerificationRecord } from "../verification/verification.schema";
import type { SourceRecord } from "../sources/sources.schema";
import { verificationService } from "../verification/verification.service";
import { sourcesService } from "../sources/sources.service";

type CreateClaimResult = {
	claim: ClaimRecord;
	verification: VerificationRecord;
	sources: SourceRecord;
};

const claims = new Map<string, ClaimRecord>();

class ClaimNotFoundError extends Error {
	statusCode = 404;

	constructor(id: string) {
		super(`Claim with ID "${id}" was not found`);
		this.name = "ClaimNotFoundError";
	}
}

export const claimsService = {
	async createClaim(input: CreateClaimInput): Promise<CreateClaimResult> {
		const now = new Date().toISOString();

		const claim: ClaimRecord = {
			id: `claim_${randomUUID()}`,
			...input,
			status: "pending",
			createdAt: now,
			updatedAt: now,
		};

		claims.set(claim.id, claim);

		const verification = await verificationService.createVerification({
			claimId: claim.id,
		});

		const sourceUrl = input.sourceUrl;
		if (!sourceUrl) {
			throw new Error("Claim sourceUrl is required");
		}

		const source = await sourcesService.createSource({
			claimId: claim.id,
			url: sourceUrl,
		});

		return { claim, verification, sources: source };
	},

	async getClaimById(id: string): Promise<ClaimRecord | null> {
		const claim = claims.get(id);

		if (!claim) {
			throw new ClaimNotFoundError(id);
		}

		return claim;
	},
};
