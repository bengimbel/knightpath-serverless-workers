import { BoardCoordiantes, BoardInputLocation } from "./types";

const letterToNumber: { [letter: string]: number } = {
	"A": 1,
	"B": 2,
	"C": 3,
	"D": 4,
	"E": 5,
	"F": 6,
	"G": 7,
	"H": 8
}

export const mapLetterToCoordinate = (boardLocation: BoardInputLocation): BoardCoordiantes => ({
	source: {
		x: letterToNumber[boardLocation.source[0].toUpperCase()],
		y: parseInt(boardLocation.source[1])
	},
	target: {
		x: letterToNumber[boardLocation.target[0].toUpperCase()],
		y: parseInt(boardLocation.target[1])
	}
})

const checkCoordinateLength = (source: string, target: string): boolean => {
	if (source.length != 2) {
		return false
	}
	if (target.length != 2) {
		return false
	}

	return true
}

const checkCoordinateColumn = (source: string, target: string): boolean => {
	if (!letterToNumber[source[0].toUpperCase()] || !letterToNumber[target[0].toUpperCase()]) {
		return false
	}
	return true
}

const checkCoordinateRow = (source: string, target: string): boolean => {
	const sourceNumber: number = parseInt(source[1])
	const targetNumber: number = parseInt(target[1])
	if (sourceNumber <= 0 || sourceNumber > 8) {
		return false
	}
	if (targetNumber <= 0 || targetNumber > 8) {
		return false
	}

	return true
}
export const areCoordinatesValid = (source: string, target: string): boolean => {
	if (!checkCoordinateLength(source, target)) {
		return false
	}
	if (!checkCoordinateColumn(source, target)) {
		return false
	}
	if (!checkCoordinateRow(source, target)) {
		return false
	}

	return true
}
