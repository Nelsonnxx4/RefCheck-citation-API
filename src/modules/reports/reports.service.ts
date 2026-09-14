import { verificationService } from "../verification/verification.service";

export const reportsService = {
	async generateReport(verificationId: string) {
		const verification =
			await verificationService.getVerificationById(verificationId);

		return {
			verificationId: verification.id,
			claimId: verification.ClaimId,
			status: verification.status,
			confidenceScore: verification.confidenceScore,
			summary: verification.summary,
			message:
				verification.status === "pending"
					? "Verification has not completed yet."
					: "Verification report is ready",
			createdAt: verification.createdAt,
			updatedAt: verification.updatedAt,
		};
	},
};
