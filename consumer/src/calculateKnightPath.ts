import { BOARD_SIZE, directions, numberToLetter } from "./constants";
import { BoardCoordiantes, KnightCoordinates, KnightMoves, KnightPath } from "./types";

export const calculateKnightMoves = (boardCoordiantes: BoardCoordiantes, uuid: string): KnightPath => {
	let visited: boolean[][] = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(false));
	const x = boardCoordiantes.target.x
	const y = boardCoordiantes.target.y

	let numberOfMoves: number = 0;
	let coordinateQueue: KnightCoordinates[] = [
		{
			currentCoordinates: [
				boardCoordiantes.source.x,
				boardCoordiantes.source.y
			],
			pastCoordinates: [
				[
					boardCoordiantes.source.x,
					boardCoordiantes.source.y
				]
			]
		}
	]

	while (coordinateQueue.length > 0) {
		let levelSize: number = coordinateQueue.length;

		for (let i = 0; i < levelSize; i++) {
			const knightCoordinates: KnightCoordinates = coordinateQueue.shift()!
			const { currentCoordinates } = knightCoordinates

			if (currentCoordinates[0] === x && currentCoordinates[1] === y) {
				return {
					operationId: uuid,
					shortestPath: knightCoordinates.pastCoordinates.reduce((acc: string[], curr: KnightMoves) => [...acc, `${numberToLetter[curr[0]]}${curr[1].toString()}`], []).join(":"),
					numberOfMoves: numberOfMoves,
					starting: `${numberToLetter[boardCoordiantes.source.x]}${boardCoordiantes.source.y}`,
					ending: `${numberToLetter[boardCoordiantes.target.x]}${boardCoordiantes.target.y}`,
				}
			}

			directions.forEach(direction => {
				const nextRow: number = currentCoordinates[0] + direction[0];
				const nextCol: number = currentCoordinates[1] + direction[1];
				if (nextRow >= 0 && nextRow < BOARD_SIZE && nextCol >= 0 && nextCol < BOARD_SIZE && !visited[nextRow][nextCol]) {
					visited[nextRow][nextCol] = true;
					coordinateQueue.push({ currentCoordinates: [nextRow, nextCol], pastCoordinates: [...knightCoordinates.pastCoordinates, [nextRow, nextCol]] })
				}
			});
		}
		numberOfMoves++;
	}

	return {
		operationId: uuid,
		shortestPath: "",
		numberOfMoves: -1,
		starting: `${numberToLetter[boardCoordiantes.source.x]}${boardCoordiantes.source.y}`,
		ending: `${numberToLetter[boardCoordiantes.target.x]}${boardCoordiantes.target.y}`,
	}
}
