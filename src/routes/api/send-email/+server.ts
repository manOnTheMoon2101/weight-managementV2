import { RESEND_API_KEY } from "$env/static/private";
import Renderer from "better-svelte-email/render";
import { Resend } from "resend";
import WelcomeEmail from "../../lib/Email.svelte";
const resend = new Resend(RESEND_API_KEY);

const { render } = new Renderer();

export async function POST(r: any) {
	try {
		const nutrients = await r.request.json();
		const email = nutrients.map((x: any) => x.userEmail);
		const html = await render(WelcomeEmail, { props: { nutrients } });
		const { data, error } = await resend.emails.send({
			from: "Weight Management App <onboarding@resend.dev>",
			to: email,
			subject: "Report",
			html: html,
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json({ data });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
