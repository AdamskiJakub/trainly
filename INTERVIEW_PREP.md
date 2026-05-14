# 🚀 Fullstack Developer Interview - Complete Cheat Sheet

> **Stack**: NestJS, Next.js, AWS (Lambda, Cognito, S3, SQS, RDS), TypeORM, PostgreSQL, React, NX Monorepo
> **Poziom**: 2-4 lata doświadczenia komercyjnego

---

## 📋 SPIS TREŚCI

1. **[⚡ TOP 50 Q&A - Najważniejsze Pytania](#top-50-qa)** ⭐ START HERE!
2. [NestJS - Backend Framework](#nestjs)
3. [Next.js - SSR, SSG, ISR](#nextjs)
4. [AWS Services](#aws)
5. [TypeORM & Prisma](#orm)
6. [REST API Design](#rest-api)
7. [Testing (Unit & E2E)](#testing)
8. [NX Monorepo](#nx-monorepo)
9. [React Best Practices](#react)
10. [PostgreSQL & SQL](#sql)
11. [Live Coding - Częste Zadania](#live-coding)
12. [Pytania Behawioralne](#behavioral)

---

## ⚡ TOP 50 Q&A - NAJWAŻNIEJSZE PYTANIA {#top-50-qa}

> **Przeczytaj TO NAJPIERW!** 15-20 min przed rozmową

---

### 🔥 NEXT.JS RENDERING (80% rozmów pyta o to!)

#### **Q1: Czym jest SSR i kiedy go używać?**

**A:** SSR = Server Side Rendering. HTML generuje się na serwerze **przy KAŻDYM requeście**.

**Kiedy używać:**
- Dane muszą być **zawsze świeże** (realtime)
- Content jest **per-user** (dashboard, profil)
- Dane **prywatne** (wymaga auth)

**Przykłady:** Panel admina, koszyk, transakcje bankowe, feed użytkownika

```typescript
// Next.js 13+ App Router
const data = await fetch('https://api.com/data', {
  cache: 'no-store' // <-- To robi SSR!
});
```

**Plusy:** Świeże dane, dobre SEO, personalizacja
**Minusy:** Wolniejsze, większe obciążenie serwera

---

#### **Q2: Czym jest SSG i kiedy go używać?**

**A:** SSG = Static Site Generation. HTML generuje się **podczas build time** (`next build`).

**Kiedy używać:**
- Dane **publiczne**
- **Prawie się nie zmieniają**
- Zależy ci na **wydajności**

**Przykłady:** Landing page, blog, dokumentacja, FAQ, marketing pages

```typescript
const data = await fetch('https://api.com/posts', {
  cache: 'force-cache' // lub po prostu default
});
```

**Plusy:** MEGA szybkie, świetne SEO, tani hosting, CDN-friendly
**Minusy:** Dane mogą być stare, rebuild potrzebny po zmianach

---

#### **Q3: Czym jest ISR i kiedy go używać?**

**A:** ISR = Incremental Static Regeneration. To **SSG + okresowe odświeżanie**.

**Jak działa:**
```typescript
const data = await fetch('https://api.com/products', {
  next: { revalidate: 60 } // Regeneruj co 60 sekund
});
```

**Co się dzieje:**
1. Pierwszy user → dostaje wygenerowaną stronę (szybko!)
2. Po 60 sekundach → następny request **triggeruje background regeneration**
3. User **dalej dostaje starą wersję** (nie czeka!)
4. Next generuje nową w tle
5. Następni userzy → dostają nową wersję

**WAŻNE:** ISR NIE blokuje requesta podczas regeneracji!

**Kiedy używać:**
- Chcesz **szybkość SSG**
- Ale dane mogą się **zmieniać co jakiś czas**

**Przykłady:** E-commerce, listing produktów, newsy, blog

**Plusy:** Bardzo szybkie, dobre SEO, dane względnie świeże
**Minusy:** Dane nie są realtime, cache invalidation bywa tricky

---

#### **Q4: Czym jest CSR?**

**A:** CSR = Client Side Rendering. HTML jest prawie pusty. Dane pobiera **browser JS-em** po załadowaniu.

```typescript
useEffect(() => {
  fetch('/api/products').then(setData);
}, []);
```

**Kiedy:** Dane tylko dla zalogowanego, SEO nieważne, interaktywne UI
**Przykłady:** Dashboardy, chat, settings

**Minusy:** Słabe SEO, wolniejszy pierwszy render

---

#### **Q5: SSR vs ISR - która różnica?**

**A:**
- **SSR:** Renderuje **KAŻDY request** na serwerze (wolniej, świeższe dane)
- **ISR:** Generuje statycznie + regeneruje **okresowo w tle** (szybciej, lekko stare dane)

**Praktycznie:**
- SSR → `cache: 'no-store'`
- ISR → `next: { revalidate: 60 }`

---

#### **Q6: Co to jest Hydration?**

**A:** React "ożywia" HTML wygenerowany na serwerze.

**Proces:**
1. Server wysyła gotowy HTML: `<button>Click</button>`
2. Browser pokazuje HTML (instant!)
3. React JS ładuje się
4. React **podpina event handlers** (onClick, etc.)
5. Button staje się **interaktywny**

**To właśnie Hydration!**

**Pytanie followup:** "Co się dzieje gdy hydration się nie zgadza?"
**A:** Hydration mismatch error → React renderuje od nowa (wolniej)

---

#### **Q7: Czym są React Server Components (RSC)?**

**A:** Komponenty które renderują się **tylko na serwerze**.

**Korzyści:**
- Mogą fetchować dane bezpośrednio
- **Nie wysyłają JS do klienta** (mniejszy bundle)
- Zero hooks (useState, useEffect) bo nie ma przeglądarki

**W Next.js 13+ App Router:**
```typescript
// Default = Server Component
export default async function Page() {
  const data = await fetch(...); // Można await bez useEffect!
  return <div>{data.name}</div>;
}
```

**Client Component:**
```typescript
'use client'; // Musi być na górze!

export default function Button() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

#### **Q8: generateStaticParams - do czego służy?**

**A:** App Router replacement dla `getStaticPaths`. **Pre-generuje dynamiczne ścieżki** podczas build.

```typescript
// app/products/[id]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map(p => ({
    id: p.id.toString()
  }));
}

// Next prebuilduje: /products/1, /products/2, /products/3...
```

**Bez tego:** Dynamiczne strony generują się on-demand (wolniej)

---

#### **Q9: Kiedy używać SSR zamiast ISR?**

**A:**
- **SSR:** Dane muszą być **realtime**, per-user, auth-sensitive
- **ISR:** Publiczne dane, mogą być **lekko stale**, zależy na performance

**Przykład SSR:** Dashboard bankowy (saldo zmienia się realtime)
**Przykład ISR:** Produkty w sklepie (cena może być stała 5 minut)

---

#### **Q10: Co cache'uje Next.js?**

**A:** W App Router Next ma **4 warstwy cache:**

1. **Request Memoization:** Ten sam fetch w komponencie = 1 request
2. **Data Cache:** `fetch()` results (można wyłączyć: `cache: 'no-store'`)
3. **Full Route Cache:** Cały HTML strony (SSG/ISR)
4. **Router Cache:** Client-side navigation cache

**Najczęstszy błąd:** Myślenie że `revalidate: 60` = dokładnie co 60s
**Prawda:** Po 60s **następny request MOŻE** triggerować regenerację

---

### 🏗️ NESTJS FUNDAMENTALS

#### **Q11: Czym jest Dependency Injection w NestJS?**

**A:** Pattern gdzie klasa **nie tworzy** swoich dependencies, tylko **dostaje je z zewnątrz**.

```typescript
@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository, // <-- Injected!
    private emailService: EmailService
  ) {}
}
```

**Zamiast:**
```typescript
class UserService {
  userRepo = new UserRepository(); // ❌ BAD
}
```

**Plusy:** Łatwe testowanie (mock dependencies), luźne powiązania, SOLID

---

#### **Q12: Różnica między @Injectable() a @Controller()?**

**A:**
- **@Injectable():** Service/Provider - **logika biznesowa**
- **@Controller():** HTTP endpoint handler - **routing**

**Podział odpowiedzialności:**
- Controller: Przyjmuje request, zwraca response
- Service: Biznes logic, operacje na danych

---

#### **Q13: Kolejność wykonania: Guard, Interceptor, Pipe, Middleware?**

**A:**
```
Request 
  → Middleware 
  → Guard 
  → Interceptor (before)
  → Pipe 
  → Controller 
  → Service
  → Interceptor (after)
  → Response
```

**Mnemonic:** "**M**y **G**irl **I**s **P**retty **C**ool" (Middleware, Guard, Interceptor, Pipe, Controller)

---

#### **Q14: Do czego służy Guard?**

**A:** **Authorization/Authentication**. Decyduje czy request może przejść dalej.

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return validateToken(request.headers.authorization);
  }
}

// Usage
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {}
```

**Return true** = allow, **false/throw** = block

---

#### **Q15: Do czego służy Pipe?**

**A:** **Validation i transformation** danych wejściowych.

```typescript
@Post()
create(@Body(ValidationPipe) dto: CreateUserDto) {}
```

**Przykłady:**
- `ValidationPipe`: Waliduje DTO (class-validator)
- `ParseIntPipe`: Zmienia string → number
- Custom pipe: Custom logic

---

#### **Q16: Do czego służy Interceptor?**

**A:** **Logging, transformacja response, error handling** - coś "wokół" requesta.

```typescript
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Before...');
    const now = Date.now();
    
    return next.handle().pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms`))
    );
  }
}
```

**Use cases:** Logging, cache, transform response, timeout

---

#### **Q17: Jak obsłużyć transakcje w NestJS + TypeORM?**

**A:**
```typescript
async transferMoney(from: number, to: number, amount: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.update(Account, from, { 
      balance: () => `balance - ${amount}` 
    });
    await queryRunner.manager.update(Account, to, { 
      balance: () => `balance + ${amount}` 
    });
    
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
```

**Kluczowe:** `startTransaction()`, `commitTransaction()`, `rollbackTransaction()`, `finally release()`

---

#### **Q18: ConfigService vs process.env?**

**A:**
- **process.env:** Bezpośredni dostęp, brak walidacji, brak type safety
- **ConfigService:** Walidacja (Joi), type safety, centralna konfiguracja

```typescript
// app.module.ts
ConfigModule.forRoot({
  validationSchema: Joi.object({
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  }),
}),

// Usage
constructor(private config: ConfigService) {}

getDatabaseUrl() {
  return this.config.get<string>('DATABASE_URL');
}
```

**Zaleta:** App nie wystartuje jeśli brakuje wymaganych env vars

---

#### **Q19: Jak zrobić rate limiting w NestJS?**

**A:**
```typescript
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,      // Time window (seconds)
      limit: 10,    // Max requests per window
    }),
  ],
})

