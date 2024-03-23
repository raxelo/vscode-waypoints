import { TextEditor } from 'vscode';

export type Coordinate = {
    filePath: string;
    lineNumber: number;
    columnNumber: number;
};

export function getEditorCoordinate(editor: TextEditor): Coordinate {
    return {
        filePath: editor.document.fileName,
        lineNumber: editor.selection.active.line,
        columnNumber: editor.selection.active.character
    };
}