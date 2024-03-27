import { ExtensionContext, QuickPickItem, commands, window, workspace } from 'vscode';
import { getAllWaypoints } from '../registry/registry-manager';
import { teleportTo } from '../teleporter/teleporter';


/**
 * If the file path is within the workspace, return a relative path.
 */
function formatFilePath(filePath: string): string {
    const workspaceFolders = workspace.workspaceFolders || [];

    const matchingWorkspaceFolder = workspaceFolders.find((folder) => {
        const folderPath = folder.uri.fsPath;
        if (filePath.startsWith(folderPath)) {
            return folderPath;
        }
    });

    if (matchingWorkspaceFolder) {
        const relativePath = filePath.replace(matchingWorkspaceFolder.uri.fsPath, '');
        return relativePath.substring(1);
    }

    return filePath;
}

export function OpenTeleporterCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.openTeleporter', () => {
        const waypoints = Array.from(getAllWaypoints());
        const quickPickItems: QuickPickItem[] = waypoints.map((waypoint, idx) => {
            return {
                label: `Waypoint ${idx}`,
                detail: formatFilePath(waypoint.filePath) + ':' + (waypoint.lineNumber + 1)
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