// Controller
@UseGuards(ThrottlerGuard)
@Post()
create() {}
```

**Praktycznie:** Ochrona przed brute force, DDoS

---

#### **Q20: Exception Filter - do czego?**

**A:** Globalna obsługa błędów, custom error responses.

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
```

**Built-in exceptions:**
```typescript
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Invalid token');
throw new NotFoundException('User not found');
```

---

### ☁️ AWS SERVICES

#### **Q21: Czym jest AWS Lambda?**

**A:** **Serverless compute** - kod który uruchamia się on-demand, **bez zarządzania serwerami**.

**Jak działa:**
1. Upload kodu (handler function)
2. Trigger (API Gateway, S3, SQS, CloudWatch...)
3. Lambda uruchamia kontener
4. Wykonuje funkcję
5. Kontener zamyka się (lub zostaje na "warm")

**Plusy:** Pay-per-use, auto-scaling, zero server management
**Minusy:** Cold start (pierwsze wywołanie wolniejsze)

```typescript
export const handler = async (event: any) => {
  console.log('Event:', JSON.stringify(event));
  
  // Process
  const result = await processData(event);
  
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
```

---

#### **Q22: Cold Start problem w Lambda - jak rozwiązać?**

**A:** **Cold start** = Lambda musi postawić nowy kontener (wolne ~1-3s).

**Rozwiązania:**
1. **Provisioned Concurrency** (zawsze X kontenerów warm)
2. **Cache connections poza handlerem:**
```typescript
let cachedDB: Connection; // Outside handler!

export const handler = async () => {
  if (!cachedDB) {
    cachedDB = await createConnection();
  }
  // Use cachedDB
};
```
3. **Keep warm** (ping co 5 min)

