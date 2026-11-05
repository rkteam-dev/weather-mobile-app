# Weather App

A small cross-platform weather application built as a React Native reference project. It focuses on a clean interface, readable code, explicit asynchronous states, and consistent behavior on Android and iOS.

## Features

- Search cities through the Open-Meteo Geocoding API
- Save up to three cities without GPS access
- Display live temperature, apparent temperature, humidity, wind, precipitation, weather condition, and day/night state
- Select which saved city appears on the Home screen
- Refresh weather data manually
- Handle loading, timeout, network error, retry, and stale-data states
- Switch between light and dark themes
- Use accessible controls, safe areas, and responsive layouts

Saved cities, the selected city, and the chosen theme currently remain in memory and reset when the application restarts.

## Technology

- Expo SDK 58
- React Native 0.88
- React 19.3
- TypeScript 6 with strict mode
- NativeWind 4 and Tailwind CSS 3
- React Navigation 7
- Inter font and Ionicons
- Native `fetch`
- Open-Meteo Geocoding and Forecast APIs

## Getting Started

### Requirements

- Node.js and npm
- Expo Go on a physical device, or Android Studio with an Android emulator
- Xcode and the iOS Simulator when testing locally on macOS

### Installation

```bash
git clone https://github.com/rkteam-dev/weather-mobile-app.git
cd weather-mobile-app
npm install
```

### Run the application

Start the Expo development server:

```bash
npm start
```

Other available commands:

```bash
npm run android
npm run ios
```

`npm run ios` requires macOS for the local iOS Simulator. On Windows, iOS can be tested with Expo Go on a physical iPhone.

## Project Structure

```text
components/   Shared UI components
constants/    Theme tokens and predefined locations
context/      Shared saved-city and weather state
navigation/   Bottom-tab navigation
screens/      Home, Cities, and Settings screens
services/     Open-Meteo API requests and response mapping
types/        Weather domain models
docs/         Technical and product documentation
```

The API layer validates external responses before mapping them into application models. Screens do not call weather endpoints directly. A small React Context shares saved cities, selected-city state, and loaded weather values without introducing an additional state-management library.

## Weather Data

Weather and location data are provided by [Open-Meteo](https://open-meteo.com/). The free public endpoints require no API key for non-commercial use. Open-Meteo data is licensed under CC BY 4.0 and requires attribution.

See [Weather API documentation](docs/WEATHER_API.md) for request fields, mapping, limits, and error handling.

## Current Limitations

- Saved cities and theme selection are not persisted
- Settings actions are visual placeholders
- GPS-based location is not implemented
- Automated tests have not been introduced yet
- Android has been manually exercised, while iOS runtime testing is still pending

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Development](docs/DEVELOPMENT.md)
- [Product requirements](docs/REQUIREMENTS.md)
- [Styling system](docs/STYLING.md)
- [Platform guidelines](docs/PLATFORM_GUIDELINES.md)
- [Weather API](docs/WEATHER_API.md)

## Validation

The project is currently validated with TypeScript checks, Expo configuration checks, Android Hermes bundling, and manual runtime testing. Platform checks are only reported as completed when they have actually been performed.
