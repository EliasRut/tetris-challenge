/**
 * Implement movement handling for the current tile.
 * @param {Array<Array<number>>} cells A 20 by 10 array of the current game state, with 0 as empty
 * @param {Array<Array<number>>} currentItem  A 4 by 4 array of the currently moving tile
 * @param {number} currentItemX The current x offset of the moving tile
 * @param {number} currentItemY The current y offset of the moving tile
 */
export const handleAI = (cells, currentItem, currentItemX, currentItemY) => {

	return {
		goLeft: false,
		goRight: false,
		rotate: false
	};
}