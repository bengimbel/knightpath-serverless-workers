import { Env, ProducerMessage } from "./types";

export default {
	async produceMessage(env: Env, msg: ProducerMessage): Promise<Response> {
		await env.venteurqueue.send(msg, { contentType: "json" });
		console.log("Added message to the queue")

		return new Response('Successfully produced message to the queue');
	}
};
