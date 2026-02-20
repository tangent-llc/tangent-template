# CLAUDE.md -- tangent-template

## What this is

Devcontainer template for Next.js + Bun + Tailwind + Supabase projects.

## Stack

| Layer     | Tool                     |
| --------- | ------------------------ |
| Runtime   | Bun (NOT npm/npx)        |
| Framework | Next.js 16+ (App Router) |
| Styling   | Tailwind CSS             |
| UI        | shadcn/ui                |
| Backend   | Supabase + PostGIS       |
| Scripting | Coconut (.coco files)    |

## Formatter routing

| File type      | Format / Lint     | Extension         |
| -------------- | ----------------- | ----------------- |
| JS/TS/CSS/JSON | Prettier + ESLint | prettier + eslint |
| MD/YAML        | Prettier          | prettier          |
| TOML           | Even Better TOML  | even-better-toml  |
| Python/Coconut | Ruff              | ruff              |

**DO NOT install or configure Biome.** It fails on the personal PC due to glibc
incompatibility.

## Commands

All JS/TS commands use `bun` prefix. Never bare `prettier`, `eslint`, `next`, or
`npx`.

```bash
bun run dev          # Next.js dev server with Turbopack
bun run build        # Production build
bun run lint         # ESLint fix
bun run format       # Prettier fix
bun run ci           # Check all (format + lint + types)
bun run fix          # Fix all (format + lint)
```

## Python / Coconut

Three-tier package strategy:

- `pip install --user` -- shell ecosystem (xonsh, coconut, xontribs, rich,
  textual, structlog, pydantic)
- `uv tool install` -- standalone CLIs (httpie, litecli, llm)
- `uv` with pyproject.toml -- project dependencies

## Scripting rules

1. Every automation script goes in `scripts/` as `.coco`
2. No inline bash -- if it's more than one command, write a script
3. Bash only for atomic operations (`git add .`, `mkdir -p`, `cp`)
4. Scripts must be idempotent (safe to run twice)
5. Scripts must print actions: `[+]` ok, `[X]` fail, `[-]` skip, `[!]` warn
6. Destructive operations require `--dry-run` flag (default True)
7. Use `data` types, `subprocess.run`, `shutil.which`, `Path`
8. NO `os.system()` or `subprocess.run("bash -c ...")`

## Scripts inventory

| Script                   | Purpose                        |
| ------------------------ | ------------------------------ |
| `precommit.coco`         | Pre-commit hook                |
| `scaffold.coco`          | Template customizer            |
| `sync_template.coco`     | Config drift detector          |
| `verify_formatters.coco` | End-to-end formatter test      |
| `health_check.coco`      | Project config validator       |
| `bootstrap_windows.coco` | Work PC env setup              |
| `setup_vscode_env.coco`  | VSCode extension audit/install |
| `env_setup.coco`         | Full environment setup         |
| `env_cleanup.coco`       | Remove redundant packages      |
| `repo_audit.coco`        | Repository audit and cleanup   |

### Pipeline

```text
NEW MACHINE              NEW PROJECT              ONGOING
bootstrap_windows    ->  scaffold             ->  sync_template
setup_vscode_env     ->  precommit --install  ->  health_check
health_check         ->  health_check         ->  verify_formatters
```

## Coconut patterns

```coconut
# Correct: data types
data CheckResult(name: str, status: str, detail: str)

# Correct: pattern matching on status
match result.status:
    case "ok":   print(f"  [+] {result.name}")
    case "fail": print(f"  [X] {result.name}")

# Correct: pipe operator
files |> filter$(f -> f.suffix == ".coco") |> list

# Wrong: os.system
os.system("git add .")  # NO

# Correct: subprocess
subprocess.run(["git", "add", "."], check=True)
```

## File structure

```text
tangent-template/
+-- CLAUDE.md
+-- .devcontainer/
|   +-- Dockerfile
|   +-- devcontainer.json
|   +-- docker-compose.yml
|   +-- config/
+-- .vscode/
|   +-- settings.json
|   +-- extensions.json
+-- scripts/           <- all .coco files
+-- src/app/           <- Next.js app
|   +-- page.tsx
|   +-- layout.tsx
|   +-- globals.css
+-- .prettierrc
+-- .prettierignore
+-- .editorconfig
+-- .gitignore
+-- .markdownlint.json
+-- .dockerignore
+-- .env.example
+-- eslint.config.mjs
+-- next.config.ts
+-- next-env.d.ts
+-- postcss.config.mjs
+-- tsconfig.json
+-- package.json
+-- bun.lock
```

## Constraints

- Corporate proxy may block some URLs.
- Windows long paths not enabled (requires admin)
- `ruff` not in Windows host PATH -- works via VSCode extension
- `code` CLI is available
