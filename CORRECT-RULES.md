# Correct rules (food) — agent instruction file (none existed)

| Rule | Enforcement |
|---|---|
| Declare every entity temp (`const e=`); no implicit globals | `python3 scripts_check_globals.py` |
| `remove_entity` mutates EC id lists; keep behavior test green | `node tests/remove_entity.test.js` |
| Build/unlock amounts only from `COSTS` in costs.js | `python3 scripts_check_costs.py` |
| Never edit vendored p5*.js | (review) |
