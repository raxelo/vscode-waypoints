import { TextEditor } from 'vscode';

export type Waypoint = {
    filePath: string;
    lineNumber: number;
    columnNumber: number;
};

export function getEditorLocation(editor: TextEditor): Waypoint {
    return {
        filePath: editor.document.fileName,
        lineNumber: editor.selection.active.line,
        columnNumber: editor.selection.active.character
    };
}