# Product Requirements

## Status

This document records the approved planning constraints. It does not indicate that any feature has been implemented.

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

The initial interface should remain focused and minimal.

## Out of Scope

The initial implementation must not include:

- Authentication or user accounts
- Notifications
- GPS or location permissions
- Databases
- Persistent favorites
- A custom backend
- Analytics
- Cloud build services
- Generated native Android or iOS projects
- Unrequested navigation infrastructure

These capabilities may be considered only in a later explicitly authorized task.

## Data Source

- Consider using the public Open-Meteo API, the api must be free.
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
