# CORRECT — food

Trivial/old p5 repo, no tests/CI before — 3 real classes.
(1) Implicit global `e` every maker + system helpers. Level: code fix + lint. Commit 5b1586a. Proof: HEAD entity_makers.js -> checker 1; fixed passes.
(2) remove_entity no-op/inverted (EC stores ids; d371039). Level: behavior test. Commit d173caa. Proof: HEAD ec.js -> test fails EC lists removed; fixed passes.
(3) Hardcoded costs diverge (8c1e2df; house validated >=5 spent 50). Level: architecture single COSTS table + lint. Commit ed73704. Proof: HEAD unique_entity_makers.js -> checker 1; fixed passes.
Rule table: CORRECT-RULES.md.
