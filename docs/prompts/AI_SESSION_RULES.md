# TeraSight — AI Session Rules

## Objective

Maintain a disciplined, incremental, production-grade AI-assisted engineering workflow.

The goal is not maximum code generation.
The goal is maximum long-term maintainability and architectural consistency.

---

# Session Initialization

Before starting any coding session, the AI must read:

1. PROJECT_VISION.md
2. PRODUCT_SPEC.md
3. SYSTEM_ARCHITECTURE.md
4. MONOREPO_STRUCTURE.md
5. ROADMAP.md
6. MASTER_AI_CONTEXT.md
7. BRAND_GUIDELINES.md
8. AI_WORKFLOW.md
9. MASTER_BOOTSTRAP_PROMPT.md

These documents define the official project state.

---

# AI Prompt Template

Every major implementation request should begin with:

"Read all project documentation before generating code.
Assume previous phases have already been implemented.
Implement only the requested milestone.
Preserve existing architecture.
Do not modify unrelated files."

---

# Engineering Rules

## Always
- Build one milestone at a time.
- Generate production-quality code.
- Maintain modularity.
- Respect existing folder structures.
- Use clear naming conventions.
- Keep the AI inference service isolated.

## Never
- Rewrite unrelated files.
- Reorganize the repository without instruction.
- Invent alternative architectures.
- Generate unnecessary placeholder code.
- Attempt to build the entire application in one step.

---

# Git Workflow

For every completed milestone:

1. Review generated code.
2. Test locally.
3. Fix obvious issues.
4. Commit immediately.

Recommended commit format:

- Bootstrap monorepo structure
- Add FastAPI application scaffold
- Add Next.js frontend scaffold
- Implement image upload API
- Integrate PrithviQ AI inference service

Small commits are preferred over large commits.

---

# Session Completion

At the end of every AI session:
- Verify architecture consistency.
- Verify documentation is still accurate.
- Update roadmap if necessary.
- Commit and push changes.

---

# Human Responsibilities

The project owner remains responsible for:
- Product decisions.
- Architecture approval.
- Reviewing generated code.
- Managing Git history.
- Deciding implementation priorities.

AI acts as an engineering assistant, not the project owner.

---

# Core Principle

Build TeraSight the way a world-class engineering team would build a startup:
carefully, incrementally, and with a long-term vision.