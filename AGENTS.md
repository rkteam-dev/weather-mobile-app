# Weather App Development Rules

## Instruction Priority

- Follow the user's latest explicit request over older task descriptions.
- The conversation and the user's latest explicit request are the primary source of truth. Keep repository documentation synchronized with them as implementation progresses.
- The minimal Expo and React Native project has been initialized. Do not add features or dependencies until the user explicitly requests the next implementation step.
- Do not generate native projects unless the user explicitly authorizes it.
- Inspect the repository and read this file plus relevant documentation before every change.
- Preserve existing work and keep every change within the requested scope.

## Communication and Language

- Communicate with the user exclusively in Hungarian.
- Write source code, comments, identifiers, file names, documentation, Git titles, and Git messages in English.
- Keep user-facing application strings centralized for future localization.
- The initial application language may be English.
- Explain decisions, verified errors, potential risks, warnings, and recommendations to the user in Hungarian.

## Git Safety

- Never run Git commands that change repository state without explicit permission for that exact operation.
- Prohibited without explicit permission: `git add`, `git commit`, `git push`, `git pull`, `git merge`, `git rebase`, `git reset`, `git checkout`, `git switch`, `git stash`, `git clean`, branch or tag creation, and equivalent state-changing commands.
- Never modify Git configuration, hooks, remotes, or repository history.
- Read-only commands such as `git status`, `git diff`, and `git log` are allowed.
- Editing `.gitignore` as a normal project file is allowed when necessary, but report and explain the change.
- A request for a commit title or message does not authorize creating a commit.
- When requested, write commit titles and messages in English using Conventional Commits.

## Target Stack and Dependency Policy

- Target Android and iOS with Expo, React Native, and strict TypeScript.
- Use NativeWind as the primary styling solution with a compatible Tailwind CSS version.
- Use npm and maintain `package-lock.json` after project initialization.
- Prefer React built-in hooks, Context only when necessary, React Native APIs, Expo APIs, and native `fetch`.
- Keep third-party dependencies to the minimum reasonably required.
- Before installing a package, verify that the platform or installed stack does not already provide the capability.
- Verify compatibility against the selected Expo SDK and React Native versions using current official documentation.
- Explain every proposed new dependency and its need to the user in Hungarian before installation.
- Use Expo-compatible installation commands for native dependencies.
- Do not introduce overlapping libraries.
- Do not add Redux, Zustand, TanStack Query, Axios, React Navigation, Expo Router, UI libraries, form libraries, extra animation libraries, analytics SDKs, Firebase, backend SDKs, database libraries, or utility libraries unless explicitly approved or technically necessary and explained.

## Engineering Principles

- Apply SOLID pragmatically, with focused responsibilities and clear contracts.
- Follow KISS: prefer the simplest maintainable implementation.
- Follow DRY for business logic, API handling, design tokens, and repeated UI behavior, but avoid premature abstractions.
- Follow YAGNI: do not implement infrastructure or features that are not currently required.
- Prefer composition over inheritance, explicit behavior over implicit magic, and readability over cleverness.
- Avoid overengineering, premature optimization, excessive providers, wrappers, factories, adapters, and file fragmentation.
- Wrap native components only when the wrapper establishes a meaningful reusable contract or shared behavior.

## TypeScript Rules

- Enable and preserve TypeScript strict mode.
- Avoid `any`; use `unknown` for untrusted external values and narrow it safely.
- Use explicit types for domain entities, public APIs, and component props.
- Use inference for simple local values.
- Handle nullable and optional values deliberately.
- Avoid unsafe assertions, unnecessary non-null assertions, and suppressed TypeScript errors.
- Prefer union types for finite states.
- Do not use TypeScript enums unless clearly justified.
- Validate or safely narrow external API responses before using them.

## Architecture and File Organization

