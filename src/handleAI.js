/**
 * Implement movement handling for the current tile.
 * @param {Array<Array<number>>} cells A 20 by 10 array of the current game state, with 0 as empty
 * @param {Array<Array<number>>} currentItem  A 4 by 4 array of the currently moving tile
 * @param {number} currentItemX The current x offset of the moving tile
 * @param {number} currentItemY The current y offset of the moving tile
 */

const findFirstFilledCell = (cells) => {
	for (let y=0; y<cells.length; y++) {
		for (let x=0; x<cells[y].length; x++) {
			if (cells[y][x] !== 0) {
				return {y,x};
			}
		}
	}
	return false;
};



export const handleAI = (cells, currentItem, currentItemX, currentItemY) => {
	const firstFilledCell = findFirstFilledCell(cells)

	if (firstFilledCell === false) {
		return {
			goLeft: false,
			goRight: true,
			rotate: false,
		};
	}
	let goRight = false;
	if (currentItemX + 4 < firstFilledCell.x) {
		goRight = true;
	}
	// const moveToFreeCell = () => {
	// 	for (let y=0; y<cells.length; y++) {
	// 		for (let x=0; x<cells[y].length; x++) {
	// 			if (cells[y][x] !== 0) {
	// 				goRight = true;
	// 			}
	// 		}
	// 	}
	// };
	// moveToFreeCell();

	return {
		goLeft: false,
		goRight,
		rotate: false,
	};
}