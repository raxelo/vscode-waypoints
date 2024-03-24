import { ExtensionContext } from 'vscode';
import fs from 'fs';
import path from 'path';
import { addWaypoint, clearRegistry, getAllWaypoints } from './registry-manager';
import { Waypoint } from '../waypoint/waypoint';

const mapFilePath = 'registry.txt';

function waypointToLine(waypoint: Waypoint): string {
    return `${waypoint.filePath}:${waypoint.lineNumber}:${waypoint.columnNumber}`;
}

function lineToWaypoint(line: string): Waypoint {
    const [filePath, lineNumber, columnNumber] = line.split(':');
    return {
        filePath,
        lineNumber: parseInt(lineNumber),
        columnNumber: parseInt(columnNumber),
    };
}

export function saveRegistry(context: ExtensionContext) {
    const waypoints = getAllWaypoints();
    const fileContent = [];

    for (const waypoint of waypoints) {
        const line = waypointToLine(waypoint);
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
        const waypoint = lineToWaypoint(line);
        if (waypoint.filePath && !isNaN(waypoint.lineNumber) && !isNaN(waypoint.columnNumber)) {
            addWaypoint(waypoint);
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
