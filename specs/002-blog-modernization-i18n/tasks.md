```markdown
# Tasks: Blog Modernization

**Input**: Design artifacts from `/specs/002-blog-modernization-i18n/`
**Prerequisites**: `plan.md` (required), `spec.md` (user stories)

**Tests**: Jest unit tests, Nightwatch e2e checks, and Playwright browser verification are REQUIRED for any logic touching gist data, navigation, localization, or significant UI changes.

**Organization**: Group tasks by user story so each slice can ship independently while honoring mobile-first and bilingual requirements.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Task can run in parallel (different files, no shared state).
- **[Story]**: User story label (US1, US2, US3).
- Include exact file paths in descriptions.

## Phase 0: Constitution Gates

- [ ] T000 Capture outcomes of CP1–CP6 Constitution Check in `specs/002-blog-modernization-i18n/plan.md`.
- [ ] T001 Document gist contract changes and locale impacts in `research.md`.

## Phase 1: Tooling & Environment (Shared)

- [ ] T010 [P] Update `package.json`: Add `vue@next`, `vue-router@next`, `vuex@next`, `vue-i18n@next`, `vant`.
- [ ] T011 [P] Update `package.json`: Remove any Vue 2 related loaders or plugins if they exist (e.g. `vue-template-compiler`).
- [ ] T012 Update Webpack configuration (`build/webpack.base.conf.js`) for Vue 3 compatibility, ensuring `vue-loader` is correctly configured.
- [ ] T013 Run `npm install` to update dependencies and regenerate `package-lock.json`.
- [ ] T014 [P] Verify linting baseline: `npm run lint` (fix blockers before story work).

## Phase 2: Foundational Work (Blocking)

- [ ] T020 Update `src/main.js` to initialize a Vue 3 application, and integrate `vue-router`, `vuex`, and `vue-i18n`.
- [ ] T021 Create i18n configuration in `src/i18n/index.js` and create empty locale files `src/i18n/en.json` and `src/i18n/zh.json`.
- [ ] T022 Create a language utility in `src/utils/language.js` to get/set the current language preference using cookies or localStorage.
- [ ] T023 [P] Purge legacy music module: Delete all files and references in `src/router`, `src/store`, `src/views`, and `src/mobile_views`.
- [ ] T024 [P] Purge legacy music module: Remove any related entries from `static/configuration.json`.

**Checkpoint**: Foundational requirements satisfied; user stories can begin.

## Phase 3: User Story 1 - Seamless Language Switching (P1)

### Tests (write first)

- [ ] T030 [P] [US1] Write Jest unit tests for the language utility in `src/utils/language.js`.
- [ ] T031 [P] [US1] Write a Nightwatch e2e test to verify language switching and persistence across page reloads.
- [ ] T032 [P] [US1] Write a Playwright script to verify the language switcher UI component renders correctly and is interactive.

### Implementation

- [ ] T040 [US1] Create a `LanguageSwitcher.vue` component in `src/components/`.
- [ ] T041 [US1] Integrate the `LanguageSwitcher.vue` component into the main layouts (`src/views/layout/Layout.vue` and `src/mobile_views/layout/Layout.vue`).
- [ ] T042 [US1] Populate `src/i18n/en.json` and `src/i18n/zh.json` with translations for the main layout and navigation elements.
- [ ] T043 [US1] Refactor the layout components to use the `$t()` function from `vue-i18n` for all user-facing strings.

**Checkpoint**: Story delivers value, passes tests, and meets bilingual/mobile expectations.

## Phase 4: User Story 2 - Modernized Mobile Experience (P2)

### Tests (write first)

- [ ] T050 [P] [US2] Write Nightwatch e2e tests for navigating the main mobile pages (`Blog`, `Project`, `Self`).
- [ ] T051 [P] [US2] Write a Playwright script to verify Vant components (`van-nav-bar`, `van-tabbar`, `van-list`) render correctly on a 375px wide viewport.

### Implementation

- [ ] T060 [US2] Integrate Vant into the project by updating `src/main.js`.
- [ ] T061 [US2] Refactor `src/mobile_views/layout/Layout.vue` to use Vant's `van-nav-bar` for the header and `van-tabbar` for the bottom navigation.
- [ ] T062 [P] [US2] Refactor `src/mobile_views/blog/Main.vue` and `Details.vue` to use Vant components like `van-list`, `van-cell`, and `van-card`.
- [ ] T063 [P] [US2] Refactor `src/mobile_views/project/Main.vue` to use Vant components.
- [ ] T064 [P] [US2] Refactor `src/mobile_views/self/Main.vue` to use Vant components.

**Checkpoint**: Story delivers value, passes tests, and meets bilingual/mobile expectations.

## Phase 5: User Story 3 - Streamlined Application (P3)

### Tests (write first)

- [ ] T070 [P] [US3] Write a Nightwatch e2e test that fails if any route related to the music module is still accessible.
- [ ] T071 [P] [US3] Write a Playwright script to scan the rendered homepage and verify no music player UI elements are present in the DOM.

### Implementation

- [ ] T080 [US3] Audit `package.json` to ensure no music-related dependencies remain.
- [ ] T081 [US3] Perform a global search across the codebase for the string "music" to find and remove any lingering references.
- [ ] T082 [US3] Verify that the final application bundle size has been reduced.

**Checkpoint**: Story delivers value, passes tests, and meets bilingual/mobile expectations.

## Finalization & Cross-Cutting

- [ ] T090 Update `README.md` with new setup instructions and information about the new tech stack.
- [ ] T091 Run full test suite: `npm run lint`, `npm run test:unit`, `npm run test:e2e`, and Playwright scripts.
- [ ] T092 Manually test the deployed application on both mobile and desktop to catch any visual regressions.
- [ ] T093 Run Lighthouse performance and accessibility audits on key mobile pages and record the scores.
- [ ] T094 Draft release notes referencing the modernization effort.

## Dependencies & Execution Order

- Phase 0, 1, and 2 must be completed sequentially and before any user stories.
- User stories can be worked on after Phase 2 is complete. US1 is a prerequisite for translating content within US2.
- Finalization tasks occur after all user stories are complete.

## Parallel Opportunities

- Tasks marked [P] can be executed concurrently.
- Within Phase 4 (US2), the refactoring of different mobile views (T062, T063, T064) can happen in parallel.
```
