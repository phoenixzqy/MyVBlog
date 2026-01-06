# Research: Blog Modernization

This document outlines the research and decisions made for the blog modernization project.

## Vue 3 Migration

**Decision**: Migrate the application from Vue 2 to Vue 3.
**Rationale**: Vue 3 offers significant performance improvements, better TypeScript support, and a more maintainable codebase with the Composition API. This aligns with the goal of modernizing the application. The migration will be done in place, updating the existing code to be compatible with Vue 3.
**Alternatives considered**:
-   **Sticking with Vue 2**: This would be simpler in the short term but would not address the goal of modernization and would leave the project on an older, less performant version of the framework.
-   **Rewriting in a different framework**: This would be a much larger effort and is not necessary given the project's requirements.

## UI Framework for Mobile

**Decision**: Use Vant for the mobile UI.
**Rationale**: Vant is a lightweight, mobile-first UI library for Vue that is easy to use and has a modern design. It's a good fit for the project's goal of improving the mobile experience.
**Alternatives considered**:
-   **Element UI (existing)**: While already in the project, Element UI is primarily designed for desktop applications and is not as well-suited for mobile as Vant.
-   **Custom CSS**: This would provide maximum flexibility but would also require the most work to implement and maintain a responsive design.

## Internationalization (i18n)

**Decision**: Use `vue-i18n` for internationalization.
**Rationale**: `vue-i18n` is the official i18n library for Vue and provides a comprehensive solution for managing translations. It integrates well with Vue's reactivity system and is the standard choice for i18n in Vue applications.
**Alternatives considered**:
-   **Custom i18n solution**: This would add unnecessary complexity and would likely not be as robust or feature-rich as `vue-i18n`.

## Build Tool

**Decision**: Continue using Webpack.
**Rationale**: The project is already configured with Webpack. While other build tools like Vite exist, migrating the build process is a significant task that is out of scope for this modernization effort. We will update the Webpack configuration to support Vue 3.
**Alternatives considered**:
-   **Vite**: Vite offers faster development server startup and build times, but migrating the existing Webpack configuration would be a separate project.

## Gist Contract & Data Handling

**Contract**: The application will continue to use the GitHub Gist REST API as the backend data store.
**Key Principles**:
- All blog content is stored in gists with markdown format
- Each gist revision must be tracked to prevent conflicts
- API calls must include retry logic with exponential backoff (3 attempts minimum)
- Rate limit (403) and auth failures must surface actionable error messages to the user
- Mutations require revision confirmation before PATCH operations
- The gist structure remains unchanged to maintain backward compatibility

**Locale Impact**:
- Locale preferences are stored client-side using cookies or localStorage
- Default locale detection uses `navigator.languages` API
- Fallback hierarchy: User preference → Browser language → zh-CN (default)
- Locale switching occurs without page reload using Vue's reactivity
- Translation files are lazy-loaded to reduce initial bundle size
- Missing translation keys fall back to the key itself or default language string
