import { Waypoint } from '../waypoint/waypoint';

// String following this format: `${filePath}:${lineNumber}`
// Example: `src/waypoint/waypoint.ts:5`
type WaypointKey = `${string}:${number}`;

const waypointRegistry: Map<WaypointKey, Waypoint> = new Map();

/**
 * Generates a unique key for a waypoint.
 * Ignores the column number.
 */
function generateWaypointKey(waypoint: Waypoint): WaypointKey {
    return `${waypoint.filePath}:${waypoint.lineNumber}`;
}

export function clearRegistry() {
    waypointRegistry.clear();
}

export function addWaypoint(waypoint: Waypoint) {
    waypointRegistry.set(generateWaypointKey(waypoint), waypoint);
}

export function removeWaypoint(waypoint: Waypoint) {
    waypointRegistry.delete(generateWaypointKey(waypoint));
}

export function getAllWaypoints() {
    return waypointRegistry.values();
}