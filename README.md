# 🚀 tRPC Turbo Monorepo

Ushbu loyiha **Turborepo**, **tRPC**, **Prisma** va **Bun** texnologiyalari asosida qurilgan zamonaviy monorepo arxitekturasidir. Loyihaning asosiy maqsadi — frontend va backend o'rtasida to'liq tiplar xavfsizligini (End-to-end Type-safety) ta'minlash.

---

## 🛠 Texnologiyalar To'plami

- **Monorepo:** [Turborepo](https://turbo.build/) (Build jarayonlarini optimallashtirish va keshni boshqarish).
- **Backend:** [tRPC](https://trpc.io/) + [Express](https://expressjs.com/).
- **ORM:** [Prisma](https://www.prisma.io/) (PostgreSQL/MySQL/SQLite adapterlari bilan).
- **Validation:** [Zod](https://zod.dev/) (Shared schemas).
- **Package Manager:** [pnpm](https://pnpm.io/) / [Bun](https://bun.sh/).

---

## 📁 Loyiha Strukturasi

Loyiha ikkita asosiy qismdan iborat:

```text
├── apps/
│   ├── server/          # Express + tRPC API server
│   └── web/             # Frontend (Vite/React js)
├── packages/
│   ├── db/              # Prisma schema va Client (Database layer)
│   └── zod/             # Umumiy validatsiya sxemalari
├── turbo.json           # Build pipeline konfiguratsiyasi
├── package.json         # Workspaces sozlamalari
└── pnpm-workspace.yaml  # Paketlar bog'liqligi
```
