#!/usr/bin/env python3
"""CORRECT: no literal spend/validation amounts - use COSTS."""
import pathlib,re,sys
bad=[]
for fn in ['sketch.js','unique_entity_makers.js']:
 for i,l in enumerate(pathlib.Path(fn).read_text().splitlines(),1):
  if re.search(r'spend_amount\([^)]*,\s*\d+\)',l) or re.search(r'amount_in_storage\([^)]*\)\s*(<|>=)\s*\d+',l): bad.append(f'{fn}:{i}: {l.strip()}')
print('\n'.join(bad) if bad else 'costs ok'); sys.exit(1 if bad else 0)