---

#### **Q23: Czym jest AWS Cognito?**

**A:** **Managed authentication service** - gotowy system logowania/rejestracji.

**Komponenty:**
- **User Pool:** Database użytkowników (email, password, MFA)
- **Identity Pool:** Federated auth (Google, Facebook, Apple)

**Tokens:**
- **IdToken:** Claims o userze (email, name) - użyj do autoryzacji
- **AccessToken:** Dostęp do AWS resources
- **RefreshToken:** Odśwież tokeny bez re-login

```typescript
// Sign up
await cognito.signUp({
  Username: 'user@example.com',
  Password: 'SecurePass123!',
  UserAttributes: [{ Name: 'email', Value: 'user@example.com' }],
});

// Sign in (get tokens)
const response = await cognito.initiateAuth({
  AuthFlow: 'USER_PASSWORD_AUTH',
  AuthParameters: {
    USERNAME: 'user@example.com',
    PASSWORD: 'SecurePass123!',
  },
});

const { IdToken, AccessToken, RefreshToken } = response.AuthenticationResult;
```

---

#### **Q24: S3 - presigned URLs, do czego?**

**A:** **Bezpieczny tymczasowy dostęp** do prywatnych plików bez dawania pełnego ACL.

**Problem:** Nie chcesz public S3 bucket (security risk)
**Rozwiązanie:** Generate presigned URL (expires po X czasie)

```typescript
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const url = await getSignedUrl(s3, new GetObjectCommand({
  Bucket: 'my-bucket',
  Key: 'private/avatar.jpg',
}), { expiresIn: 3600 }); // 1 hour

// User może pobrać plik przez ten URL przez 1h
```

**Use case:** Private user uploads, temporary downloads

---

#### **Q25: SQS - FIFO vs Standard?**

**A:**

| Feature | Standard | FIFO |
|---------|----------|------|
| **Order** | Best effort | Strict order |
| **Delivery** | At-least-once (duplicates possible) | Exactly-once |
| **Throughput** | Unlimited | 300 msg/s (3000 with batching) |
| **Price** | Cheaper | More expensive |

**Kiedy Standard:** High throughput, order nieważny (analytics, logs)
**Kiedy FIFO:** Order krytyczny (payment processing, order fulfilment)

---

#### **Q26: RDS vs Aurora - różnica?**

**A:**
- **RDS:** Managed PostgreSQL/MySQL (standard engine)
- **Aurora:** AWS custom engine **kompatybilny** z Postgres/MySQL

**Aurora plusy:**
- 3x szybszy niż RDS PostgreSQL
- Auto-scaling storage
- Faster replication
- Better availability

**Aurora minusy:**
- Droższy (~20% więcej)
- Vendor lock-in (tylko AWS)

**Praktycznie:** Jeśli masz budget i zostaniesz na AWS → Aurora. Inaczej → RDS.

---

### 🗄️ DATABASES & ORM

#### **Q27: TypeORM vs Prisma?**

**A:**

| Feature | TypeORM | Prisma |
|---------|---------|--------|
| **Type Safety** | Good | Excellent ⭐ |
| **Query Builder** | Powerful | Limited |
| **Migrations** | Manual | Auto-generated |
| **Learning Curve** | Steeper | Easier |
| **Performance** | Good | Slightly better |

**TypeORM:** Jeśli potrzebujesz complex queries, raw SQL access
**Prisma:** Jeśli priorytet = type safety, DX, nowoczesność

---

#### **Q28: N+1 Problem - co to?**

**A:** **Performance problem** gdy robisz query w loopie.

**BAD:**
```typescript
const users = await userRepo.find(); // 1 query

for (const user of users) {
  const posts = await postRepo.find({ where: { userId: user.id } }); // N queries!
}
// Total: 1 + N queries
```

**GOOD:**
```typescript
const users = await userRepo.find({
  relations: ['posts'] // 1 query with JOIN!
});
```

**Prisma:**
```typescript
const users = await prisma.user.findMany({
  include: { posts: true }
});
```

---

#### **Q29: Database Indexes - kiedy i jak?**

**A:** Index = struktura danych przyspieszająca SELECT (jak indeks w książce).

**Kiedy tworzyć:**
- Kolumny w `WHERE` clause
- `JOIN` keys
- `ORDER BY` columns
- Foreign keys

```sql
-- Single column
CREATE INDEX idx_users_email ON users(email);

-- Composite (kolejność ma znaczenie!)
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at);
```

**WAŻNE:** Index przyspiesza SELECT, ale **spowalnia INSERT/UPDATE**!

**Nie index:** Małe tabele (<10k rows), kolumny rzadko używane w WHERE

---

#### **Q30: Database Transactions - ACID?**

**A:** **ACID** = properties transakcji:

- **A**tomicity: All or nothing (commit lub rollback)
- **C**onsistency: Database zawsze w valid state
- **I**solation: Transactions nie interferują
- **D**urability: Committed data survives crash

**Przykład:**
```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

Jeśli drugi UPDATE failuje → pierwszy ROLLBACK automatycznie.

---

### 🔐 AUTHENTICATION & SECURITY

#### **Q31: JWT vs Session - różnica?**

**A:**

**JWT (Stateless):**
- Token zawiera wszystko (payload)
- Server nie trzyma state
- Scaling łatwiejszy

**Session (Stateful):**
- Server trzyma session w DB/Redis
- Token to tylko ID
- Można instantly revoke

**Praktycznie:**
- **JWT:** Microservices, stateless API, mobile apps
- **Session:** Monolith, potrzebujesz instant logout

---

#### **Q32: Jak bezpiecznie przechowywać hasła?**

**A:** **NIGDY plain text!**

**Użyj bcrypt:**
```typescript
import * as bcrypt from 'bcrypt';

// Hash
const hash = await bcrypt.hash('password123', 10); // 10 = salt rounds

