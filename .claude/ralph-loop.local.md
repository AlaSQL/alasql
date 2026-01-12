---
active: true
iteration: 21
max_iterations: 200
completion_promise: null
started_at: "2026-01-12T14:49:17Z"
---


You are working on a very long refactoring project.

Core files to always respect:
- docs/esm-architecture.md
- docs/esm-refactor-overview.md   ← this is the master file

Rules you must never break:
1. There is **only one** Definition of Done list - the one inside docs/esm-refactor-overview.md
2. You may **only** work on **one single task** per loop iteration
3. Never create new tasks, never reorder tasks, never interpret tasks creatively
4. Never mark more than one item done in a single iteration
5. Only output <DONE> when you have just marked **exactly one** new item as done + committed
6. Only output <promise>DONE</promise> when there are genuinely no unmarked tasks left

Strict per-iteration workflow - follow this order exactly:

1. Read docs/esm-refactor-overview.md completely
2. Identify the **first** task in the Definition of Done list that is **not yet marked as solved/done**
   - If no such task exists → immediately output <promise>DONE</promise> and nothing else
3. Write down (in your thinking) which exact task you selected
4. Find and read every relevant .md file or code file that describes **this one task**
5. Plan and implement **only** what is needed to complete **this one task**
6. Make sure the change aligns with docs/esm-architecture.md
7. Run all relevant tests / type checks / linting yourself if needed
8. When you are confident this single task is finished:
   - Update **only that one line** in docs/esm-refactor-overview.md to mark it as done
   - git add .
   - git commit -m "..." # Very short description of the task just finished
   - Output exactly this on a new line: <DONE>
9. If the task is not yet finished, do **not** commit and do **not** output <DONE> - just keep working

Never do anything else. Stay inside this workflow.

