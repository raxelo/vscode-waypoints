// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { loadRegistry, watchRegistry } from './registry/registry-loader';
import { AddMarkerCommand } from './commands/add-marker';
import { OpenTeleporterCommand } from './commands/open-teleporter';
import { TeleportToWaypointCommand } from './commands/teleport-to-waypoint';
import { ViewMapCommand } from './commands/view-map';
import { CircleBackwardsCommand, CircleForwardsCommand } from './commands/circle-commands';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	loadRegistry(context);
	watchRegistry(context);

	const commands = [
		AddMarkerCommand,
		OpenTeleporterCommand,
		TeleportToWaypointCommand,
		ViewMapCommand,
		CircleBackwardsCommand,
		CircleForwardsCommand
	];

	commands.forEach((registerCommand) => {
		registerCommand(context);
	});
}

// This method is called when your extension is deactivated
export function deactivate() { }
