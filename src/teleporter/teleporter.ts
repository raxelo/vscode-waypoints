import { ExtensionContext, Range, Selection, TextEditorRevealType, Uri, commands, window, workspace } from 'vscode';
import { Waypoint } from '../waypoint/waypoint';
import fs from 'fs';

let lastTeleport: Waypoint | undefined;
const config = workspace.getConfiguration('waypoints');

export function teleportTo(waypoint: Waypoint) {
    const fileUri: Uri = Uri.file(waypoint.filePath);

    const sameFile = window.activeTextEditor?.document.fileName === waypoint.filePath;

    commands.executeCommand('vscode.open', fileUri).then(() => {
        lastTeleport = waypoint;
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
        
        const configShouldScroll = config.get('scrollToWaypoint', true);
        
        if (!sameFile && !configShouldScroll) {
            return;
        }

        const range = new Range(waypoint.lineNumber, waypoint.columnNumber, waypoint.lineNumber, waypoint.columnNumber);
        editor.revealRange(range, TextEditorRevealType.InCenter);
        editor.selection = new Selection(range.start, range.end);
    });
}

export function getLastTeleport() {
    return lastTeleport;
}

export function openMap(context: ExtensionContext) {
    const filePath = `${context.extensionPath}/registry.txt`;
    if (!fs.existsSync(filePath)) {
        return;
    }

    commands.executeCommand('vscode.open', Uri.file(filePath));
}    