# Architecture

## Status

The repository currently contains only the minimal Expo entry point and an empty root view. The feature architecture below remains proposed until weather implementation begins.

## Architectural Goals

- Keep the codebase small and easy to navigate.
- Separate presentation, application state, API access, and external data mapping where the separation has practical value.
- Prefer feature-oriented organization without creating unused layers.
- Make asynchronous UI behavior explicit and predictable.
- Support Android and iOS through shared code by default.

## Proposed Modules

### Application Entry

`App.tsx` should compose the initial screen and global styling entry points. It should not contain API parsing or complex business logic.

### Global Components

`components/global/` should contain only reusable application-wide UI contracts that are actually used, such as a screen container or repeated asynchronous state presentation.

Global components should not contain weather-specific knowledge.

## State and Data Flow

- Use local React state and built-in hooks for the initial single-screen application.
- Introduce Context only if state must genuinely be shared across distant consumers.
- Do not introduce a third-party state or server-state library initially.
- Never render missing values as if they were valid weather measurements.

## Error Model

Expected failures should be converted into small, meaningful application errors suitable for user feedback and retry behavior. Unexpected failures should remain diagnosable during development without exposing implementation details to the user. Using modal to notify the user in case of an error; do not include sensitive content in the modal, and keep the message very brief is recommended. Yellow: warning, red: error; Icon, title, desc.

## Future Change Guidelines

- Add navigation only when multiple screens are required.
- Add persistence only when a real persisted feature is approved.