// Verify
const isValid = await bcrypt.compare('password123', hash);
```

**Dlaczego bcrypt, nie MD5/SHA256?**
- bcrypt jest **slow by design** (ochrona przed brute force)
- Auto salt
- Adaptive (można zwiększyć rounds w przyszłości)

---

#### **Q33: CORS - czym jest i jak skonfigurować?**

**A:** **Cross-Origin Resource Sharing** - security mechanizm przeglądarki.

**Problem:** Frontend (localhost:3000) nie może fetch API (localhost:3001) domyślnie.

**Rozwiązanie w NestJS:**
```typescript
// main.ts
app.enableCors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  credentials: true,
});
```

**Production tip:** Nie dawaj `origin: '*'` (security risk!)

---

#### **Q34: SQL Injection - jak zapobiec?**

**A:** **NIGDY** nie konkatenuj user input do SQL query!

**BAD:**
```typescript
const query = `SELECT * FROM users WHERE email = '${userEmail}'`; // ❌
// User może wpisać: ' OR '1'='1
```

**GOOD - Prepared statements:**
```typescript
// TypeORM
userRepo.findOne({ where: { email: userEmail } });

// Raw SQL
connection.query('SELECT * FROM users WHERE email = ?', [userEmail]);
```

ORM **automatycznie** używa prepared statements!

---

### 🧪 TESTING

#### **Q35: Unit test vs Integration test vs E2E test?**

**A:**

**Unit Test:**
- Test **1 funkcji/klasy** w izolacji
- Mock wszystkie dependencies
- Najszybszy

**Integration Test:**
- Test **interakcji między modułami**
- Może używać real DB (testowy)
- Średnio szybki

**E2E Test:**
- Test **całego flow** (jak user)
- Real browser, real API, real DB
- Najwolniejszy

**Praktycznie:** 70% unit, 20% integration, 10% E2E

---

#### **Q36: Jak mockować w Jest?**

**A:**
```typescript
// Mock function
const mockFn = jest.fn();
mockFn.mockReturnValue('result');
expect(mockFn()).toBe('result');

// Mock module
jest.mock('./userService', () => ({
  getUserById: jest.fn().mockResolvedValue({ id: 1, name: 'Test' })
}));

// Spy on real object
const spy = jest.spyOn(userService, 'findOne');
spy.mockResolvedValue(user);
expect(spy).toHaveBeenCalledWith('123');
```

---

#### **Q37: Test Coverage - jaki powinien być?**

**A:** **80% to industry standard**, ale liczby nie mówią wszystkiego!

**Lepiej:**
- 100% critical paths (payment, auth)
- 80%+ business logic
- 50% utility functions

**Nie testuj:**
- Trivial getters/setters
- Framework code (NestJS, React)
- Auto-generated code

```bash
npm run test:cov

# jest.config.js
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
  },
}
```

---

### 🚀 REST API BEST PRACTICES

#### **Q38: REST API - proper HTTP methods?**

**A:**

```
GET    /users           # List (safe, idempotent)
GET    /users/:id       # Get single
POST   /users           # Create (not idempotent)
PUT    /users/:id       # Update (full replace, idempotent)
PATCH  /users/:id       # Partial update
DELETE /users/:id       # Delete (idempotent)
```

**Idempotent** = multiple identical requests = same result

---

#### **Q39: Pagination - Offset vs Cursor?**

**A:**

**Offset-based (simple):**
```
GET /users?page=2&limit=20
```
- Łatwy do implementacji
- **Problem:** Slow dla dużych datasetów, inconsistent when data changes

**Cursor-based (better for scale):**
```
GET /users?cursor=abc123&limit=20
```
- Faster
- Consistent
- Good for infinite scroll

**Praktycznie:** Offset dla small data, Cursor dla scale

---

#### **Q40: HTTP Status Codes - które najważniejsze?**

**A:**

**Success:**
- **200 OK:** Standard success
- **201 Created:** POST success
- **204 No Content:** DELETE success

**Client Errors:**
- **400 Bad Request:** Invalid input
- **401 Unauthorized:** Not authenticated
- **403 Forbidden:** Authenticated but not allowed
- **404 Not Found:** Resource doesn't exist
- **422 Unprocessable Entity:** Validation failed

**Server Errors:**
- **500 Internal Server Error:** Something broke
- **503 Service Unavailable:** Server overloaded

---

### 🎨 REACT & FRONTEND

#### **Q41: useMemo vs useCallback?**

**A:**

**useMemo:** Cache **computed value**
```typescript
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);
```

**useCallback:** Cache **function reference**
```typescript
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

**Kiedy używać:**
- useMemo: Expensive calculations
- useCallback: Passing callbacks do child components (prevent re-render)

---

#### **Q42: React.memo - do czego?**

**A:** **Component memoization** - re-render tylko gdy props zmienią się.

```typescript
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});
```

**Bez memo:** Component re-renderuje gdy parent re-renderuje
**Z memo:** Component re-renderuje tylko gdy `user` prop zmieni się

**Nie overuse!** Dodaje overhead. Używaj tylko dla:
- Expensive renders
- Pure components z stable props

---

#### **Q43: Code Splitting w React?**

**A:** Ładowanie kodu **on-demand**, nie wszystkiego na starcie.

```typescript
import { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./AdminPanel'));

<Suspense fallback={<Loading />}>
  <AdminPanel />
</Suspense>
```

**Korzyści:**
- Mniejszy initial bundle
- Faster first load
- Load tylko co potrzebne

---

### 🏗️ ARCHITECTURE & PATTERNS

#### **Q44: Monolith vs Microservices?**

**A:**

**Monolith:**
- Jedna aplikacja
- Shared database
- Easy to develop/deploy

**Microservices:**
- Wiele małych serwisów
- Separate databases
- Independent deployment

**Kiedy Microservices:**
- Duży team (>10 devs)
- Różne tech stacki
- Niezależne scaling

**Kiedy Monolith:**
- Startup, MVP
- Mały team (<5 devs)
- Prostsze requirements

**Praktycznie:** Start z Monolith → migrate do Microservices gdy potrzeba

---

#### **Q45: Strangler Fig Pattern - czym jest?**

**A:** Pattern do **stopniowej migracji legacy systemu**.

**Jak działa:**
1. Nowy system "owija" stary
2. Stopniowo przenosisz funkcje
3. Stary system "dusi się" (strangles)
4. W końcu zastąpi go nowy

**Praktycznie:**
```
Old System → Proxy → New System

Route /users/new → New System
Route /users/legacy → Old System
```

Pozwala migrować **bez big bang rewrite**!

---

#### **Q46: Repository Pattern - czym jest?**

**A:** **Abstrakcja** między business logic a data access.

