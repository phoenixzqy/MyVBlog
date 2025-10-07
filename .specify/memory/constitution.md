<!--
Sync Impact Report
Version change: 1.0.0 → 1.1.0
Modified principles:
- Added "Browser-Based Verification"
- Updated "Verifiable Delivery Pipeline"
Added sections: none
Removed sections: none
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs: none
-->

# MyVBlog Constitution

## Core Principles

### Gist-Synchronized Content Source (Non-Negotiable)
- All blog reads and writes MUST use the GitHub Gist REST API with authenticated tokens managed through `static/configuration.json`.
- Mutations MUST be idempotent: confirm the latest gist revision before patching, include descriptive commit messages, and capture rollback metadata.
- The UI MUST surface rate-limit, authorization, or network failures with actionable recovery steps and implement exponential backoff (minimum three retries) before surfacing errors.
Rationale: GitHub Gist is the single source of truth; disciplined contracts prevent data loss and drift.

### Mobile-First Modernization
- Feature specs MUST start with wireframes validated at ≤375px width and rely on Vant or lightweight custom components that maintain responsive breakpoints.
- Layouts MUST sustain 60fps scroll interactions on mid-tier devices by lazy-loading heavy assets and delivering responsive images.
- Desktop enhancements MUST NOT regress mobile accessibility; interactive elements require ≥44px touch targets and color contrast ≥4.5:1.
Rationale: Most readership is mobile; protecting performance and accessibility keeps the blog usable.

### Bilingual UX (zh-CN & en-US)
- Every user-facing string MUST live in locale dictionaries for `zh-CN` and `en-US`; components MUST NOT hard-code copy.
- The default locale MUST derive from `navigator.languages` with fallback to Simplified Chinese (`zh-CN`), and manual overrides MUST persist via cookie or localStorage.
- A visible language switcher MUST be reachable within two taps on mobile and one click on desktop, updating copy without page reloads.
Rationale: Bilingual support respects user preferences and broadens reach.

### Lean Surface & Focused Modules
- The legacy music player and related configuration flags MUST remain removed; no autoplay or ambient media modules may ship without governance approval.
- New features MUST map directly to reading, writing, organizing, or localizing blog content; ancillary ideas require a mini-spec proving alignment.
- Decommissioned assets and dependencies MUST be purged during implementation to keep bundles minimal.
Rationale: A focused surface keeps performance high and maintenance sustainable.

### Verifiable Delivery Pipeline
- All changes MUST pass ESLint, Jest unit coverage for touched logic, and targeted Nightwatch e2e flows covering mobile navigation and locale toggling.
- All UI changes MUST be verified using browser-based testing tools (Playwright).
- Each release MUST include a staged GitHub Pages build (or local static preview) demonstrating gist synchronization and bilingual rendering.
- Deployment notes MUST document principle compliance and any residual risks reviewed with the maintainer.
Rationale: Static hosting demands proactive verification to catch regressions early.

### Browser-Based Verification
- All significant UI changes, including layout, styling, and interactivity, MUST be verified using the Playwright MCP tool.
- Verification steps SHOULD be documented in the task description or a separate test plan.
- The goal is to ensure that the visual and interactive aspects of the application meet the requirements on different devices and browsers.
Rationale: Automated browser-based verification provides a high level of confidence in the quality of the UI and helps prevent visual regressions.

## Experience Guardrails
- Maintain a single Vue 3 SPA using Vant for mobile layouts, sharing state via Vuex modules.
- Keep authoring flows touch-friendly with sticky action bars, safe-area padding, and markdown previews responsive to orientation changes.
- Store locale dictionaries under `src/i18n/` and validate fallbacks via automated lint or tests.
- Ensure public pages load within two seconds on 4G (Lighthouse mobile score ≥75) by deferring optional scripts and serving responsive hero imagery.
- Remove or archive all music-related assets, scripts, and configuration toggles in both desktop and mobile layouts; update docs to reflect the retirement.

## Delivery Workflow & Quality Gates
1. **Kickoff**: Record Constitution Check outcomes in `plan.md` and secure gist tokens for staging verification.
2. **Design**: Produce mobile-first mocks, bilingual copy decks, and data contract notes; review with the maintainer.
3. **Implementation**: Branch from `master`, add responsive + i18n logic, and ensure locale resources stay in sync with gist metadata.
4. **Verification**: Run `npm run lint`, `npm run unit`, targeted `npm run e2e`, and perform Playwright verification for UI changes. Capture a GitHub Pages preview or static build for manual smoke (mobile + desktop).
5. **Launch & Review**: Update `static/configuration.json` when necessary, merge via PR referencing Constitution gates, and schedule a post-launch metric check.

## Governance
- This constitution supersedes prior ad-hoc workflows; reviewers MUST verify principle compliance on every PR.
- Amendments require a PR with rationale, maintainer approval, and an updated Sync Impact Report; bump the version per semantic rules (MAJOR for breaking/removals, MINOR for new principles/guidance, PATCH for clarifications).
- Compliance reviews MUST precede every release and occur quarterly; log findings in the project wiki and open issues for gaps.

**Version**: 1.1.0 | **Ratified**: 2025-10-07 | **Last Amended**: 2025-10-07
