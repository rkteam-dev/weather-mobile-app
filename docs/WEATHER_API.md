# Weather API Plan

## Status

The application currently uses mock city and weather values. No network request is implemented yet. This document records the planned integration contract only.

## Provider

Use the public Open-Meteo APIs with native `fetch`:

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast and current weather: `https://api.open-meteo.com/v1/forecast`

No API key is required for the planned non-commercial public endpoints. Recheck current usage, attribution, and licensing requirements before implementation.

## City Search

Search by city name through the Geocoding API. Map selected results into an application location containing:

- Stable location ID
- Display name
- Country
- Latitude
- Longitude
- IANA timezone

Keep at most three manually selected cities. Do not request GPS permission.

## Current Weather Request

The future request should use the selected coordinates, `timezone=auto`, and only the current fields required by the interface:

- `temperature_2m`
- `precipitation`
- `weather_code`
- `is_day`

Use the response timezone and current timestamp for the city's local time. Do not infer local time from the device timezone.

## Weather Mapping

Validate the external response before use and map numeric WMO weather codes into a small application visual state. The initial visual states are:

- Clear day
- Clear night
- Cloudy
- Rain

Use `is_day` to select the day or night appearance independently from the weather code. More detailed combinations may be added only when the interface requires them.

## UI State

Future integration must handle loading, success, incomplete data, network error, retry, and refreshing states. A failed request must not replace the last valid city data with misleading empty values.
