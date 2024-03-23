import { ExtensionContext, commands } from 'vscode';
import { openMap } from '../teleporter/teleporter';

export function ViewMapCommand(context: ExtensionContext) {
    const disposable = commands.registerCommand('waypoints.viewMap', () => {
        openMap(context);
    });
    context.subscriptions.push(disposable);
}
