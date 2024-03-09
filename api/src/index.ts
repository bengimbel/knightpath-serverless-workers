import { Hono } from 'hono';
import { v4 as uuidv4 } from 'uuid';
import {
	Bindings,
	BoardCoordiantes,
	ProducerMessage
} from './types';
import {
	areCoordinatesValid,
	mapLetterToCoordinate
} from './utils';
import producer from './producer';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
	return c.json({ Status: "HEALTHY" });
});

app.post('/knightPath', async (c) => {
	const { source, target } = c.req.query()

	if (!source || !target) {
		return c.json({
			status: 400,
			message: "Bad Request: Please provide source and target query params.",
		})
	}

	if (!areCoordinatesValid(source, target)) {
		return c.json({
			status: 400,
			message: "Bad Request: Coordinates are not valid.",
		})
	}


	try {
		const uuid = uuidv4()
		const coordinates: BoardCoordiantes = mapLetterToCoordinate({ source, target })
		const coordinatesProducerMessage: ProducerMessage = {
			uuid,
			coordinates
		}
		await producer.produceMessage(c.env, coordinatesProducerMessage)

		return c.json({
			operationId: uuid,
			message: `Operation Id: ${uuid} was added to the queue. Please query it to find your results.`
		});
	} catch (e: any) {
		throw new Error(e.message)
	}
});

app.get('/knightPath', async (c) => {
	const { operationId } = c.req.query()
	try {
		const record = await c.env.DB.prepare(`
    select * from knightpath where operationId = ?
  `).bind(operationId).first()

		return c.json({
			...record
		});
	} catch (e: any) {
		throw new Error(e.message)
	}
});

app.onError((e, c) => {
	return c.json(
		{
			status: 500,
			message: e.message
		},
	);
});

export default app

