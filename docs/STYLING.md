# Styling Guidelines

## Status

NativeWind 4.2.7 and Tailwind CSS 3.4 are configured and used by the current Home screen.

## Primary Approach

- Use NativeWind as the primary styling solution.
- `global.css` contains the Tailwind base, component, and utility directives.
- `babel.config.js` enables the NativeWind JSX transform.
- `metro.config.js` passes `global.css` through NativeWind.
- `tailwind.config.js` scans `App.tsx`, `components/`, and `constants/`.

## Design Tokens

The initial semantic tokens are defined in `tailwind.config.js` and mirrored for native API usage in `constants/theme.ts`:

- Primary: `#4F7CFF`
- Primary dark: `#315BD9`
- Secondary: `#12213A`
- Background: `#F4F7FC`
- Surface: `#FFFFFF`
- Muted text: `#64748B`
- Border: `#E2E8F0`
- Danger: `#DC4C64`
- Inner container padding: `20px` through `p-inner` or `px-inner`
- Section spacing: `60px` through `gap-section`
- Card radius: `28px` through `rounded-card`

Keep the two configuration representations synchronized when a shared token changes. Dark appearance is not implemented yet.

## Typography

Inter is loaded at runtime through Expo Font so it remains compatible with Expo Go. The application currently loads Regular 400, Medium 500, SemiBold 600, and Bold 700 only. Use `AppText` rather than raw `Text` for application copy so the correct family, size, and line height are applied consistently.

## Component Rules

- Keep component styling close to the component while consuming shared tokens.
- Avoid arbitrary hardcoded values repeated across files.
- Use reusable global components only when they provide a stable shared visual or behavioral contract.
- Do not wrap every React Native primitive.
- Keep weather-specific visual decisions in weather components.
- Support reasonable font scaling and avoid fixed heights that clip text.
- Use touch targets appropriate for both Android and iOS.
- Use `AppScreen` for safe-area handling, scrolling, the global background, 20px horizontal padding, and 60px section spacing.
- Use `AppCard` for the shared card radius and inner padding.

## Exceptions to NativeWind

Use React Native `StyleSheet` or inline styles only when justified by:

- Runtime-calculated values
- Properties unsupported by the selected NativeWind version
- Platform-specific styling
- A React Native API that requires a style object

Document non-obvious exceptions near the implementation or in this file if they establish a project-wide convention.

## React Native Constraints

React Native is not a browser environment. Do not rely on DOM APIs, browser CSS selectors, browser layout assumptions, or unsupported CSS properties. Verify behavior against the installed NativeWind and React Native versions.

## Platform Appearance

- Prefer shared styling across platforms.
- Use `Platform.select` or platform-specific files only for necessary differences.
- Respect safe areas, system bars, device cutouts, and system color appearance where supported.
- Record known visual differences and unverified platform behavior.
