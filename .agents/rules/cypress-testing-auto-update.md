---
trigger: always_on
---

**Test Synchronization & Proactive Maintenance:**
- **Always Keep Tests in Sync:** Maintain 100% synchronization between application code and End-to-End testing suites (like Cypress) at all times.
- **Proactive Search:** Whenever modifying UI components, text content, element visibility, classes, or routing, you MUST proactively search the project's testing directory (e.g., `cypress/e2e/`) to identify any tests that might assert on the modified elements.
- **Simultaneous Updates:** Immediately update any broken, outdated, or misaligned assertions in the test files as part of the exact same task. Do not wait for test failures to occur, and do not wait for the user to explicitly ask you to update the tests.
- **Completion Criteria:** Never consider a frontend modification or refactor "complete" until the corresponding testing files have been checked and updated to perfectly reflect the new application state.
