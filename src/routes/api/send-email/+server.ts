import { RESEND_API_KEY } from "$env/static/private";
import Renderer from "better-svelte-email/render";
import { Resend } from "resend";
import WelcomeEmail from "../../lib/Email.svelte";
const resend = new Resend(RESEND_API_KEY);

const { render } = new Renderer();

export async function POST() {
	try {
		const name = "Cleve";
		const html = await render(WelcomeEmail, { props: { name } });
		const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: "clevejohnclayton.2101@gmail.com",
			subject: "Hello world",
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
