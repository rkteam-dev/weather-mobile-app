# Weather API Plan

## Status

The Home and Cities screens fetch live current weather for up to three manually saved locations. The Cities screen uses live Open-Meteo geocoding search. Saved cities and the selected Home city remain in memory and reset when the application restarts.

## Provider

Use the public Open-Meteo APIs with native `fetch`:

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast and current weather: `https://api.open-meteo.com/v1/forecast`

No sign-up or API key is required for the free non-commercial endpoints. The free service is limited to 10,000 calls per day, 5,000 per hour, and 600 per minute. Weather data is licensed under CC BY 4.0 and requires attribution. Commercial applications, including apps with advertising or subscriptions, require a paid commercial plan and customer API key.

## City Search

Search by city name through the Geocoding API after at least two characters and a 500 ms debounce. Map selected results into an application location containing:

- Stable location ID
- Display name
- Country
- Latitude
- Longitude
- IANA timezone

Keep at most three manually selected cities and prevent duplicate Open-Meteo location IDs. Miskolc is the default and at least one city must remain available. Do not request GPS permission.

## Current Weather Request

The implemented request uses each saved city's coordinates and explicit IANA timezone with the current fields required by the interface:

- `temperature_2m`
- `apparent_temperature`
- `relative_humidity_2m`
- `precipitation`
- `weather_code`
- `is_day`
- `wind_speed_10m`

The request has a 10-second timeout and can be cancelled when the screen unmounts or a newer request starts. The service validates required response fields before mapping them into the application model.

## Weather Mapping

Validate the external response before use and map numeric WMO weather codes into a small application visual state. The initial visual states are:

- Clear day
- Clear night
- Cloudy
- Rain

Use `is_day` to select the day or night appearance independently from the weather code. More detailed combinations may be added only when the interface requires them.

## UI State

Shared weather state handles initial loading, success, malformed or incomplete data, network error, retry, manual refresh, and last successful update time per city. A failed refresh preserves the last valid weather values and displays a visible error message. Selecting a saved city on Home reuses the already loaded city data instead of starting a duplicate request.

## Attribution

The Home and Cities screens include visible Open-Meteo attribution links. These links must remain present while Open-Meteo data is displayed.
