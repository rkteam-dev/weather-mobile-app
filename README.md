# Weather App

A planned lightweight reference weather application for Android and iOS.

## Current Status

The minimal Expo SDK 58 project foundation has been initialized with React Native and strict TypeScript. The application currently renders an intentionally empty root view. No weather functionality, NativeWind configuration, navigation, or additional feature dependency has been added yet.

Further implementation should proceed only through explicit user requests.

## Planned Purpose

The project is intended to demonstrate a small, maintainable cross-platform weather application with predictable behavior, clear separation of responsibilities, reusable UI patterns, and concise developer documentation.

## Technology Stack

- Expo SDK 58
- React Native 0.88
- React 19.3
- TypeScript 6 in strict mode
- NativeWind and a compatible Tailwind CSS version are planned but not installed
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
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEVELOPMENT.md
│   ├── PLATFORM_GUIDELINES.md
│   ├── REQUIREMENTS.md
│   └── STYLING.md
├── AGENTS.md
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── package-lock.json
├── README.md
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

The planned provider is the [Open-Meteo API](https://open-meteo.com/en/docs). Usage terms, attribution, endpoint fields, and response mapping must be reviewed against the current official documentation before implementation.

## Platform Testing

- Android runtime testing has not been performed yet.
- iOS runtime testing has not been performed yet.
- The future initial workflow should use Expo Go when supported by the final dependency set.
- Native `android/` and `ios/` directories are not required for normal Expo-managed development and must not be generated without an approved need.

## Known Limitations

- The root application view is intentionally empty.
- No weather interface or API integration has been implemented.
- NativeWind is not installed or configured.
- npm reported eight transitive dependency audit findings during initialization: five low and three high severity findings. No automatic audit fix was applied.
- No Android or iOS runtime validation has been performed.

