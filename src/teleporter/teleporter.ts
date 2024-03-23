import { ExtensionContext, Range, Selection, TextEditorRevealType, Uri, commands, window } from 'vscode';
import { Coordinate } from '../coordinate/coordinate';
import fs from 'fs';

export function teleportTo(coordinate: Coordinate) {
    const fileUri: Uri = Uri.file(coordinate.filePath);

    commands.executeCommand('vscode.open', fileUri).then(() => {
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }

        const range = new Range(coordinate.lineNumber, coordinate.columnNumber, coordinate.lineNumber, coordinate.columnNumber);
        editor.revealRange(range, TextEditorRevealType.InCenter);
        editor.selection = new Selection(range.start, range.end);
    });
}

export function openMap(context: ExtensionContext) {
    const filePath = `${context.extensionPath}/registry.txt`;
    if (!fs.existsSync(filePath)) {
        return;
    }

    commands.executeCommand('vscode.open', Uri.file(filePath));
}    