# tangent devcontainer — Fish 4.x config
# Fish 4.3+ migrates universal vars to globals automatically on first run

set -g fish_greeting

# lsd aliases (passthrough $argv for flags)
function ls; lsd $argv; end
function l; lsd -l $argv; end
function la; lsd -a $argv; end
function lla; lsd -la $argv; end
function lt; dust; and tokei; end

if status is-interactive
    # Prompt
    starship init fish | source

    # Fuzzy finder
    fzf_configure_bindings --variables=\e\cr

    # History
    atuin init fish | source

    # Completions
    carapace _carapace fish | source

    # Directory jumping (replaces jethrokuan/z plugin)
    zoxide init fish | source
end
