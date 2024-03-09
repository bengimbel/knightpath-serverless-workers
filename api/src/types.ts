export type Bindings = {
	venteurqueue: Queue<any>
	DB: D1Database;
};

export interface Env {
	venteurqueue: Queue<any>;
	DB: D1Database;
}

export type Coordinate = {
	x: number;
	y: number;
}

export type BoardCoordiantes = {
	source: Coordinate,
	target: Coordinate
}

export type BoardInputLocation = {
	source: string
	target: string
}

export type ProducerMessage = {
	coordinates: BoardCoordiantes,
	uuid: string
}