```typescript
// Without Repository (BAD)
async getUser(id: string) {
  return await prisma.user.findUnique({ where: { id } }); // Direct DB access
}

// With Repository (GOOD)
class UserRepository {
  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }
}

// Service uses repository
class UserService {
  constructor(private userRepo: UserRepository) {}
  
  async getUser(id: string) {
    return this.userRepo.findById(id);
  }
}
```

**Plusy:**
- Łatwe testowanie (mock repository)
- Zmiana DB (Postgres → MongoDB) bez zmiany service
- Reusable queries

---

#### **Q47: SOLID Principles - wymień i wyjaśnij S i D**

**A:**

**S**ingle Responsibility
**O**pen/Closed
**L**iskov Substitution
**I**nterface Segregation
**D**ependency Inversion

**Single Responsibility:**
> Klasa powinna mieć **1 powód do zmiany**.

**BAD:**
```typescript
class User {
  save() {} // DB access
  sendEmail() {} // Email
  validate() {} // Validation
}
```

**GOOD:**
```typescript
class User {} // Just data
class UserRepository { save() {} }
class EmailService { send() {} }
class UserValidator { validate() {} }
```

**Dependency Inversion:**
> Depend on **abstractions**, not implementations.

**BAD:**
```typescript
class UserService {
  repo = new PostgresUserRepository(); // Concrete implementation!
}
```

**GOOD:**
```typescript
class UserService {
  constructor(private repo: UserRepository) {} // Interface/abstraction
}
```

---

### 🔧 TOOLING & DEVOPS

#### **Q48: Docker - podstawowe komendy?**

**A:**
```bash
docker build -t myapp .              # Build image
docker run -p 3000:3000 myapp        # Run container
docker ps                            # List running containers
docker logs <container_id>           # View logs
docker exec -it <container_id> bash  # Enter container
docker-compose up                    # Start multi-container app
```

**Dockerfile example:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

---

#### **Q49: Git - rebase vs merge?**

**A:**

**Merge:**
```bash
git merge feature
```
- Creates merge commit
- Preserves history
- Safe

**Rebase:**
```bash
git rebase main
```
- Linear history
- Cleaner
- Rewrites history (dangerous on shared branches!)

**Praktycznie:**
- Merge: Dla public branches (main, develop)
- Rebase: Dla feature branches przed merge

---

#### **Q50: CI/CD - czym jest?**

**A:**

**CI (Continuous Integration):**
- Auto build + test przy każdym push
- Catch bugs early

**CD (Continuous Deployment):**
- Auto deploy po merge do main
- Faster releases

**Pipeline example:**
```yaml
# GitHub Actions
on: [push]
jobs:
  test:
    - npm install
    - npm test
  deploy:
    - docker build
    - push to AWS
```

---

## 🎯 QUICK CHEAT SHEET (5 min przed rozmową)

### Next.js Rendering:
```
SSR = cache: 'no-store' → każdy request
SSG = cache: 'force-cache' → build time
ISR = revalidate: 60 → SSG + periodic refresh
CSR = useEffect fetch → browser only
```

### NestJS Order:
```
Request → Middleware → Guard → Interceptor → Pipe → Controller → Service
```

### AWS:
```
Lambda = Serverless functions
Cognito = Auth (User Pool + Identity Pool)
S3 = File storage (presigned URLs!)
SQS = Message queue (Standard vs FIFO)
RDS/Aurora = Relational DB
```

### Testing:
```
Unit = 1 function, mock all
Integration = modules together
E2E = full user flow
Coverage target = 80%
```

### HTTP Methods:
```
GET = Read (idempotent)
POST = Create
PUT = Full update (idempotent)
PATCH = Partial update
DELETE = Delete (idempotent)
```

---

## 1. NestJS - Backend Framework {#nestjs}

### 🎯 MUST KNOW Concepts

#### **Dependency Injection (DI)**
```typescript
// Provider (Injectable)
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}
}

// Module registration
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService] // Eksportuj aby inny moduł mógł używać
})
export class UserModule {}
```

**Pytanie**: *Czym różni się `@Injectable()` od `@Controller()`?*
- `@Injectable()` = Service/Provider (logika biznesowa)
- `@Controller()` = HTTP endpoint handler (routing)

---

#### **Modules Architecture**

```typescript
// Feature Module Pattern
src/
  users/
    users.module.ts       // Moduł
    users.controller.ts   // REST endpoints
    users.service.ts      // Business logic
    users.entity.ts       // TypeORM entity
    dto/
      create-user.dto.ts  // Validation
      update-user.dto.ts
```

**SOLID Principles w NestJS:**
- **Single Responsibility**: Controller = routing, Service = logic
- **Dependency Inversion**: Inject interfaces, not implementations

---

#### **Guards, Interceptors, Pipes, Middleware**

```typescript
// 1. Guard (Authorization)
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return validateToken(request.headers.authorization);
  }
}

// Usage
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {}

// 2. Pipe (Validation)
@Post()
create(@Body(ValidationPipe) dto: CreateUserDto) {}

// 3. Interceptor (Logging, Transform)
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Before...');
    return next.handle().pipe(
      tap(() => console.log('After...'))
    );
  }
}

// 4. Middleware (Request preprocessing)
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
}
```

**Kolejność wykonania:**
```
Request → Middleware → Guard → Interceptor (before) 
  → Pipe → Controller → Service 
  → Interceptor (after) → Response
```

---

#### **Exception Filters**

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

// Built-in exceptions
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Invalid token');
throw new NotFoundException('User not found');
```

---

#### **Async Operations & Queues**

```typescript
// Bull Queue (AWS SQS alternative)
@Processor('email')
export class EmailProcessor {
  @Process('send-welcome')
  async handleSendWelcome(job: Job) {
    await this.emailService.sendWelcome(job.data.email);
  }
}

// Add to queue
await this.emailQueue.add('send-welcome', { email: 'user@example.com' });
```

---

### ⚡ Common Interview Questions

**Q1: Jak zaimplementować rate limiting w NestJS?**
```typescript
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,      // Time window (seconds)
      limit: 10,    // Max requests per window
    }),
  ],
})
export class AppModule {}

