import { KnightMoves } from "./types";

export const BOARD_SIZE = 8

export const directions: KnightMoves[] = [
	[-2, 1], [-1, 2], [1, 2], [2, 1],
	[2, -1], [1, -2], [-1, -2], [-2, -1],
]

export const numberToLetter: { [number: number]: string } = {
	1: "A",
	2: "B",
	3: "C",
	4: "D",
	5: "E",
	6: "F",
	7: "G",
	8: "H"
}
