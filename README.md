# Weather App

A planned lightweight reference weather application for Android and iOS.

## Current Status

The Expo SDK 58 application includes Open-Meteo city search, live weather for up to three in-memory saved cities, a selectable Home city, a Settings screen with a working light/dark theme toggle, three-tab navigation, shared global UI components, NativeWind, safe-area handling, Inter typography, and Ionicons.

Further implementation should proceed only through explicit user requests.

## Planned Purpose

The project is intended to demonstrate a small, maintainable cross-platform weather application with predictable behavior, clear separation of responsibilities, reusable UI patterns, and concise developer documentation.

## Technology Stack

- Expo SDK 58
- React Native 0.88
- React 19.3
- TypeScript 6 in strict mode
- NativeWind 4.2 with Tailwind CSS 3.4
- Inter through Expo Font
- Expo Vector Icons with Ionicons
- React Navigation 7 with bottom tabs
- Native `fetch`
- npm with `package-lock.json`
- Open-Meteo public API

Installed versions are pinned through `package-lock.json`. Future dependency versions must be selected from current official compatibility guidance.

## Planned Initial Scope

- Weather for one predefined location
- Current temperature
- City name
- Weather condition and human-readable description
- Basic available weather details
- Initial loading and refresh states
- Explicit network error and retry behavior
- Manual refresh
- Last successful update time

Authentication, accounts, notifications, GPS permissions, databases, persistent favorites, and a custom backend are outside the initial scope.

## Repository Contents

```text
weather-app/
├── assets/
├── components/
│   ├── global/
│   │   ├── AppCard/
│   │   ├── AppNoticeModal/
│   │   ├── AppScreen/
│   │   └── AppText/
├── constants/
├── context/
│   └── weather/
├── navigation/
│   └── AppTabs.tsx
├── screens/
│   ├── cities/
│   ├── home/
│   └── settings/
├── services/
│   └── weather/
├── types/
│   └── weather/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   ├── PLATFORM_GUIDELINES.md
│   ├── REQUIREMENTS.md
│   ├── STYLING.md
│   └── WEATHER_API.md
├── AGENTS.md
├── App.tsx
├── app.json
├── babel.config.js
├── global.css
├── index.ts
├── metro.config.js
├── nativewind-env.d.ts
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

Generated dependency files under `node_modules/` are omitted from the tree.

## Installation and Commands

Install dependencies with `npm install` after cloning the repository. Available commands:

- `npm start` starts the Expo development server.
- `npm run android` starts Expo and targets an available Android device or emulator.
- `npm run ios` starts Expo and targets an available iOS environment.
- `npm run web` starts Expo for the web target. Web-specific runtime packages have not been added or validated.

## API

The Home screen uses the public [Open-Meteo API](https://open-meteo.com/en/docs) through native `fetch`. The free non-commercial endpoint requires no account or API key. Open-Meteo attribution is displayed in the interface. Commercial usage requires a suitable paid plan.

## Platform Testing

- The Android production-style JavaScript bundle has been generated successfully.
- Android emulator rendering and the theme toggle have been confirmed by the user.
- iOS runtime testing has not been performed yet.
- The future initial workflow should use Expo Go when supported by the final dependency set.
- Native `android/` and `ios/` directories are not required for normal Expo-managed development and must not be generated without an approved need.

## Known Limitations

- Saved cities and the selected Home city reset when the application restarts.
- Saved-city changes are currently in memory only.
- Settings actions are visual placeholders and intentionally disabled.
- The selected theme is currently kept in memory and resets when the application restarts.
- npm currently reports nine transitive dependency audit findings: one low, six moderate, and two high severity findings. No automatic audit fix was applied.
- iOS runtime validation has not been performed.

