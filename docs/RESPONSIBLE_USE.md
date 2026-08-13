# Responsible Use and Safety Boundary

FileGuard is a defensive local-triage tool. It is designed to help users identify files that deserve a safer review path and to preserve basic evidence for an IT or incident-response team. It does **not** determine that a file is malicious, decrypt protected content, bypass protections, execute samples, or contact remote reputation services automatically.

Users must handle suspicious material in accordance with their organization’s policies. If a file appears high risk, preserve the original, avoid opening it, document its source, and hand it to the appropriate security or IT function. The presence of an indicator is not proof of compromise; the absence of indicators is not a guarantee of safety.

## Privacy model

The initial release processes data on the user’s device. It does not upload file bytes, paths, names, hashes, reports, or telemetry. Future optional integrations, if any, must be disabled by default, clearly disclose the precise data leaving the device, and require a fresh affirmative user action.
