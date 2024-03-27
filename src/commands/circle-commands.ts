import { ExtensionContext, commands } from 'vscode';
import { getAllWaypoints } from '../registry/registry-manager';
import { getLastTeleport, teleportTo } from '../teleporter/teleporter';

function getLastWaypointIndex() {
    const lastWaypoint = getLastTeleport();
    const allWaypoints = getAllWaypoints();

    const index = Array.from(allWaypoints).indexOf(lastWaypoint!);

    return index === -1 ? 0 : index;
}

function getNextWaypointIndex() {
    const lastWaypointIndex = getLastWaypointIndex();
    const allWaypoints = Array.from(getAllWaypoints());

    return lastWaypointIndex === allWaypoints.length - 1 ? 0 : lastWaypointIndex + 1;
}

function getPreviousWaypointIndex() {
    const lastWaypointIndex = getLastWaypointIndex();
    const allWaypoints = Array.from(getAllWaypoints());

    return lastWaypointIndex === 0 ? allWaypoints.length - 1 : lastWaypointIndex - 1;
}

export function CircleForwardsCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.circleForwards', () => {
        const nextWaypointIndex = getNextWaypointIndex();
        const allWaypoints = Array.from(getAllWaypoints());

        const nextWaypoint = allWaypoints[nextWaypointIndex];

        teleportTo(nextWaypoint);
    });

    context.subscriptions.push(disposable);
}

export function CircleBackwardsCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.circleBackwards', () => {
        const previousWaypointIndex = getPreviousWaypointIndex();
        const allWaypoints = Array.from(getAllWaypoints());

        const previousWaypoint = allWaypoints[previousWaypointIndex];

        teleportTo(previousWaypoint);
    });

    context.subscriptions.push(disposable);
}
