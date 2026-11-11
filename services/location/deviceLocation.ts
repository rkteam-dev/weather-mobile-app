import * as Location from 'expo-location';

import type { WeatherLocation } from '../../types/weather/weather';

export type DeviceLocationResult =
  | { location: WeatherLocation; status: 'success' }
  | { status: 'permission-denied' | 'services-disabled' | 'unavailable' };

export async function getDeviceWeatherLocation(): Promise<DeviceLocationResult> {
  const servicesEnabled = await Location.hasServicesEnabledAsync();

  if (!servicesEnabled) {
    return { status: 'services-disabled' };
  }

  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== Location.PermissionStatus.GRANTED) {
    return { status: 'permission-denied' };
  }

  try {
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const addresses = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    const address = addresses[0];
    const cityName =
      address?.city ?? address?.district ?? address?.subregion ?? address?.region;

    if (!address || !cityName) {
      return { status: 'unavailable' };
    }

    return {
      location: {
        country: address.country ?? address.isoCountryCode ?? 'Ismeretlen ország',
        id: 'device-location',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        name: cityName,
        timezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/Budapest',
      },
      status: 'success',
    };
  } catch {
    return { status: 'unavailable' };
  }
}
