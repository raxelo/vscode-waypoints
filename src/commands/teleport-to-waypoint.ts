import { ExtensionContext, commands, window } from 'vscode';
import { teleportTo } from '../teleporter/teleporter';
import { getAllCoordinates } from '../registry/registry-manager';

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
            const coordinates = Array.from(getAllCoordinates());
            const coordinate = coordinates[idx];
            if (!coordinate) {
                window.showErrorMessage('Waypoint not found.');
                return;
            }

            teleportTo(coordinate);
        });
    });

    context.subscriptions.push(...teleportCommandsDisposable);
}
