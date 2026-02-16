# tangent-template

Devcontainer template for Next.js + Bun + Tailwind + Supabase projects.

## Quick Start

### From GitHub Template

1. Click "Use this template" on GitHub
2. Clone your new repo
3. Run the scaffold:

```bash
coconut-run scripts/scaffold.coco --name your-project-name
```

This customizes package.json, creates .env.local, updates CLAUDE.md, and
installs the pre-commit hook.

### For Development

```bash
bun install
bun run dev        # Next.js dev server with Turbopack
bun run ci         # Check formatting + linting + types
bun run fix        # Auto-fix formatting + linting
```

### With Codespaces / Devcontainer

Open in GitHub Codespaces or VS Code Dev Containers. The `.devcontainer/` config
provides a full environment with Fish shell, Rust CLI tools, and all formatters
pre-installed.

## Stack

| Layer         | Tool                                     |
| ------------- | ---------------------------------------- |
| Runtime       | Bun                                      |
| Framework     | Next.js (App Router)                     |
| Styling       | Tailwind CSS                             |
| UI Components | shadcn/ui                                |
| Backend       | Supabase + PostGIS                       |
| Formatting    | Prettier + ESLint (JS/TS), Ruff (Python) |
| Scripting     | Coconut (.coco)                          |
| Devcontainer  | RHEL 9 UBI + Fish 4 + uv                 |

## Formatter Routing

| Files                          | Format           | Lint   |
| ------------------------------ | ---------------- | ------ |
| JS/TS/JSX/TSX/CSS/JSON/MD/YAML | Prettier         | ESLint |
| TOML                           | Even Better TOML | --     |
| Python/Coconut                 | Ruff             | Ruff   |

**Biome is not used.** See CLAUDE.md for details.

## Scripts (Coconut)

All automation lives in `scripts/` as `.coco` files. Run with
`coconut-run scripts/<name>.coco`.

| Script                   | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `scaffold.coco`          | Customize template for new project           |
| `precommit.coco`         | Git pre-commit hook (Prettier, ESLint, Ruff) |
| `health_check.coco`      | Validate config consistency                  |
| `verify_formatters.coco` | End-to-end formatter test                    |
| `sync_template.coco`     | Detect config drift vs upstream template     |
| `setup_vscode_env.coco`  | Generate VSCode configs                      |
| `bootstrap_windows.coco` | Work PC environment setup                    |

## For Claude Code Users

This repo includes `CLAUDE.md` with full operating instructions. Claude Code
reads it automatically. Key rules:

- All scripts are Coconut (.coco), never .py or bash
- All JS/TS commands use `bun` prefix
- Prettier + ESLint for JS/TS, Ruff for Python
- Scripts are idempotent (safe to run twice)

## Project Structure

```text
tangent-template/
├── CLAUDE.md              # Claude Code instructions
├── .devcontainer/         # Codespaces/devcontainer config
│   ├── Dockerfile
│   ├── devcontainer.json
│   ├── docker-compose.yml
│   └── config/            # Fish, Starship, git configs
├── .vscode/               # VSCode settings + extensions
├── scripts/               # Coconut automation
├── src/app/               # Next.js app (minimal)
├── .prettierrc            # Prettier config
├── eslint.config.mjs      # ESLint flat config
├── next.config.ts         # Next.js config
├── tsconfig.json          # TypeScript config
└── package.json           # Bun scripts + deps
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md) and
[DEVELOPMENT.md](.github/DEVELOPMENT.md).

## License

[MIT](.github/LICENSE.md)
