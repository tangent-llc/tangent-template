# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.2.x   | Yes       |

## Reporting a Vulnerability

Please send an email to <contact@tangent.berlin> with detailed information about
the vulnerability. Please refrain from public disclosure until we have had the
opportunity to address it.

When you report a vulnerability, we commit to:

- Acknowledge receipt promptly.
- Provide an estimated timeframe for resolution.
- Inform you when the vulnerability has been addressed.

## Dependencies

The devcontainer is built on RHEL 9 UBI with:

- Bun (JavaScript runtime)
- Python 3.12 via uv
- Fish 4.x shell
- Rust CLI tools (via cargo-binstall)

We make every effort to keep all dependencies up-to-date and apply necessary
security patches.

## License

This project is under the MIT license, which provides no warranty. Use it at
your own risk.
