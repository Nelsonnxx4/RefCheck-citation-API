import axios from "axios";
import * as cheerio from "cheerio";

export type ExtractedSource = {
	title: string | null;
	publisher: string | null;
	extractedText: string | null;
};

export async function extractSourceFromUrl(
	url: string,
): Promise<ExtractedSource> {
	const response = await axios.get<string>(url, {
		timeout: 10000,
		headers: {
			"User-Agent": "RefCheckBot/1.0",
		},
	});

	const html = response.data;
	const $ = cheerio.load(html);

	const title = $("title").first().text().trim() || null;

	const publisher =
		$('meta[property="og:site_name"]').attr("content")?.trim() ||
		$('meta[name="application-name"]').attr("content")?.trim() ||
		null;

	const extractedText =
		$("body").text().replace(/\s+/g, " ").trim().slice(0, 5000) || null;

	return {
		title,
		publisher,
		extractedText,
	};
}
