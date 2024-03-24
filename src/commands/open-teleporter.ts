import { ExtensionContext, QuickPickItem, commands, window } from 'vscode';
import { getAllWaypoints } from '../registry/registry-manager';
import { teleportTo } from '../teleporter/teleporter';

export function OpenTeleporterCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.openTeleporter', () => {
        const waypoints = Array.from(getAllWaypoints());
        const quickPickItems: QuickPickItem[] = waypoints.map((waypoint, idx) => {
            return {
                label: `Waypoint ${idx}`,
                detail: waypoint.filePath + ':' + (waypoint.lineNumber + 1)
            };
        });

        window.showQuickPick(quickPickItems, {
            ignoreFocusOut: true,
        }).then((selection) => {
            if (!selection) {
                return;
            }

            const idx = quickPickItems.indexOf(selection);
            const waypoint = waypoints[idx];
            teleportTo(waypoint);
        });
    });

    context.subscriptions.push(disposable);
}
