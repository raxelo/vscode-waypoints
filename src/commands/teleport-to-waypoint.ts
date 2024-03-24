import { ExtensionContext, commands, window } from 'vscode';
import { teleportTo } from '../teleporter/teleporter';
import { getAllWaypoints } from '../registry/registry-manager';

export function TeleportToWaypointCommand(context: ExtensionContext) {
    const teleportCommands = [
        'waypoints.openWaypoint.1',
        'waypoints.openWaypoint.2',
        'waypoints.openWaypoint.3',
        'waypoints.openWaypoint.4',
        'waypoints.openWaypoint.5',
        'waypoints.openWaypoint.6',
        'waypoints.openWaypoint.7',
        'waypoints.openWaypoint.8',
        'waypoints.openWaypoint.9',
    ];

    const teleportCommandsDisposable = teleportCommands.map((command, idx) => {
        return commands.registerCommand(command, () => {
            const waypoints = Array.from(getAllWaypoints());
            const waypoint = waypoints[idx];
            if (!waypoint) {
                window.showErrorMessage('Waypoint not found.');
                return;
            }

            teleportTo(waypoint);
        });
    });

    context.subscriptions.push(...teleportCommandsDisposable);
}
