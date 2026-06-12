# TeraSight — AI Development Workflow

## Philosophy

TeraSight is built using a hybrid AI-assisted engineering workflow where different AI systems specialize in different aspects of the product.

The human developer (project owner) acts as the Product Manager and CTO, making all final architectural and technical decisions.

---

# AI Team Roles

## ChatGPT
Role:
- ML architect.
- System architect.
- Technical reviewer.
- Prompt engineer.
- Product strategist.
- Long-term roadmap manager.

Responsibilities:
- Maintain architectural consistency.
- Design prompts for other AI systems.
- Review generated code and decisions.
- Guide PrithviQ AI development and integration.

---

## Claude

Role:
- Senior software architect.
- Backend and infrastructure planner.
- Long-form reasoning engine.

Responsibilities:
- Generate architecture-level code.
- Create large backend modules.
- Review repository-wide design decisions.

---

## Cursor

Role:
- Primary implementation engineer.

Responsibilities:
- Build frontend and backend modules.
- Modify existing repositories.
- Implement APIs and business logic.
- Refactor and extend code incrementally.

---

## Antigravity (or equivalent UI AI)

Role:
- Product designer.

Responsibilities:
- Landing page generation.
- Dashboard layouts.
- Premium UI components.
- Animation and interaction ideas.

---

# Development Rules

1. Always read project documentation before generating code.
2. Never ask an AI to build the entire application at once.
3. Implement one milestone at a time.
4. Commit after every completed milestone.
5. Preserve architecture across all generated code.
6. Treat PrithviQ AI as an independent inference service.
7. TeraSight is the product. PrithviQ AI is the engine.

---

# Standard AI Prompt Prefix

Before every major coding task, provide the AI with:
- PROJECT_VISION.md
- PRODUCT_SPEC.md
- SYSTEM_ARCHITECTURE.md
- ROADMAP.md
- MASTER_AI_CONTEXT.md

Then ask it to implement only the current milestone.

---

# Engineering Principle

The goal is not to generate code quickly.

The goal is to build a world-class, maintainable, AI-native environmental intelligence platform.