# pink-setup

A soft pink setup for the terminal, Zed and Claude Code. Every color comes from two pinks:
`#ffafd7` (light pink, xterm 218) and `#ff5faf` (hot pink, xterm 205), plus `#ff5f5f` for warnings.

```
 (\_/)   ♡    ⋆     ♡    ⋆     ♡    ⋆
 ( •.•)  ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆
 / >♡     ⋆    ♡     ⋆    ♡     ⋆    ♡
```

## What's inside

| Folder | What it is |
|---|---|
| `zed/pink.json` | Zed theme with two variants: **Pink Dark** (cool charcoal) and **Pink Light** (soft pink, almost white) |
| `claude/statusline-command.sh` | Claude Code status line with a 10-cell context bar that fills in eighths: `[████▎     ] 42%` |
| `bunny-separator/` | Claude Code mod that draws a pink bunny with a line of hearts and stars above each prompt you type |

## Install

### Zed theme

```sh
mkdir -p ~/.config/zed/themes
cp zed/pink.json ~/.config/zed/themes/
```

Then pick **Pink Dark** or **Pink Light** with `ctrl-k ctrl-t`, or set them in `settings.json`:

```json
"theme": { "mode": "system", "light": "Pink Light", "dark": "Pink Dark" }
```

### Status line

Needs `jq`.

```sh
cp claude/statusline-command.sh ~/.claude/
```

Then add this to `~/.claude/settings.json`:

```json
"statusLine": { "type": "command", "command": "bash ~/.claude/statusline-command.sh" }
```

The bar is light pink below 40% context, hot pink from 40–60%, and red above 60%.

### Bunny separator

At the prompt of a Claude Code terminal session:

```
/plugin install bunny-separator --marketplace mperafan/pink-setup
```

Answer `y` to add the marketplace, then pick a scope. From a shell instead:

```sh
claude plugin install bunny-separator --marketplace mperafan/pink-setup
```

In the desktop app, click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `mperafan/pink-setup`, then **Add plugin**.
