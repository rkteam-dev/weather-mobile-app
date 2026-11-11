# Product Requirements

## Status

This document records the approved product constraints. Live city search, three manual cities, one device-derived location, selected-location switching, current weather, and a seven-day forecast are implemented. Persistence is not.

## Product Goal

Create a small reference weather application for Android and iOS that favors simplicity, maintainability, cross-platform correctness, and developer experience over feature volume.

## Initial User Experience

The first implementation should:

- Show weather for one predefined location.
- Show the selected city name.
- Show the current temperature.
- Show the current weather condition.
- Translate the condition into a human-readable description.
- Show a small set of useful weather details when the API provides them.
- Show deliberate initial loading, refreshing, incomplete data, network error, retry, and successful states.
- Allow manual refresh.
- Show the time of the last successful update.
- Show a horizontally scrollable seven-day forecast.
- Add or refresh one foreground device location after an explicit button press and system permission.

The initial interface should remain focused and minimal.

## Out of Scope

The initial implementation must not include:

- Authentication or user accounts
- Notifications
- Background location tracking
- Databases
- Persistent favorites
- A custom backend
- Analytics
- Cloud build services
- Generated native Android or iOS projects
- Unrequested navigation infrastructure

These capabilities may be considered only in a later explicitly authorized task.

The interface manages up to three manually selected cities plus one system-managed device location. The device location is obtained only after an explicit button press, is not tracked in the background, and cannot be manually edited or deleted. The Home screen uses the selected location's shared live weather and forecast. Locations and selection remain in memory until persistence is explicitly implemented.

## Data Source

- Use the public Open-Meteo Geocoding and Forecast APIs.
- Use native `fetch` for requests.
- Confirm current endpoint fields, usage limits, licensing, attribution, and API requirements before implementation.
- Keep transport response types separate from application domain models.
- Safely narrow and map untrusted response data.
- Handle missing, malformed, and incomplete data explicitly.
- Provide timeout or cancellation behavior where appropriate.
- Avoid unnecessary repeated requests.
- Do not add a caching library initially.

## Quality Requirements

- Android and iOS are equal first-class targets.
- TypeScript strict mode is mandatory.
- Application code, identifiers, comments, files, and documentation must be in English.
- User-facing strings must be centralized for future localization.
- The application must respect safe areas and varied screen sizes.
- Text must support reasonable accessibility scaling without unnecessary clipping.
- Interactive controls must provide appropriate touch targets and accessibility information.
- Useful platform and framework warnings must remain enabled.
- Errors must be visible and recoverable; failures must not be silently ignored.
