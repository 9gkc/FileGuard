# Contributing to FileGuard

Thank you for considering a contribution.

## Core Boundary

Contributions must preserve FileGuard’s defensive boundary:

- Selected files are **read-only** inputs
- Files are **never** executed, previewed, uploaded, or extracted to disk
- Tests must use only **benign synthetic fixtures**
- Do not commit malware, exploit samples, credentials, or personally identifying data

## Development Standards

- Keep changes focused and explainable
- Prefer small, verifiable improvements
- Maintain bilingual (English + Arabic) presentation where relevant
- Update documentation when behavior changes

## Local Quality Gate

Run the full local quality gate before opening a change:

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

## New Indicators

Any new indicator must be:

- Deterministic
- Explainable
- Accompanied by an identifier, severity, human-readable explanation, and evidence string
- Presented in both English and Arabic
- Covered by a test fixture that demonstrates the intended behavior

A score must describe **review priority**, never assert that a file is malicious.

## Pull Requests

A good pull request describes the problem, the solution, the validation performed, and any known limitations.
