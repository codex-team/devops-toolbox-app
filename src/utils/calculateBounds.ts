
/**
 * @param x - x of mouse click
 * @param y - x of mouse click
 * @param height - height of window
 * @param width - width of window
 */
export default function calculateBounds(x: number, y: number, height: number, width: number): { x: number, y: number } {
  const half = 0.5;

  return {
    x: Math.round(x - width * half),
    y: process.platform === 'darwin' ? y : y - height,
  };
}
