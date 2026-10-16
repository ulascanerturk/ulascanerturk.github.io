@AGENTS.md

## Claude Code Notes

- Project skills are in `.claude/skills/`; invoke them as slash commands
  (`/dev-workflow feature "…"`, `/test-lint all`, …).
- `.agents/skills/` holds the Codex copy of the same skills; keep both sets in
  sync when a skill changes (Codex uses `$skill-name` instead of `/skill-name`).
