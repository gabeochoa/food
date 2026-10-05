#!/usr/bin/env python3
"""CORRECT: no implicit globals (e = new Entity / e = entities). Past: every maker in entity_makers.js + system.js helpers."""
import pathlib,re,sys
bad=[]
for fn in ['entity_makers.js','system.js','sketch.js','unique_entity_makers.js']:
 for i,l in enumerate(pathlib.Path(fn).read_text().splitlines(),1):
  if re.match(r'\s*e\s*=\s*(new Entity|entities|maybe_ent)',l): bad.append(f'{fn}:{i}: {l.strip()}')
print('\n'.join(bad) if bad else 'globals ok'); sys.exit(1 if bad else 0)
