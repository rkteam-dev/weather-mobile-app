# Architecture

## Status

The repository contains a minimal Expo entry point, Home and Settings screens, bottom-tab navigation, and the first shared UI contracts. Weather service and state layers remain deferred until data integration begins.

## Architectural Goals

- Keep the codebase small and easy to navigate.
- Separate presentation, application state, API access, and external data mapping where the separation has practical value.
- Prefer feature-oriented organization without creating unused layers.
- Make asynchronous UI behavior explicit and predictable.
- Support Android and iOS through shared code by default.

## Proposed Modules

### Application Entry

`App.tsx` imports global styles, loads the approved Inter font weights, owns the splash-screen transition, provides safe-area context, and composes `AppTabs`. It must not contain API parsing or feature business logic.

### Global Components

`components/global/` currently contains `AppScreen`, `AppText`, and `AppCard`. These establish shared safe-area, spacing, typography, and card contracts.

Global components should not contain weather-specific knowledge.

### Home Feature

`screens/home/HomeScreen.tsx` contains the current static welcome experience. Screen-specific copy remains directly in the screen for readability.

### Navigation

`navigation/AppTabs.tsx` owns the typed Home and Settings bottom tabs. Navigation configuration stays separate because it is an application-level responsibility.

### Settings Screen

`screens/settings/SettingsScreen.tsx` contains the current visual placeholders for website, social media, privacy, support, application information, and data deletion actions. The controls are intentionally disabled until their behavior is implemented.

## State and Data Flow

- Use local React state and built-in hooks for the initial single-screen application.
- Introduce Context only if state must genuinely be shared across distant consumers.
- Do not introduce a third-party state or server-state library initially.
- Never render missing values as if they were valid weather measurements.

## Error Model

Expected failures should be converted into small, meaningful application errors suitable for user feedback and retry behavior. Unexpected failures should remain diagnosable during development without exposing implementation details to the user. Using modal to notify the user in case of an error; do not include sensitive content in the modal, and keep the message very brief is recommended. Yellow: warning, red: error; Icon, title, desc.

## Future Change Guidelines

- Add navigation only when multiple screens are required.
- Add persistence only when a real persisted feature is approved.
