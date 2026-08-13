# Contributing to FileGuard

Contributions must preserve FileGuard’s defensive boundary: selected files are read-only inputs, never executed, previewed, uploaded, or extracted to disk. Tests must use only benign synthetic fixtures; do not commit malware, exploit samples, credentials, or personally identifying data.

Run the full local quality gate before opening a change:

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

New indicators must be deterministic and explainable. Add an identifier, severity, human-readable explanation, evidence string, English and Arabic presentation, and a test fixture that demonstrates the intended behavior. A score must describe review priority rather than assert that a file is malicious.
