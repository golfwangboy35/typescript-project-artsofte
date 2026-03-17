# Finance Tracker (Angular)

## 📌 О проекте

**Finance Tracker** — это веб-приложение для учёта личных финансов, разработанное с использованием **Angular** и **TypeScript**.

Приложение позволяет:

- отслеживать доходы и расходы
- просматривать историю транзакций
- анализировать финансовую статистику
- управлять категориями расходов и бюджетами
- ставить финансовые цели и отслеживать прогресс
- получать уведомления в реальном времени (превышение бюджета, достижение цели)

Проект создаётся как командная разработка с использованием **Git workflow и pull requests**.

---

## 🛠 Технологии

Основной стек проекта:

| Слой | Технологии |
|------|------------|
| Фреймворк | Angular (актуальная версия), TypeScript |
| Стили | SCSS, Angular Material |
| Реактивность | RxJS, Angular Signals |
| Маршрутизация | Angular Router (Lazy Loading, Guards, Resolvers) |
| HTTP | Angular HttpClient, REST API |
| Real-time | WebSocket (socket.io-client) |
| Backend | NestJS, PostgreSQL, TypeORM |
| Инструменты | Angular CLI, ESLint, Git |

---

## 🚀 Установка и запуск проекта

### Требования

- Node.js >= 18
- npm >= 9
- PostgreSQL >= 14 (для backend)

### Frontend

```bash
git clone https://github.com/your-org/finance-tracker.git
cd finance-tracker
npm install
ng serve
```

Приложение будет доступно по адресу `http://localhost:4200`

### Backend

```bash
cd backend
npm install
cp .env.example .env   # заполнить переменные окружения
npm run start:dev
```

Backend будет доступен по адресу `http://localhost:3000`

### Переменные окружения (`.env`)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=finance_tracker
JWT_SECRET=your_jwt_secret
```

---

## 📁 Структура проекта

```
src/
├── app/
│   ├── core/                        # Синглтон-сервисы, guards, interceptors
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts  # Добавляет JWT в заголовки
│   │   └── services/
│   │       ├── auth.service.ts
│   │       └── notification.service.ts
│   │
│   ├── shared/                      # Переиспользуемые компоненты и директивы
│   │   ├── components/
│   │   │   ├── currency-input/      # CVA-компонент ввода суммы
│   │   │   └── category-select/     # CVA-компонент выбора категории
│   │   ├── directives/
│   │   │   └── highlight-expense.directive.ts
│   │   ├── models/                  # TypeScript-интерфейсы
│   │   │   ├── transaction.model.ts
│   │   │   ├── budget.model.ts
│   │   │   ├── goal.model.ts
│   │   │   └── notification.model.ts
│   │   └── pipes/
│   │
│   └── pages/                       # Lazy-loaded модули страниц
│       ├── auth/
│       │   ├── login/
│       │   └── register/
│       ├── dashboard/
│       ├── transactions/
│       │   ├── transaction-list/
│       │   └── transaction-detail/  # Загружается через Resolver
│       ├── budgets/
│       ├── goals/
│       ├── analytics/
│       ├── notifications/
│       └── profile/
│
├── assets/
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

---

## 📄 Страницы приложения

| Маршрут | Страница | Описание |
|---------|----------|----------|
| `/login` | Вход | Авторизация по JWT |
| `/register` | Регистрация | Создание аккаунта |
| `/dashboard` | Главная | Сводка: баланс, виджеты, последние транзакции |
| `/transactions` | Транзакции | Список с фильтрацией и поиском, CRUD |
| `/transactions/:id` | Детали | Детальная карточка, данные через Resolver |
| `/budgets` | Бюджеты | Лимиты по категориям, прогресс-бары |
| `/goals` | Цели | Финансовые цели, накопления |
| `/analytics` | Аналитика | Графики расходов по месяцам и категориям |
| `/notifications` | Уведомления | Лента в реальном времени через WebSocket |
| `/profile` | Профиль | Настройки аккаунта, валюта, аватар |

---

## 🌳 Работа с ветками (Git Workflow)

В проекте используется следующая стратегия ветвления.

### Основные ветки

#### `main`

Главная ветка проекта.

- содержит **стабильную и финальную версию продукта**
- в неё попадает только **проверенный код**
- прямые коммиты в эту ветку **запрещены**

---

#### `dev`

Основная ветка разработки.

- используется для **интеграции новых функций**
- в неё попадает код после **code review**

---

## 🔧 Рабочий процесс разработки

**1️⃣** Перед началом работы обновляем ветку `dev`

```bash
git checkout dev
git pull
```

**2️⃣** Создаём новую ветку **от dev**

Название ветки должно описывать задачу:

```
feature/transaction-page
feature/add-income-form
fix/transaction-bug
```

Команда:

```bash
git checkout -b feature/your-feature-name
```

---

**3️⃣** Ведём разработку **в своей ветке**

Коммиты делаем регулярно:

```bash
git add .
git commit -m "add transaction form"
```

---

**4️⃣** Отправляем ветку в репозиторий

```bash
git push origin feature/your-feature-name
```

---

**5️⃣** Создаём **Pull Request**

После завершения задачи:

- создаём **Pull Request**
- цель: **merge в ветку `dev`**
- код проходит **review**

---

**6️⃣** После проверки

Если Pull Request одобрен:

- ветка **merge → dev**
- рабочая ветка удаляется

---

## 🚫 Важные правила

❗ Нельзя:

- коммитить напрямую в `main`
- коммитить напрямую в `dev`
- работать в одной ветке нескольким разработчикам

✅ Нужно:

- создавать отдельную ветку для каждой задачи, например: `feature/notifications-page`
- использовать Pull Request в dev
- проводить Code Review

---

## 👨‍💻 Команда

- Геймбюхнер Георгий Сергеевич
- Дурницин Семен Дмитриевич
- Фоломкина Татьяна Петровна
