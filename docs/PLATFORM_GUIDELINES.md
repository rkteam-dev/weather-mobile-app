# Platform Guidelines

## Status

These are implementation requirements for the initialized Android and iOS application. No runtime platform behavior has been tested yet.

## Shared-First Development

- Treat Android and iOS as equal first-class targets.
- Prefer shared components and behavior.
- Introduce platform branches only for verified differences or platform capabilities.
- Keep platform-specific behavior small and documented.

## Safe Areas and System UI

- Keep content clear of status bars, navigation bars, home indicators, and display cutouts.
- Use an Expo-compatible safe-area solution selected from the authorized dependency set.
- Verify nested scroll and safe-area behavior on both platforms.
- Do not use fixed top or bottom padding as a substitute for actual insets.

## Responsive Layout

- Avoid hardcoded screen dimensions.
- Support varied device widths, heights, and aspect ratios.
- Prefer flexible layout, bounded content width where useful, and scrollable content when vertical space is limited.
- Verify both compact and larger displays.
- Avoid fixed component heights that can clip scaled text.

## Text and Accessibility

- Support reasonable system font scaling.
- Use sufficient contrast and clear visual hierarchy.
- Provide accessibility labels and roles for non-obvious interactive controls.
- Use touch target sizes suitable for both platforms.
- Do not encode meaning through color alone.

## Platform-Specific Code

- Use `Platform.select` for small styling or behavior differences.
- Use `.android.tsx` and `.ios.tsx` files only when a component genuinely requires separate implementations.
- Do not rely on undocumented platform behavior.
- Do not suppress platform warnings or safety checks.

## Appearance

- Use a consistent semantic token system.
- Verify shadows, elevation, font rendering, and control feedback separately because they may differ between Android and iOS.
- Use glass effect for some elements on IOS.

## Testing Expectations

### Android

- Testing with Expo Go first.
- Using an Android Studio emulator for layout and interaction checks.
- Do not run expo, or android emulator, only the developer can do it manually, you can tell him to do it for testing.

### iOS

- Later

## Reporting Platform Differences

For each known difference, document:

- The observed behavior
- The affected platform and version when known
- The user impact
- Whether it blocks development
- The chosen mitigation or recommended next action
