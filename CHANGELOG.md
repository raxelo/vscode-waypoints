# change log

## 1.0.4 - general improvements
- improved teleporter file descriptions for relative paths
- added setting to prevent teleporter from scrolling:
  - `waypoints.scrollToWaypoint`
- added commands to circle through waypoints:
  - `waypoints.circleForwards`
  - `waypoints.circleBackwards`

## 1.0.3 - icon
- added an icon to the extension

## 1.0.0 - initial release
- added the following commands
  - `waypoints.addMarker`: adds a marker to the waypoints file, with the current file, line and column.
  - `waypoints.openTeleporter`: opens a waypoint picker to teleport to a marker.
  - `waypoints.openWaypoint.(1-9)`: teleports to a marker from 1 to 9.
  - `waypoints.viewMap`: opens the waypoints file in vscode.
- No tests!