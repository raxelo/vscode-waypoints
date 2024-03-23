import { ExtensionContext, QuickPickItem, commands, window } from 'vscode';
import { getAllCoordinates } from '../registry/registry-manager';
import { teleportTo } from '../teleporter/teleporter';

export function OpenTeleporterCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.openTeleporter', () => {
        const coordinates = Array.from(getAllCoordinates());
        const quickPickItems: QuickPickItem[] = coordinates.map((coordinate, idx) => {
            return {
                label: `Waypoint ${idx}`,
                detail: coordinate.filePath + ':' + (coordinate.lineNumber + 1)
            };
        });

        window.showQuickPick(quickPickItems, {
            ignoreFocusOut: true,
        }).then((selection) => {
            if (!selection) {
                return;
            }

            const idx = quickPickItems.indexOf(selection);
            const coordinate = coordinates[idx];
            teleportTo(coordinate);
        });
    });

    context.subscriptions.push(disposable);
}
