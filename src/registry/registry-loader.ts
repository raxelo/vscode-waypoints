import { ExtensionContext } from 'vscode';
import fs from 'fs';
import path from 'path';
import { addCoordinate, clearRegistry, getAllCoordinates } from './registry-manager';
import { Coordinate } from '../coordinate/coordinate';

const mapFilePath = 'registry.txt';

function coordinateToLine(coordinate: Coordinate): string {
    return `${coordinate.filePath}:${coordinate.lineNumber}:${coordinate.columnNumber}`;
}

function lineToCoordinate(line: string): Coordinate {
    const [filePath, lineNumber, columnNumber] = line.split(':');
    return {
        filePath,
        lineNumber: parseInt(lineNumber),
        columnNumber: parseInt(columnNumber),
    };
}

export function saveRegistry(context: ExtensionContext) {
    const coordinates = getAllCoordinates();
    const fileContent = [];

    for (const coordinate of coordinates) {
        const line = coordinateToLine(coordinate);
        fileContent.push(line);
    }

    const filePath = path.join(context.extensionPath, mapFilePath);
    fs.writeFileSync(filePath, fileContent.join('\n'));
}

export function loadRegistry(context: ExtensionContext) {
    const filePath = path.join(context.extensionPath, mapFilePath);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n').filter(Boolean);

    clearRegistry();

    for (const line of lines) {
        const coordinate = lineToCoordinate(line);
        if (coordinate.filePath && !isNaN(coordinate.lineNumber) && !isNaN(coordinate.columnNumber)) {
            addCoordinate(coordinate);
        }
    }
}

export function watchRegistry(context: ExtensionContext) {
    const filePath = path.join(context.extensionPath, mapFilePath);
    fs.watchFile(filePath, { interval: 1000 }, () => {
        try {
            loadRegistry(context);
            console.log('Registry reloaded');
        } catch (err) {
            console.error(err);
        }
    });
}
