import { Coordinate } from '../coordinate/coordinate';

// String following this format: `${filePath}:${lineNumber}`
// Example: `src/coordinate/coordinate.ts:5`
type CoordinateKey = `${string}:${number}`;

const coordinatesRegistry: Map<CoordinateKey, Coordinate> = new Map();

/**
 * Generates a unique key for a coordinate.
 * Ignores the column number.
 */
function coordinateKey(coordinate: Coordinate): CoordinateKey {
    return `${coordinate.filePath}:${coordinate.lineNumber}`;
}

export function clearRegistry() {
    coordinatesRegistry.clear();
}

export function addCoordinate(coordinate: Coordinate) {
    coordinatesRegistry.set(coordinateKey(coordinate), coordinate);
}

export function removeCoordinate(coordinate: Coordinate) {
    coordinatesRegistry.delete(coordinateKey(coordinate));
}

export function getAllCoordinates() {
    return coordinatesRegistry.values();
}