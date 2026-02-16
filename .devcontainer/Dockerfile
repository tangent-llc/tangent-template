# =============================================================================
# tangent-template Devcontainer — Fedora 41
# =============================================================================
# Target: GitHub Codespaces / VS Code Remote Containers
# Stack: Bun + Fish 4.x + Python/Coconut (via uv) + Rust CLI tools
# Version: v1.1 — 2026-02-16
# =============================================================================

FROM registry.fedoraproject.org/fedora:41 AS builder

LABEL version="1.1"
LABEL description="tangent devcontainer — Bun/Fish/Python"
LABEL maintainer="contact@tangent.berlin"

# --- Args -------------------------------------------------------------------
ARG HOME="/root"
ARG XDG_CONFIG_HOME="/root/.config"
ARG XDG_CACHE_HOME="/root/.cache"
ARG WORKDIR="/src"
ARG CARGO_HOME="/opt/cargo"
ARG BUN_VERSION="1.3.9"
ARG PYTHON_VERSION="3.12"

# --- Env vars ----------------------------------------------------------------
ENV HOME="${HOME}" \
    XDG_CONFIG_HOME="${XDG_CONFIG_HOME}" \
    XDG_CACHE_HOME="${XDG_CACHE_HOME}" \
    CARGO_HOME="${CARGO_HOME}" \
    RUSTUP_HOME="/opt/rustup" \
    BUN_INSTALL="${HOME}/.bun" \
    PATH="${CARGO_HOME}/bin:${HOME}/.bun/bin:${HOME}/.local/bin:/usr/local/bin:${PATH}" \
    LANG="en_US.UTF-8" \
    LC_ALL="en_US.UTF-8" \
    TZ="Europe/Berlin" \
    EDITOR="/usr/local/bin/micro" \
    MICRO_TRUECOLOR="1" \
    FZF_DEFAULT_COMMAND="fd --hidden --no-ignore-vcs" \
    BAT_THEME="Dracula"

# --- Directories -------------------------------------------------------------
RUN mkdir -p "${HOME}" "${WORKDIR}" "${XDG_CONFIG_HOME}" "${XDG_CACHE_HOME}" "${CARGO_HOME}"

# =============================================================================
# Layer 1: System packages (Fedora has full repos — no EPEL/CRB needed)
# =============================================================================
RUN dnf update -y && \
    dnf install -y \
        curl git unzip tar xz gzip \
        openssl-devel bzip2-devel libffi-devel zlib-devel sqlite-devel \
        gcc make cmake \
        jq procps-ng findutils which diffutils \
        langpacks-en glibc-langpack-en \
        fish gh && \
    dnf clean all && \
    rm -rf /var/cache/dnf

# =============================================================================
# Layer 2: Rust toolchain (needed for cargo CLI tools)
# =============================================================================
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | \
    sh -s -- -y --default-toolchain stable --profile minimal

# =============================================================================
# Layer 3: uv (replaces Poetry + pyenv)
# =============================================================================
COPY --from=ghcr.io/astral-sh/uv:0.10.0 /uv /uvx /bin/

RUN uv python install ${PYTHON_VERSION}

# =============================================================================
# Layer 4: Bun (pinned version, no Node.js)
# =============================================================================
RUN curl -fsSL https://bun.sh/install | bash -s -- "bun-v${BUN_VERSION}"

# =============================================================================
# Layer 5: Editor + fuzzy finder
# =============================================================================
RUN curl -fsSL https://getmic.ro | bash && \
    mv micro /usr/local/bin/micro && \
    chmod +x /usr/local/bin/micro

RUN git clone --depth 1 https://github.com/junegunn/fzf.git "${HOME}/.fzf" && \
    "${HOME}/.fzf/install" --all --no-bash --no-zsh

# =============================================================================
# Layer 6: Cargo CLI tools via cargo-binstall (pre-compiled binaries)
# =============================================================================
RUN . "${CARGO_HOME}/env" && \
    curl -fsSL https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash && \
    cargo binstall --no-confirm \
        bat \
        lsd \
        ripgrep \
        fd-find \
        du-dust \
        tokei \
        starship \
        tre-command \
        watchexec-cli \
        zoxide \
        git-delta \
        atuin && \
    rm -rf "${CARGO_HOME}/registry" "${CARGO_HOME}/git"

# =============================================================================
# Layer 7: carapace (multi-shell completions — auto-resolve latest release)
# =============================================================================
RUN CARAPACE_URL=$(curl -s https://api.github.com/repos/carapace-sh/carapace-bin/releases/latest | \
        jq -r '.assets[] | select(.name | contains("linux_amd64.tar.gz")) | .browser_download_url') && \
    curl -fsSL "$CARAPACE_URL" -o /tmp/carapace.tar.gz && \
    tar -xzf /tmp/carapace.tar.gz -C /usr/local/bin carapace && \
    chmod +x /usr/local/bin/carapace && \
    rm /tmp/carapace.tar.gz

# =============================================================================
# Layer 8: Coconut (Python superset for scripting)
# =============================================================================
RUN uv tool install coconut

# =============================================================================
# Runtime stage
# =============================================================================
FROM builder

SHELL ["/usr/bin/fish", "-c"]

# --- Fisher + plugins --------------------------------------------------------
RUN curl -fsSL https://raw.githubusercontent.com/jorgebucaran/fisher/main/functions/fisher.fish | source && \
    fisher install \
        jorgebucaran/fisher \
        decors/fish-colored-man \
        jorgebucaran/autopair.fish \
        nickeb96/puffer-fish \
        jorgebucaran/replay.fish \
        joehillen/to-fish \
        tangent-berlin/fzf.fish \
        tangent-berlin/fish-fzf-z \
        omochice/fzf-emoji.fish \
        daleeidd/natural-selection \
        dracula/fish

# --- Config files ------------------------------------------------------------
COPY config/config.fish "${XDG_CONFIG_HOME}/fish/config.fish"
COPY config/starship.toml "${XDG_CONFIG_HOME}/starship.toml"
COPY config/.gitconfig "${HOME}/.gitconfig"
COPY config/.gitattributes "${HOME}/.gitattributes"

WORKDIR "${WORKDIR}"