// Controller
@UseGuards(ThrottlerGuard)
@Post()
create() {}
```

**Q2: Jak obsłużyć transakcje w NestJS?**
```typescript
// With TypeORM
async transferMoney(from: number, to: number, amount: number) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.update(Account, from, { balance: () => `balance - ${amount}` });
    await queryRunner.manager.update(Account, to, { balance: () => `balance + ${amount}` });
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
}
```

**Q3: ConfigService vs Environment Variables?**
```typescript
// app.module.ts
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: Joi.object({
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  }),
}),

// Usage in service
constructor(private configService: ConfigService) {}

getDatabaseUrl() {
  return this.configService.get<string>('DATABASE_URL');
}
```

---

## 2. Next.js - SSR, SSG, ISR {#nextjs}

### 🎯 RENDERING STRATEGIES - MUST KNOW!

#### **1. SSG (Static Site Generation)**
```typescript
// Generuje HTML w build time
// Najszybszy - serwuje static files
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ id: post.id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return <div>{post.title}</div>;
}
```

**Kiedy używać SSG:**
- ✅ Marketing pages (landing, about, pricing)
- ✅ Blog posts, dokumentacja
- ✅ E-commerce product pages (z revalidation)
- ✅ Content który rzadko się zmienia

---

#### **2. SSR (Server-Side Rendering)**
```typescript
// Renderuje na serwerze przy KAŻDYM request
// Świeże dane, wolniejsze
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store' // WAŻNE: Disable cache
  });
  return <div>{data}</div>;
}
```

**Kiedy używać SSR:**
- ✅ Dashboardy (personalized data)
- ✅ Admin panels
- ✅ User profiles (private data)
- ✅ Real-time data (stock prices, analytics)

---

#### **3. ISR (Incremental Static Regeneration)**
```typescript
// Static + revalidation co X sekund
// Best of both worlds!
export default async function Page() {
  const data = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // Regeneruj co 60s
  });
  return <div>{data}</div>;
}
```

**Kiedy używać ISR:**
- ✅ E-commerce (produkty zmieniają się czasami)
- ✅ News websites
- ✅ Social media feeds
- ✅ Content updates co X minut/godzin

---

#### **4. Client-Side Rendering (CSR)**
```typescript
'use client'; // Next.js 13+ App Router

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data').then(res => setData(res.json()));
  }, []);
  
  return <div>{data}</div>;
}
```

**Kiedy używać CSR:**
- ✅ Interactive dashboards
- ✅ Real-time chat
- ✅ Canvas/drawing apps
- ✅ Nie wymaga SEO

---

### 📊 COMPARISON TABLE

| Feature | SSG | SSR | ISR | CSR |
|---------|-----|-----|-----|-----|
| **Speed** | ⚡⚡⚡ | ⚡ | ⚡⚡ | ⚡⚡ |
| **SEO** | ✅ Excellent | ✅ Good | ✅ Excellent | ❌ Poor |
| **Data Freshness** | ❌ Stale | ✅ Fresh | ⚡ Configurable | ✅ Real-time |
| **Server Load** | Low | High | Low | None |
| **Build Time** | Slow (many pages) | N/A | Fast | N/A |
| **Use Case** | Blogs, Docs | Dashboards | E-commerce | Interactive apps |

---

### ⚡ Next.js Interview Questions

**Q1: Różnica między `getServerSideProps` (Pages Router) a `fetch` (App Router)?**
```typescript
// OLD: Pages Router (Next.js 12)
export async function getServerSideProps() {
  const data = await fetch('...');
  return { props: { data } };
}

// NEW: App Router (Next.js 13+)
export default async function Page() {
  const data = await fetch('...', { cache: 'no-store' });
  return <div>{data}</div>;
}
```

**Q2: Jak działa Dynamic Routing?**
```typescript
// app/products/[id]/page.tsx
export default function Product({ params }: { params: { id: string } }) {
  return <div>Product {params.id}</div>;
}

// Catch-all: [...slug]
// app/docs/[...slug]/page.tsx
// Matches: /docs/a, /docs/a/b, /docs/a/b/c
```

**Q3: Middleware w Next.js?**
```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

**Q4: Image Optimization?**
```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Load eagerly (above fold)
  placeholder="blur" // Show blur while loading
/>
```

---

## 3. AWS Services {#aws}

### 🔐 **AWS Cognito** (Authentication)

```typescript
// User Pool = User directory
// Identity Pool = Federated identities (Google, Facebook)

// Sign up
import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });

await client.send(new SignUpCommand({
  ClientId: 'your-app-client-id',
  Username: 'user@example.com',
  Password: 'SecurePass123!',
  UserAttributes: [
    { Name: 'email', Value: 'user@example.com' },
  ],
}));

// Sign in (get JWT tokens)
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

const response = await client.send(new InitiateAuthCommand({
  AuthFlow: 'USER_PASSWORD_AUTH',
  ClientId: 'your-app-client-id',
  AuthParameters: {
    USERNAME: 'user@example.com',
    PASSWORD: 'SecurePass123!',
  },
}));

const { IdToken, AccessToken, RefreshToken } = response.AuthenticationResult;
```

**Key Concepts:**
- **User Pool**: Database użytkowników
- **App Client**: Konfiguracja aplikacji (web, mobile)
- **IdToken**: Claims o użytkowniku (name, email) - użyj do autoryzacji
- **AccessToken**: Dostęp do AWS resources
- **RefreshToken**: Odśwież tokeny bez re-login

---

### 📦 **AWS S3** (File Storage)

```typescript
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({ region: 'us-east-1' });

// Upload file
await s3.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'uploads/avatar.jpg',
  Body: fileBuffer,
  ContentType: 'image/jpeg',
  ACL: 'private', // WAŻNE: Security
}));

// Generate presigned URL (secure download)
const url = await getSignedUrl(s3, new GetObjectCommand({
  Bucket: 'my-bucket',
  Key: 'uploads/avatar.jpg',
}), { expiresIn: 3600 }); // 1 hour
```

**Best Practices:**
- ✅ **NIGDY** nie dawaj public ACL bez powodu
- ✅ Używaj presigned URLs dla private files
- ✅ Lifecycle policies (delete old files, transition to Glacier)
- ✅ Versioning dla critical data

---

### ⚡ **AWS Lambda** (Serverless Functions)

```typescript
// handler.ts
export const handler = async (event: any) => {
  console.log('Event:', JSON.stringify(event));
  
  // Process SQS messages
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    await processOrder(body);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
```

