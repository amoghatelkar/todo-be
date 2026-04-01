# Todo Backend API

REST API for managing todos with Node.js, Express, Prisma, and PostgreSQL.

## Stack

- Node.js 18+
- Express
- Prisma
- PostgreSQL

## Project Structure

```text
be/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── app.js
│   ├── controller/
│   ├── prisma/
│   ├── routes/
│   └── services/
├── server.js
├── package.json
└── prisma.config.ts
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in `be/`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/todoapp?schema=public"
```

3. Apply migrations:

```bash
npx prisma migrate dev
```

4. Start the API:

```bash
npm run dev
```

The server runs on `http://localhost:4000`.

## Available Scripts

- `npm run dev` starts the API with `nodemon`
- `npm start` starts the API in production mode
- `npm run prisma:generate` generates Prisma Client
- `npm run prisma:migrate:deploy` applies existing migrations
- `npm test` prints the placeholder test command

## API

Base URL:

```text
http://localhost:4000
```

Health check:

- `GET /health`

Todos:

- `POST /todo`
- `GET /todo`
- `PATCH /todo/:id`
- `DELETE /todo/:id`

Example create payload:

```json
{
  "title": "Sample Todo",
  "description": "Description of the todo",
  "status": "pending",
  "priority": "high",
  "tags": ["work", "urgent"],
  "endDate": "2026-12-31T23:59:59Z",
  "startDate": "2026-01-01T00:00:00Z",
  "email": "user@example.com",
  "phone": "+1234567890",
  "categories": ["personal", "work"],
  "color": "#FF5733"
}
```

## Data Model

The `Todo` model includes:

- `id`
- `title`
- `description`
- `status`
- `priority`
- `tags`
- `endDate`
- `startDate`
- `email`
- `phone`
- `categories`
- `color`
- `createdAt`
- `modifiedAt`

## Notes

- CORS is currently open to all origins.
- Deployment details are documented separately in `AWS_DEPLOYMENT_GUIDE.md`.
