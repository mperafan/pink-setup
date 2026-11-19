#!/bin/bash
# Status line: model | folder | git branch | context % (colored)
input=$(cat)

model=$(echo "$input" | jq -r '.model.display_name')
dir=$(echo "$input" | jq -r '.workspace.current_dir')
used=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
branch=$(git -C "$dir" --no-optional-locks symbolic-ref --short HEAD 2>/dev/null)

out="$model | $(basename "$dir")"
[ -n "$branch" ] && out="$out | $branch"

if [ -n "$used" ]; then
  pct=$(printf '%.0f' "$used")
  if [ "$pct" -lt 40 ]; then
    color='\033[38;5;218m'   # light pink (normal)
  elif [ "$pct" -le 60 ]; then
    color='\033[38;5;205m'   # hot pink (warning)
  else
    color='\033[31m'         # red (critical)
  fi

  # 10-cell bar measured in eighths (80 total), so partial cells show detail
  partials=("" "▏" "▎" "▍" "▌" "▋" "▊" "▉")   # index = eighths in the cell
  eighths=$(( (pct * 80 + 50) / 100 ))
  [ "$eighths" -gt 80 ] && eighths=80
  full=$(( eighths / 8 ))
  rem=$(( eighths % 8 ))

  bar=""
  for ((i = 0; i < full; i++)); do bar+="█"; done
  cells=$full
  if [ "$rem" -gt 0 ]; then bar+="${partials[$rem]}"; cells=$((cells + 1)); fi
  for ((i = cells; i < 10; i++)); do bar+=" "; done

  printf "%s | ${color}[%s] %s%%\033[0m\n" "$out" "$bar" "$pct"
else
  printf "%s\n" "$out"
fi