**Lambda Triggers:**
- API Gateway (HTTP requests)
- S3 Events (file upload)
- SQS Queue (async processing)
- CloudWatch Events (cron jobs)
- DynamoDB Streams

**Cold Start Problem:**
```typescript
// Keep Lambda warm
let cachedConnection: Connection;

export const handler = async () => {
  if (!cachedConnection) {
    cachedConnection = await createDatabaseConnection();
  }
  // Use cachedConnection
};
```

---

### 📨 **AWS SQS** (Message Queue)

```typescript
import { SQSClient, SendMessageCommand, ReceiveMessageCommand } from '@aws-sdk/client-sqs';

const sqs = new SQSClient({ region: 'us-east-1' });

// Send message
await sqs.send(new SendMessageCommand({
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456/my-queue',
  MessageBody: JSON.stringify({ orderId: 123 }),
  DelaySeconds: 0,
}));

// Receive & process
const response = await sqs.send(new ReceiveMessageCommand({
  QueueUrl: '...',
  MaxNumberOfMessages: 10,
  WaitTimeSeconds: 20, // Long polling
}));

for (const message of response.Messages || []) {
  await processMessage(JSON.parse(message.Body));
  
  // Delete after processing
  await sqs.send(new DeleteMessageCommand({
    QueueUrl: '...',
    ReceiptHandle: message.ReceiptHandle,
  }));
}
```

**FIFO vs Standard:**
- **Standard**: At-least-once delivery, best effort ordering
- **FIFO**: Exactly-once, strict ordering (slower, more expensive)

---

### 🗄️ **AWS RDS** (Relational Database)

**Aurora PostgreSQL** = AWS managed PostgreSQL
- Auto-scaling
- Multi-AZ (High Availability)
- Read Replicas
- Automated backups

```typescript
// Connection w NestJS
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST, // RDS endpoint
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'mydb',
  ssl: { rejectUnauthorized: false }, // WAŻNE dla RDS
  entities: [User, Order],
  synchronize: false, // NIGDY true w production!
}),
```

---

## 4. TypeORM & Prisma {#orm}

### TypeORM

```typescript
// Entity
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Repository Pattern
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find with relations
  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['posts'], // JOIN
    });
  }

  // Query Builder (complex queries)
  async findActiveUsers() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .where('user.isActive = :active', { active: true })
      .andWhere('post.publishedAt IS NOT NULL')
      .orderBy('user.createdAt', 'DESC')
      .getMany();
  }
}
```

**Migrations:**
```bash
npm run typeorm migration:generate -- -n AddUserRole
npm run typeorm migration:run
```

---

### Prisma (Alternative - Może być pytanie!)

```prisma
// schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id       String @id @default(uuid())
  title    String
  author   User   @relation(fields: [authorId], references: [id])
  authorId String
}
```

```typescript
// Usage
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    posts: {
      create: [
        { title: 'First Post' },
        { title: 'Second Post' },
      ],
    },
  },
  include: { posts: true },
});
```

**TypeORM vs Prisma:**
| Feature | TypeORM | Prisma |
|---------|---------|--------|
| Type Safety | ⚠️ Good | ✅ Excellent |
| Query Builder | ✅ Powerful | ⚠️ Limited |
| Migrations | Manual | Auto-generated |
| Performance | Good | Slightly better |
| Learning Curve | Steeper | Easier |

---

## 5. REST API Design {#rest-api}

### 🎯 Best Practices

```typescript
// ✅ GOOD
GET    /users              // List all users
GET    /users/:id          // Get single user
POST   /users              // Create user
PUT    /users/:id          // Update user (full)
PATCH  /users/:id          // Update user (partial)
DELETE /users/:id          // Delete user

// Nested resources
GET    /users/:id/posts    // Get user's posts
POST   /users/:id/posts    // Create post for user

// Filtering, Sorting, Pagination
GET /users?role=admin&sort=createdAt:desc&page=2&limit=20

// ❌ BAD
GET /getUsers
POST /createUser
GET /user/delete/:id  // Should be DELETE
```

---

### 📄 Pagination

```typescript
// Offset-based (simple, ale slow dla dużych datasetów)
@Get()
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
) {
  const [data, total] = await this.userRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Cursor-based (lepszy dla infinite scroll)
@Get()
async findAll(@Query('cursor') cursor?: string) {
  const limit = 20;
  const users = await this.userRepository.find({
    where: cursor ? { id: MoreThan(cursor) } : {},
    take: limit + 1, // +1 to check if there's more
    order: { id: 'ASC' },
  });

  const hasMore = users.length > limit;
  const data = hasMore ? users.slice(0, -1) : users;
  const nextCursor = hasMore ? data[data.length - 1].id : null;

  return { data, nextCursor, hasMore };
}
```

---

### 🔐 Authentication & Authorization

```typescript
// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

// Role-based access control
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}

// Usage
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':id')
delete(@Param('id') id: string) {}
```

---

### 📝 API Documentation (Swagger)

```typescript
// main.ts
const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

// Controller
@ApiTags('users')
@Controller('users')
export class UserController {
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Success', type: [User] })
  @Get()
  findAll() {}
}
```

---

## 6. Testing (Unit & E2E) {#testing}

### 🧪 Unit Tests (Jest)

```typescript
// user.service.spec.ts
describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should find user by id', async () => {
    const user = { id: '1', email: 'test@test.com' };
    jest.spyOn(repository, 'findOne').mockResolvedValue(user as User);

    expect(await service.findOne('1')).toEqual(user);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
```

---

### 🧪 E2E Tests

```typescript
// user.e2e-spec.ts
describe('UserController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login and get token
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'password' });
    
    authToken = response.body.access_token;
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

---

### 📊 Test Coverage

```bash
# Run with coverage
npm run test:cov

# Minimum coverage thresholds (jest.config.js)
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
}
```

---

## 7. NX Monorepo {#nx-monorepo}

### 🏗️ Structure

```
my-workspace/
  apps/
    api/              # NestJS backend
    web/              # Next.js frontend
  libs/
    shared/
      data-access/    # API clients
      ui/             # Shared components
      utils/          # Helpers
    api/
      feature-users/  # User module
      feature-auth/   # Auth module
```

### 📦 Shared Libraries

```typescript
// libs/shared/data-access/src/lib/api-client.ts
export class ApiClient {
  async getUsers() {
    return fetch('/api/users').then(r => r.json());
  }
}

