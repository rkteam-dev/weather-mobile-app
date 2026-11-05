# Architecture

## Status

The repository contains a minimal Expo entry point, Home, Cities, and Settings screens, bottom-tab navigation, shared UI contracts, live city search, and shared current-weather state for up to three cities.

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

`screens/home/HomeScreen.tsx` presents live current weather for the selected saved city. Its modal selector switches between the cities held by shared weather state and reuses their already loaded values. It renders loading, error, retry, refresh, success, and stale-data states. Screen-specific copy remains directly in the screen for readability.

### Weather Data

`services/weather/openMeteo.ts` owns Open-Meteo geocoding and current-weather requests, runtime response validation, WMO condition mapping, and conversion into application models. `context/weather/WeatherContext.tsx` owns saved locations, Home selection, shared weather values, request cancellation, timeout, retry, refresh, and last successful update time. Presentational components do not call the API directly.

### Navigation

`navigation/AppTabs.tsx` owns the typed Home, Cities, and Settings bottom tabs. Navigation configuration stays separate because it is an application-level responsibility.

### Cities Screen

`screens/cities/CitiesScreen.tsx` searches Open-Meteo locations and manages up to three cities in memory. Cards show live temperature, condition, precipitation, day/night state, timezone-based local time, retry, and manual refresh. The last remaining city cannot be deleted because Home always requires a selected city.

`types/weather/weather.ts` defines the small application-facing location and weather models. Open-Meteo transport responses are validated and mapped into these models instead of being passed directly to the UI.

### Settings Screen

`screens/settings/SettingsScreen.tsx` contains the working light/dark theme toggle and visual placeholders for website, social media, privacy, support, application information, and data deletion actions. Placeholder controls are intentionally disabled until their behavior is implemented.

### Theme State

NativeWind's color scheme API owns the current in-memory light or dark selection. Screens use semantic light and dark classes, while native APIs and React Navigation read the matching values from `constants/theme.ts`. Theme persistence is intentionally deferred until persistent application settings are requested. When added, persistence must use a React Native-compatible storage API rather than browser `localStorage`.

## State and Data Flow

- Use local React state for screen-only interaction.
- A small React Context shares saved locations, selected city, and weather state between Home and Cities.
- Do not introduce a third-party state or server-state library initially.
- Never render missing values as if they were valid weather measurements.

## Error Model

Expected failures should be converted into small, meaningful application errors suitable for user feedback and retry behavior. Unexpected failures should remain diagnosable during development without exposing implementation details to the user. Using modal to notify the user in case of an error; do not include sensitive content in the modal, and keep the message very brief is recommended. Yellow: warning, red: error; Icon, title, desc.

`AppNoticeModal` implements information, warning, and error appearances. The saved-city limit currently uses the yellow warning appearance.

## Future Change Guidelines

- Add navigation only when multiple screens are required.
- Add persistence only when a real persisted feature is approved.
