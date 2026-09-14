export function extractClaimsFromText(text: string): string[] {
	return (
		text
			.match(/[^.!?]+[.!?]?/g)
			?.map((claim) => claim.replace(/\s+/g, " ").trim())
			.filter((claim) => claim.length >= 10) ?? []
	);
}
