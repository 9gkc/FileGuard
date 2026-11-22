# Security Policy

## Supported Version

Security fixes target the latest release on the `main` branch.

## Responsible Use

FileGuard is an **offline-first**, local-only triage tool. It does not execute selected files, does not automatically upload data, and does not query external reputation services by default. Findings are prompts for human review, not definitive malware verdicts.

## Reporting a Vulnerability

Do **not** publish a vulnerability that could compromise FileGuard users, their local evidence, or the project’s release pipeline in a public issue.

1. Prefer GitHub’s private security-advisory reporting channel for this repository.
2. Include a reproducible, minimal description of the issue and the observed FileGuard version.
3. Use only benign synthetic fixtures. Do **not** attach real suspicious files, credential material, personal data, or malware.

Reports that identify a bypass of the “no execution” or “no automatic upload” boundaries are particularly valuable.

Reports are reviewed in good faith and handled as quickly as practical.