// Usage in frontend
import { ApiClient } from '@my-workspace/shared/data-access';

// Usage in backend
import { validateEmail } from '@my-workspace/shared/utils';
```

### 🔄 Dependency Graph

```bash
nx graph  # Visualize dependencies
nx affected:test  # Test only affected projects
nx affected:build  # Build only affected
```

---

## 8. React Best Practices {#react}

### ⚡ Performance

```typescript
// 1. useMemo (expensive calculations)
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);

// 2. useCallback (prevent re-renders)
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// 3. React.memo (component memoization)
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});

// 4. Code splitting
const AdminPanel = lazy(() => import('./AdminPanel'));

<Suspense fallback={<Loading />}>
  <AdminPanel />
</Suspense>
```

---

### 🪝 Custom Hooks

```typescript
// useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const searchTerm = useDebounce(inputValue, 500);
```

---

## 9. PostgreSQL & SQL {#sql}

### 🎯 Common Queries

```sql
-- Joins
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.author_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 5;

-- Window functions
SELECT 
  name,
  salary,
  department,
  AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;

-- CTEs (Common Table Expressions)
WITH active_users AS (
  SELECT * FROM users WHERE last_login > NOW() - INTERVAL '30 days'
)
SELECT * FROM active_users WHERE role = 'admin';

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_author_published ON posts(author_id, published_at);

-- Transactions
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

---

## 10. Live Coding - Częste Zadania {#live-coding}

### 🎯 Zadanie 1: REST API CRUD

**Zadanie:** Stwórz endpoint do zarządzania produktami (CRUD)

```typescript
// product.entity.ts
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;
}

// product.dto.ts
export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;
}

// product.controller.ts
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('minPrice') minPrice?: number) {
    return this.productService.findAll(minPrice);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }
}
```

---

### 🎯 Zadanie 2: File Upload do S3

```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  const key = `uploads/${Date.now()}-${file.originalname}`;
  
  await this.s3.send(new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));

  return { url: `https://my-bucket.s3.amazonaws.com/${key}` };
}
```

---

### 🎯 Zadanie 3: Async Processing z SQS

```typescript
// Producer (API endpoint)
@Post('orders')
async createOrder(@Body() dto: CreateOrderDto) {
  const order = await this.orderRepository.save(dto);
  
  // Send to queue for async processing
  await this.sqs.send(new SendMessageCommand({
    QueueUrl: process.env.ORDER_QUEUE_URL,
    MessageBody: JSON.stringify({ orderId: order.id }),
  }));

  return { message: 'Order created, processing...', orderId: order.id };
}

// Consumer (Lambda or background worker)
async processOrder(orderId: string) {
  const order = await this.orderRepository.findOne({ where: { id: orderId } });
  
  // Process payment
  await this.paymentService.charge(order);
  
  // Update status
  order.status = 'completed';
  await this.orderRepository.save(order);
  
  // Send email
  await this.emailService.sendConfirmation(order);
}
```

---

### 🎯 Zadanie 4: Authentication Flow

```typescript
// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ email, password: hashedPassword });
    return this.generateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user);
  }

  private generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
```

---

## 11. Pytania Behawioralne {#behavioral}

### 💬 Typowe pytania + Jak odpowiedzieć

**Q: "Opowiedz o najtrudniejszym bugzie który naprawiłeś"**

*Struktura odpowiedzi (STAR method):*
- **Situation**: Opis problemu
- **Task**: Co trzeba było zrobić
- **Action**: Twoje konkretne działania
- **Result**: Rezultat + co się nauczyłeś

*Przykład:*
> "W projekcie Trainly mieliśmy memory leak w NestJS. Po analizie przez `clinic.js` odkryłem że nie zamykaliśmy WebSocket connections w `onModuleDestroy()`. Zaimplementowałem proper cleanup i memory usage spadło o 60%."

---

**Q: "Jak radziłeś sobie z tight deadline?"**

> "Przy feature X deadline był za 2 tygodnie. Podzieliłem na MVP (must-have) i nice-to-have features. Skupiłem się na core functionality, dostarczyłem na czas. Dodatkowe features weszły w następnym sprincie."

---

**Q: "Conflict z team member?"**

> "Programista chciał użyć microservices, ja uważałem że monolith wystarczy na start. Pokazałem data: team 3 osoby, traffic <1000 users/day. Uzgodniliśmy monolith z modular architecture (łatwa migracja później). Zadziałało."

---

**Q: "Największy challenge w Trainly?"**

> "Implementacja real-time availability calendar z konfliktami bookingów. Użyłem database transactions + optimistic locking. Dodatkowo dodałem Redis cache dla frequent queries. Response time <200ms."

---

## 🎯 QUICK REFERENCE CARD

### Must Know Before Interview

```
✅ NestJS: DI, Guards, Pipes, Exception Filters
✅ Next.js: SSG vs SSR vs ISR (VERY IMPORTANT!)
✅ AWS: Cognito (auth), S3 (storage), Lambda (serverless), SQS (queues)
✅ TypeORM: Entities, Repositories, Query Builder, Migrations
✅ Testing: Jest (unit), E2E, Coverage
✅ SQL: Joins, Indexes, Transactions
✅ REST API: Proper HTTP methods, Pagination, Auth
```

### Common Mistakes to Avoid

```
❌ "SSR is always better than SSG" - NO! Use case dependent
❌ "Synchronize: true in production" - NEVER! Use migrations
❌ Storing passwords in plain text - ALWAYS hash (bcrypt)
❌ No error handling in async code
❌ Not using transactions for critical operations
❌ Forgetting to clean up resources (connections, timers)
```

---

## 🚀 Last Minute Prep (1 hour before)

1. **Review projects** - Trainly architecture, challenges solved
2. **Mental practice** - Explain SSR vs SSG out loud
3. **Deep breath** - You know this! 💪

---

## 💡 Final Tips

1. **Ask questions** - "Should I optimize for read or write performance?"
2. **Think out loud** - Show your thought process
3. **Start simple** - Get working solution, then optimize
4. **Admit if don't know** - "I haven't used X, but I'd approach it like Y"
5. **Be confident** - You built Trainly from scratch! 🔥

---

**Good luck! Powodzenia! 🍀**

Remember: They're not looking for perfection, but for problem-solving ability and learning mindset.
