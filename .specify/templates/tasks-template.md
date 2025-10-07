---
description: "Task list template for feature implementa- [ ] T061 Run full suite: `npm run lint`, `npm run unit`, targeted `npm run e2e`, and `npm run playwright`.ion aligned with the MyVBlog constitution"
---

# Tasks: [FEATURE NAME]

**Input**: Design artifacts from `/specs/[###-feature-name]/`
**Prerequisites**: `plan.md` (required), `spec.md` (user stories), `research.md`, `data-model.md`, `contracts/`

**Tests**: Jest unit tests, Nightwatch e2e checks, and Playwright browser verification are REQUIRED for any logic touching gist data, navigation, localization, or significant UI changes.

**Organization**: Group tasks by user story so each slice can ship independently while honoring mobile-first and bilingual requirements.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Task can run in parallel (different files, no shared state).
- **[Story]**: User story label (US1, US2, ...).
- Include exact file paths in descriptions.

## Phase 0: Constitution Gates

- [ ] T000 Capture outcomes of CP1–CP6 Constitution Check in `specs/[###-feature-name]/plan.md`.
- [ ] T001 Document gist contract changes and locale impacts in `research.md`.

## Phase 1: Tooling & Environment (Shared)

- [ ] T010 Install/update npm dependencies (`npm install`) and ensure lockfile reflects removal of unused music/audio packages.
- [ ] T011 Configure locale scaffolding under `src/i18n/` with lint/test hooks.
- [ ] T012 [P] Verify linting baseline: `npm run lint` (fix blockers before story work).

## Phase 2: Foundational Work (Blocking)

- [ ] T020 Implement gist API helpers in `src/api/` with revision + retry logic.
- [ ] T021 Build locale persistence utilities in `src/utils/` (cookie/localStorage).
- [ ] T022 Purge legacy music module assets, components, and config flags across `src/views/`, `src/mobile_views/`, and `static/configuration.json`.

**Checkpoint**: Foundational requirements satisfied; user stories can begin.

## Phase 3+: User Stories (independent slices)

For each story:

### Tests (write first)

- [ ] T03X [P] [USn] Jest unit tests covering reducers/services touched by the story.
- [ ] T03Y [P] [USn] Nightwatch e2e covering mobile navigation, locale toggle, and gist sync.
- [ ] T03Z [P] [USn] Playwright browser script to verify critical UI interactions and visual states.

### Implementation

- [ ] T04X [USn] Implement mobile-first view in `src/mobile_views/...`.
- [ ] T04Y [USn] Implement desktop parity in `src/views/...`.
- [ ] T04Z [USn] Wire locale strings in `src/i18n/[namespace].js` and update switcher UI in `src/components/...`.
- [ ] T050 [USn] Integrate gist API calls and handle error states surfaced to the UI.

**Checkpoint**: Story delivers value, passes tests, and meets bilingual/mobile expectations.

## Finalization & Cross-Cutting

- [ ] T060 Update documentation (README, locale guidelines) if behavior changes.
- [ ] T061 Run full suite: `npm run lint`, `npm run unit`, targeted `npm run e2e`.
- [ ] T062 Capture GitHub Pages preview or local static build for manual mobile/desktop smoke test.
- [ ] T063 Draft release notes referencing Constitution principles touched.

## Dependencies & Execution Order

- Phase 0 precedes all work.
- Phase 1 must complete before Phase 2.
- Phase 2 blocks user stories.
- User stories run sequentially or in parallel once Phase 2 completes; ensure no shared file conflicts.
- Finalization tasks follow the completion of required stories.

## Parallel Opportunities

- Tasks marked [P] can execute concurrently (e.g., mobile and desktop view updates in separate files).
- Different user stories can proceed in parallel after foundational tasks, provided Constitution gates are respected.

## Notes

- Maintain touch targets ≥44px and validate locale toggling in every story.
- Remove or refactor any reintroduced music/audio logic immediately.
- Capture unresolved risks in the Complexity Tracking table of `plan.md`.


