import { randomUUID } from "node:crypto";

import type { ClaimRecord, CreateClaimInput } from "./claims.schema";
import { extractClaimsFromText } from "./claims.extractor";
import type { SourceRecord } from "../sources/sources.schema";
import { sourcesService } from "../sources/sources.service";
import type { VerificationRecord } from "../verification/verification.schema";
import { verificationService } from "../verification/verification.service";

type CreateClaimResult = {
	claim: ClaimRecord;
	verification: VerificationRecord;
	source: SourceRecord | null;
	extractedClaims: string[];
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

		const source = input.sourceUrl
			? await sourcesService.createSource({
					claimId: claim.id,
					url: input.sourceUrl,
				})
			: null;

		const extractedClaims = extractClaimsFromText(input.text);

		return {
			claim,
			verification,
			source,
			extractedClaims,
		};
	},

	async getClaimById(id: string): Promise<ClaimRecord> {
		const claim = claims.get(id);

		if (!claim) {
			throw new ClaimNotFoundError(id);
		}

		return claim;
	},
};
