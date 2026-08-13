# FileGuard Architecture

FileGuard is an offline-first desktop application for defensive file triage. Its core rule is simple: **it reads file bytes and metadata but never executes selected content**. The renderer process has no Node.js access, while the Electron preload bridge exposes a minimal, named set of local operations: select files, request analysis, export a report, and reveal a local file path.

| Layer | Responsibility | Security boundary |
| :--- | :--- | :--- |
| Renderer | Bilingual interface, drag-and-drop, result presentation | Cannot use Node.js or arbitrary operating-system APIs. |
| Preload | Narrow typed bridge between interface and desktop process | Exposes only four allowlisted IPC calls. |
| Main process | Native file picker and local report export | Does not execute, preview, or upload selected files. |
| Analysis core | Static signatures, bounded byte inspection, hash, archive inventory, explainable score | Opens files read-only; it never extracts archive contents to disk. |

The scoring model is deterministic and evidence-based. Scores indicate which files warrant a review; they are not malware verdicts. Every score contribution is stored as a named indicator with its evidence, so a student, analyst, or IT team can review the basis for the result.
