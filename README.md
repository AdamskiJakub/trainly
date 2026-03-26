# Trainly - Marketplace dla Trenerów i Instruktorów

Aplikacja webowa typu marketplace dla branży sportowej/wellness - trenerzy personalni, instruktorzy tańca, masażyści, instruktorzy fitness, fizjoterapeuci.

## 🛠 Stack Technologiczny

### Backend
- NestJS - Progressive Node.js framework
- Prisma ORM - Type-safe database access
- PostgreSQL - Relacyjna baza danych
- JWT - Autentykacja i autoryzacja
- TypeScript

### Frontend
- Next.js 15 (App Router) - React framework
- TypeScript
- Tailwind CSS
- Shadcn/ui - UI components
- React Hook Form + Zod - Formularze i walidacja
- TanStack Query - Server state management

### Infrastruktura
- Docker + Docker Compose - Local PostgreSQL
- Git - Version control

## 🚀 Quick Start

### Wymagania
- Node.js 18+
- Docker Desktop
- Git

### Setup

1. **Uruchom bazę danych:**
```bash
docker-compose up -d
```

2. **Setup Backend:**
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

3. **Setup Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📦 Struktura Projektu

```
trainly/
├── backend/           # NestJS API
├── frontend/          # Next.js app
├── docker-compose.yml # PostgreSQL + pgAdmin
└── README.md
```

## 🔗 Lokalne URLe

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432
- pgAdmin: http://localhost:5050

## 📝 Autor

Jakub Adamski
