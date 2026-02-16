# Development

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/)
- [GitHub Account](https://github.com/join)

## Getting Started

1. Clone the repository:
   `git clone https://github.com/tangent-llc/tangent-template.git`

2. Open the cloned repository with Visual Studio Code.

3. You'll see a pop-up asking to "Reopen in Container". Click on it. This builds
   the Docker environment from `.devcontainer/`. If you don't see the pop-up,
   press `F1`, type `Dev Containers: Reopen in Container`, and hit `Enter`.

4. After the container is built and running, you're ready to start development.

### Local Development (without container)

```bash
bun install
bun run dev        # Next.js dev server with Turbopack
bun run ci         # Check formatting + linting + types
bun run fix        # Auto-fix formatting + linting
```

## Formatter Stack

| Files                          | Format           | Lint   |
| ------------------------------ | ---------------- | ------ |
| JS/TS/JSX/TSX/CSS/JSON/MD/YAML | Prettier         | ESLint |
| TOML                           | Even Better TOML | --     |
| Python/Coconut                 | Ruff             | Ruff   |

All formatter configs are in the repo root: `.prettierrc`, `eslint.config.mjs`,
`.editorconfig`. VSCode settings auto-route files to the correct formatter on
save.

## Running Tests

- TypeScript: `bun test`
- Python: `uv run pytest` (when project has a pyproject.toml with test deps)

## Git Hooks

The pre-commit hook is managed by `scripts/precommit.coco`. Install it with:

```bash
coconut-run scripts/precommit.coco --install
```

It runs Prettier, ESLint, Ruff, and Coconut syntax checks on staged files.

## Environment Variables

Add environment variables to `.env.local` (ignored by Git). See `.env.example`
for the template.

## Debugging

VSCode launch configurations are in `.vscode/launch.json`:

- **Bun dev**: Start the Next.js dev server
- **Python: Current File**: Debug the currently open Python file

## Project Structure

```
tangent-template/
├── src/app/           # Next.js App Router
├── scripts/           # Coconut automation
├── .devcontainer/     # Docker + Fish + CLI tools
├── .vscode/           # Editor settings + extensions
└── CLAUDE.md          # Claude Code operating instructions
```

## Making a Pull Request

1. Push your branch: `git push origin <your-branch-name>`
2. Open a pull request on GitHub
3. Ensure all CI checks pass (`bun run ci`)
