# Data Model: Blog Modernization

This document describes the data models for the blog modernization project. As the project is primarily a frontend refactor, the core data models are simple and relate to the user's interaction with the application.

## Language Preference

-   **Description**: Stores the user's selected language.
-   **Fields**:
    -   `language` (string): The selected language code (e.g., 'en', 'zh').
-   **Validation**: Must be one of the supported language codes.
-   **Persistence**: This will be stored in the user's browser, likely using `localStorage` or a cookie.

## Translation

-   **Description**: Represents a single piece of translated text.
-   **Fields**:
    -   `key` (string): A unique identifier for the text (e.g., 'home.title').
    -   `en` (string): The English translation.
    -   `zh` (string): The Simplified Chinese translation.
-   **Persistence**: These will be stored in JSON files within the `src/i18n` directory.

## Gist Data

The existing data structure for blog posts, projects, etc., stored in GitHub Gists will not be changed. The application will continue to consume this data as-is. The primary change is how this data is presented to the user in the modernized UI.