- Use a lightweight, feature-oriented structure and create directories only when they are needed.
- Place application-wide reusable UI components in `components/global/`.
- Place weather-specific UI components in `components/weather/`.
- Keep weather hooks in `hooks/weather/`, API access in `services/weather/`, and domain contracts in `types/weather/` when those layers are introduced.
- Keep shared constants, including theme tokens and UI strings, in `constants/`.
- Keep project documentation in `docs/` and synchronized with actual implementation.
- Do not create empty architecture, database, navigation, or route layers in anticipation of future needs.
- Use PascalCase component names, prefer named exports for reusable components, and generally keep one main component per file.
- Do not place API calls in presentational components.
- Do not promote a feature-specific component to `components/global/` unless it is genuinely shared.

## Styling Rules

- Use NativeWind `className` utilities for standard layout and styling after NativeWind is configured.
- Use the official setup for the selected NativeWind version, including root-level `global.css` when required.
- Centralize colors, spacing, typography, radii, and component sizes as design tokens.
- Avoid scattered arbitrary hardcoded values.
- Use `StyleSheet` or inline styles only for dynamic values, unsupported properties, platform-specific behavior, or a more appropriate native API.
- Do not assume browser CSS, DOM APIs, selectors, or browser layout behavior are available in React Native.
- Do not mix styling approaches without a documented reason.

## Cross-Platform and Accessibility Rules

- Treat Android and iOS as equal first-class targets.
- Respect safe areas, status bars, navigation bars, and device cutouts.
- Support varied screen sizes and aspect ratios without hardcoded screen dimensions.
- Allow reasonable font scaling and prevent unnecessary clipping.
- Provide accessible labels where needed and use appropriate touch target sizes.
- Use platform-specific files or `Platform.select` only when necessary.
- Consider keyboard behavior and Android hardware back behavior when relevant.
- Preserve system warnings and do not disable safety checks to hide platform issues.
- Clearly report platform differences and state when iOS remains unverified.

## Expo and Native Project Rules

- Continue with the initialized Expo-managed workflow.
- Do not run `expo prebuild`, `expo run:android`, or `expo run:ios` without explicit permission.
- Do not generate `android/` or `ios/` directories unless a documented need is approved.
- Prefer Expo Go for initial testing when all selected features support it.
- Do not introduce EAS services or cloud builds unless necessary or explicitly requested.

## Weather Feature Scope

- Use the public Open-Meteo API and native `fetch`.
- The initial implementation is limited to a predefined location, current temperature, city name, weather condition and description, basic available details, loading, error, retry, manual refresh, and last successful update time.
- Keep API communication separate from UI components.
- Map external data into typed application models and handle missing or unexpected values safely.
- Implement explicit errors and request timeout or cancellation where appropriate.
- Avoid duplicate requests and do not add a caching library initially.
- Do not add authentication, accounts, notifications, GPS permissions, databases, persistent favorites, or a custom backend unless explicitly requested.
- Review API usage limits, licensing, attribution, and requirements before implementation.

## Async UI and Error Handling

- Deliberately handle initial loading, success, incomplete or empty data, network error, retry, and refreshing states.
- Reuse global state components only when a pattern is genuinely repeated.
- Never present missing weather data as valid data.
- Never silently ignore failed requests.
- Prevent unhandled promise rejections, stale updates after unmount, memory leaks, unnecessary effects, and repeated requests.
- Keep useful Expo and React Native warnings enabled; never disable LogBox globally.
- Use `console.warn` and `console.error` sparingly and never log credentials or sensitive information.
- For unresolved warnings, document cause, affected platforms, severity, development impact, and recommended action.

## Validation and Testing

- Do not install a large testing framework during initial foundation work.
- Prioritize TypeScript validation, Expo configuration validation, dependency compatibility, basic runtime verification, and documented manual platform checks.
- Run relevant non-destructive validation after implementation tasks when possible.
- Never claim a check or platform test passed unless it was actually performed.
- Report passed, failed, and unexecuted checks separately.
- Add automated tests later only when meaningful logic or component complexity justifies them.

## Documentation and Reporting

- Keep `README.md`, `AGENTS.md`, and all files under `docs/` in English.
- Do not document planned features as implemented.
- Update documentation whenever an implementation change makes it inaccurate.
- Report completed work to the user in Hungarian, normally covering implemented changes, important files, validation, warnings, dependencies, and a concise next step when relevant.
- Explicitly state when no dependencies were added.
- Never report hypothetical validation as successful.

