# Architecture

## Status

The repository contains a minimal Expo entry point, Home, Cities, and Settings screens, bottom-tab navigation, and the first shared UI contracts. Weather service and remote state layers remain deferred until data integration begins.

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

`components/global/` contains `AppScreen`, `AppText`, `AppCard`, and `AppNoticeModal`. These establish shared safe-area, spacing, typography, card, and brief user-notice contracts.

Global components should not contain weather-specific knowledge.

### Home Feature

`screens/home/HomeScreen.tsx` contains the current static welcome experience and a visual saved-city selector with Miskolc as its placeholder selection. Screen-specific copy remains directly in the screen for readability. The selector has no interaction or persistence yet; future saved-city support is limited to three manually chosen cities and does not require GPS.

### Navigation

`navigation/AppTabs.tsx` owns the typed Home, Cities, and Settings bottom tabs. Navigation configuration stays separate because it is an application-level responsibility.

### Cities Screen

`screens/cities/CitiesScreen.tsx` presents up to three locally managed mock cities. Cards show the fields expected from the future API model: temperature, condition, precipitation, day/night state, timezone, and local time. Deletion works in memory. Search and remote addition are intentionally not implemented yet.

`types/weather/weather.ts` defines the small application-facing city weather model. Future Open-Meteo transport responses must be validated and mapped into this model instead of being passed directly to the UI.

### Settings Screen

`screens/settings/SettingsScreen.tsx` contains the working light/dark theme toggle and visual placeholders for website, social media, privacy, support, application information, and data deletion actions. Placeholder controls are intentionally disabled until their behavior is implemented.

### Theme State

NativeWind's color scheme API owns the current in-memory light or dark selection. Screens use semantic light and dark classes, while native APIs and React Navigation read the matching values from `constants/theme.ts`. Theme persistence is intentionally deferred until persistent application settings are requested. When added, persistence must use a React Native-compatible storage API rather than browser `localStorage`.

## State and Data Flow

- Use local React state and built-in hooks for the initial single-screen application.
- Introduce Context only if state must genuinely be shared across distant consumers.
- Do not introduce a third-party state or server-state library initially.
- Never render missing values as if they were valid weather measurements.

## Error Model

Expected failures should be converted into small, meaningful application errors suitable for user feedback and retry behavior. Unexpected failures should remain diagnosable during development without exposing implementation details to the user. Using modal to notify the user in case of an error; do not include sensitive content in the modal, and keep the message very brief is recommended. Yellow: warning, red: error; Icon, title, desc.

`AppNoticeModal` implements information, warning, and error appearances. The saved-city limit currently uses the yellow warning appearance.

## Future Change Guidelines

- Add navigation only when multiple screens are required.
- Add persistence only when a real persisted feature is approved.
