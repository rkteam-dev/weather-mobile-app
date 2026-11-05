import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MISKOLC_LOCATION } from '../../constants/locations';
import { fetchCurrentWeather } from '../../services/weather/openMeteo';
import type {
  CityWeatherState,
  WeatherLocation,
} from '../../types/weather/weather';

export const MAX_SAVED_CITIES = 3;
const REQUEST_TIMEOUT_MS = 10_000;

type WeatherContextValue = {
  addCity: (location: WeatherLocation) => void;
  isSaved: (locationId: string) => boolean;
  refreshCity: (location: WeatherLocation) => Promise<void>;
  removeCity: (locationId: string) => void;
  savedCities: WeatherLocation[];
  selectCity: (locationId: string) => void;
  selectedCity: WeatherLocation;
  weatherByCityId: Record<string, CityWeatherState>;
};

const WeatherContext = createContext<WeatherContextValue | null>(null);

const initialWeatherState: CityWeatherState = {
  data: null,
  error: null,
  isLoading: true,
  isRefreshing: false,
  lastUpdatedAt: null,
};

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [savedCities, setSavedCities] = useState<WeatherLocation[]>([
    MISKOLC_LOCATION,
  ]);
  const [selectedCityId, setSelectedCityId] = useState(MISKOLC_LOCATION.id);
  const [weatherByCityId, setWeatherByCityId] = useState<
    Record<string, CityWeatherState>
  >({});
  const requestControllers = useRef(new Map<string, AbortController>());

  const refreshCity = useCallback(async (location: WeatherLocation) => {
    requestControllers.current.get(location.id)?.abort();

    const controller = new AbortController();
    requestControllers.current.set(location.id, controller);

    setWeatherByCityId((current) => {
      const previous = current[location.id] ?? initialWeatherState;

      return {
        ...current,
        [location.id]: {
          ...previous,
          error: null,
          isLoading: previous.data === null,
          isRefreshing: previous.data !== null,
        },
      };
    });

    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const data = await fetchCurrentWeather(location, controller.signal);

      if (!controller.signal.aborted) {
        setWeatherByCityId((current) => ({
          ...current,
          [location.id]: {
            data,
            error: null,
            isLoading: false,
            isRefreshing: false,
            lastUpdatedAt: new Date(),
          },
        }));
      }
    } catch (error: unknown) {
      setWeatherByCityId((current) => {
        if (requestControllers.current.get(location.id) !== controller) {
          return current;
        }

        const previous = current[location.id] ?? initialWeatherState;

        return {
          ...current,
          [location.id]: {
            ...previous,
            error: controller.signal.aborted
              ? 'Az időjárás lekérése túl sokáig tartott. Próbáld újra.'
              : 'Nem sikerült betölteni az időjárást. Ellenőrizd az internetkapcsolatot, majd próbáld újra.',
            isLoading: false,
            isRefreshing: false,
          },
        };
      });
    } finally {
      clearTimeout(timeout);

      if (requestControllers.current.get(location.id) === controller) {
        requestControllers.current.delete(location.id);
      }
    }
  }, []);

  useEffect(
    () => () => {
      requestControllers.current.forEach((controller) => controller.abort());
      requestControllers.current.clear();
    },
    [],
  );

  useEffect(() => {
    savedCities.forEach((city) => {
      if (
        !weatherByCityId[city.id] &&
        !requestControllers.current.has(city.id)
      ) {
        void refreshCity(city);
      }
    });
  }, [refreshCity, savedCities, weatherByCityId]);

  const addCity = useCallback(
    (location: WeatherLocation) => {
      setSavedCities((current) => {
        if (
          current.length >= MAX_SAVED_CITIES ||
          current.some((city) => city.id === location.id)
        ) {
          return current;
        }

        return [...current, location];
      });
    },
    [],
  );

  const removeCity = useCallback(
    (locationId: string) => {
      if (savedCities.length === 1) {
        return;
      }

      const remainingCities = savedCities.filter(
        (city) => city.id !== locationId,
      );
      requestControllers.current.get(locationId)?.abort();
      requestControllers.current.delete(locationId);
      setSavedCities(remainingCities);
      setWeatherByCityId((current) => {
        const next = { ...current };
        delete next[locationId];
        return next;
      });

      if (selectedCityId === locationId) {
        setSelectedCityId(remainingCities[0].id);
      }
    },
    [savedCities, selectedCityId],
  );

  const selectedCity =
    savedCities.find((city) => city.id === selectedCityId) ?? savedCities[0];

  const value = useMemo<WeatherContextValue>(
    () => ({
      addCity,
      isSaved: (locationId) =>
        savedCities.some((city) => city.id === locationId),
      refreshCity,
      removeCity,
      savedCities,
      selectCity: setSelectedCityId,
      selectedCity,
      weatherByCityId,
    }),
    [
      addCity,
      refreshCity,
      removeCity,
      savedCities,
      selectedCity,
      weatherByCityId,
    ],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export function useWeather() {
  const value = useContext(WeatherContext);

  if (!value) {
    throw new Error('useWeather must be used within WeatherProvider.');
  }

  return value;
}
