import { ExtensionContext, commands, window } from 'vscode';
import { getEditorCoordinate } from '../coordinate/coordinate';
import { addCoordinate } from '../registry/registry-manager';
import { saveRegistry } from '../registry/registry-loader';

export function AddMarkerCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.addMarker', () => {
        if (!window.activeTextEditor) {
            return;
        }

        const coordinate = getEditorCoordinate(window.activeTextEditor);
        addCoordinate(coordinate);
        saveRegistry(context);
    });

    context.subscriptions.push(disposable);
}
