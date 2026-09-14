import { randomUUID } from "node:crypto";

import { extractSourceFromUrl } from "./sources.extractor";
import type { CreateSourceInput, SourceRecord } from "./sources.schema";

const sources = new Map<string, SourceRecord>();

export const sourcesService = {
	async createSource(input: CreateSourceInput): Promise<SourceRecord> {
		const now = new Date().toISOString();

		const extracted = await extractSourceFromUrl(input.url);

		const source: SourceRecord = {
			id: `source_${randomUUID()}`,
			claimId: input.claimId,
			url: input.url,
			title: extracted.title,
			publisher: extracted.publisher,
			extractedText: extracted.extractedText,
			createdAt: now,
			updatedAt: now,
		};

		sources.set(source.id, source);

		return source;
	},
};
