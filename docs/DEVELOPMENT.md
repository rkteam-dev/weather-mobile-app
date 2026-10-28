# Development Guide

## Before Any Future Change

1. Read `AGENTS.md` and the relevant files under `docs/`.
2. Inspect the current repository and preserve existing work.
3. Confirm the requested scope and choose the smallest maintainable change.
4. Check current official compatibility documentation before selecting framework or package versions.
5. Explain necessary new dependencies to the user in Hungarian before installing them.

## Initialization Record

The project was initialized from the official `blank-typescript@sdk-58` Expo template and reduced to an empty root view. Existing documentation and project rules were preserved. No `android/` or `ios/` directories were generated.

## Development Commands

- `npm start`: start the Expo development server.
- `npm run android`: start Expo and open the Android target when an emulator or device is available.
- `npm run ios`: start Expo and open the iOS target when a supported environment is available.
- `npm run web`: start the web target. Required web runtime packages have not been added or verified.
- `npx tsc --noEmit`: validate TypeScript without generating output.
- `npx expo config --type public`: inspect the resolved public Expo configuration.

## Expo Go and Development Builds

- Prefer Expo Go during the initial phase if every selected native capability is supported.
- Do not introduce EAS or cloud builds without a separate documented need and explicit authorization.
- Do not run prebuild or generate native directories automatically.

## Android Testing

Android Studio is available for later emulator testing. After implementation, document the verified emulator workflow, device prerequisites, and any environment-specific limitations.

## iOS Testing

On a non-macOS development machine, possible future options may include Expo Go on a physical iOS device or an explicitly approved remote build workflow. A local iOS Simulator and local native iOS builds require macOS and Xcode. Record the exact tested path and never describe iOS as verified when it was not tested.

## Validation and Reporting

For each implementation task:

1. Run relevant non-destructive checks.
2. Record which checks passed, failed, or could not run.
3. Distinguish verified errors from potential risks and recommendations.
4. Update documentation when implementation changes make it inaccurate.
5. Report changes to the user in Hungarian.
6. State whether dependencies were added and why.

Do not disable TypeScript errors, React Native warnings, Expo warnings, or LogBox to create the appearance of success.

## Git Restrictions

Read-only inspection is permitted. No Git state-changing operation is allowed without explicit permission for the exact requested action. Generating a commit message never authorizes a commit.
