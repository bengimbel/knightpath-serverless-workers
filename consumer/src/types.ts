export interface Env {
	venteurqueue: Queue<any>;
	DB: D1Database;
}

export type KnightPath = {
	shortestPath: string
	numberOfMoves: number;
	starting: string;
	ending: string;
	operationId: string;
}

export type Coordinate = {
	x: number;
	y: number;
}

export type BoardCoordiantes = {
	source: Coordinate,
	target: Coordinate
}

export type KnightMoves = [number, number];

export type KnightCoordinates = {
	currentCoordinates: KnightMoves,
	pastCoordinates: KnightMoves[],
}
