# Styling Guidelines

## Status

These guidelines describe the intended styling approach.

## Primary Approach

- Use NativeWind as the primary styling solution after implementation is authorized.
- Select NativeWind, Tailwind CSS, Expo, React Native, Babel, and Metro configurations from mutually compatible official guidance.
- Use the officially supported root-level `global.css` setup for the selected NativeWind version.

## Design Tokens

The future design system should define a compact semantic token set for:

- Surface and background colors
- Primary and secondary text colors
- Accent and status colors
- Spacing
- Border radius
- Typography
- Common component sizes
- Light and dark appearance when implemented

Tokens should have semantic names and one clear source of truth. Avoid a large speculative token catalog before the interface requires it.

## Component Rules

- Keep component styling close to the component while consuming shared tokens.
- Avoid arbitrary hardcoded values repeated across files.
- Use reusable global components only when they provide a stable shared visual or behavioral contract.
- Do not wrap every React Native primitive.
- Keep weather-specific visual decisions in weather components.
- Support reasonable font scaling and avoid fixed heights that clip text.
- Use touch targets appropriate for both Android and iOS.

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
