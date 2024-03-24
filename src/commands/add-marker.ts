import { ExtensionContext, commands, window } from 'vscode';
import { getEditorLocation } from '../waypoint/waypoint';
import { addWaypoint } from '../registry/registry-manager';
import { saveRegistry } from '../registry/registry-loader';

export function AddMarkerCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.addMarker', () => {
        if (!window.activeTextEditor) {
            return;
        }

        const waypoint = getEditorLocation(window.activeTextEditor);
        addWaypoint(waypoint);
        saveRegistry(context);
    });

    context.subscriptions.push(disposable);
}
