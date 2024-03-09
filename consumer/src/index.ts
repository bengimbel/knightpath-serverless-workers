import { calculateKnightMoves } from "./calculateKnightPath";
import { Env } from "./types";

export default {
	async queue(batch: MessageBatch<any>, env: Env): Promise<void> {
		for (let message of batch.messages) {
			try {
				const { coordinates, uuid } = message.body
				const shortestKnightPath = calculateKnightMoves(coordinates, uuid)
				const { operationId, shortestPath, numberOfMoves, starting, ending } = shortestKnightPath

				const { success }: D1Response = await env.DB.prepare(`
				insert into knightpath (operationId, shortestPath, numberOfMoves, starting, ending) values (?, ?, ?, ?, ?)
			`).bind(operationId, shortestPath, numberOfMoves, starting, ending).run()
				if (success) {
					console.log("Added queued message to the database")
				}
			} catch (err) {
				console.error(`D1 returned error: ${err}`)
			}
		}
	},
};
