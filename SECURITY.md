# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 1.x | Yes |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Email **subrahmanyam@polurulabs.com** with:

- A short description of the issue
- Steps to reproduce or a proof of concept
- Affected package version(s)
- Any known impact or exploitability notes

You should receive an acknowledgement within a few business days. We will coordinate a fix and disclosure timeline with you.

## Scope

In scope:

- XSS or injection via component APIs / children when used as documented
- Privilege or data-exposure issues introduced by this package

Out of scope:

- Vulnerabilities only present when consumers disable browser security features
- Issues in third-party dependencies already disclosed upstream (please link the advisory)
