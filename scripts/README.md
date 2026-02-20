# scripts/

Automation scripts for tangent-template. All written in Coconut (.coco).

## Running Scripts

```bash
coconut-run scripts/<name>.coco              # dry-run (default)
coconut-run scripts/<name>.coco --live       # execute
coconut-run scripts/<name>.coco --fix        # apply fixes
```

Use `coconut-run` (not `coconut --run`) -- it enables the import hook.

## Conventions

- All scripts must be idempotent (safe to run twice)
- Print markers: `[+]` ok, `[X]` fail, `[-]` skip, `[!]` warn
- Destructive operations require `--dry-run` (default True)
- ASCII-only output (no emoji -- Windows cp1252 crashes)

## Script Inventory

| Script                   | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| `bootstrap_windows.coco` | Check/fix Windows env (PYTHONUTF8, git config, tools) |
| `setup_vscode_env.coco`  | Generate all VSCode/formatter configs                 |
| `health_check.coco`      | Validate project config consistency                   |
| `verify_formatters.coco` | End-to-end formatter test                             |
| `precommit.coco`         | Git pre-commit hook (Prettier, ESLint, Ruff, Coconut) |
| `scaffold.coco`          | Customize template for new project                    |
| `sync_template.coco`     | Detect config drift vs upstream template              |
| `env_setup.coco`         | Full environment setup                                |
| `env_cleanup.coco`       | Remove redundant packages after migration             |
| `repo_audit.coco`        | Repository audit and cleanup                          |

## Pipeline Order

New machine: `bootstrap_windows` -> `setup_vscode_env` -> `health_check` New
project: `scaffold` -> `precommit --install` -> `health_check` After template
updates: `sync_template` -> `health_check` Verify formatting:
`verify_formatters`
