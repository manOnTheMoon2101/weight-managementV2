import { NINJA } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
	try {
		const query = url.searchParams.get("query");

		
		if (!query) {
			return json({ error: "Query parameter is required" }, { status: 400 });
		}

		const response = await fetch(
			`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
			{
				headers: {
					"X-Api-Key": NINJA,
				},
			}
		);

	

		if (!response.ok) {
			const errorText = await response.text();
		
			throw new Error(`CalorieNinjas API error: ${response.status} - ${errorText}`);
		}

		const data = await response.json();

		return json(data);
	} catch (error) {
	
		return json(
			{ error: "Failed to fetch nutrition data" },
			{ status: 500 }
		);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { query } = await request.json();

		if (!query) {
			return json({ error: "Query is required in request body" }, { status: 400 });
		}
		const response = await fetch(
			`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
			{
				headers: {
					"X-Api-Key": NINJA,
				},
			}
		);



		if (!response.ok) {
			const errorText = await response.text();
			
			throw new Error(`CalorieNinjas API error: ${response.status} - ${errorText}`);
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		return json(
			{ error: "Failed to fetch nutrition data" },
			{ status: 500 }
		);
	}
};