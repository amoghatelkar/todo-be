# Todo Backend API

A RESTful API for managing todo items built with Node.js, Express, and Prisma ORM.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Development**: Nodemon

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository and navigate to the backend directory:
   ```bash
   cd todo-app/be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

1. Create a `.env` file in the root directory of the backend:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/todoapp"
   ```

   Replace the following with your PostgreSQL credentials:
   - `username`: Your PostgreSQL username
   - `password`: Your PostgreSQL password
   - `localhost:5432`: Your PostgreSQL host and port
   - `todoapp`: Your database name

## Database Setup

1. Ensure PostgreSQL is running and the database specified in `DATABASE_URL` exists.

2. Run Prisma migrations to set up the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:4000` with hot reloading enabled.

### Production Mode
```bash
node server.js
```

## API Endpoints

The API provides the following endpoints for todo management:

### Base URL
```
http://localhost:4000/todo
```

### Endpoints

#### 1. Create Todo
- **Method**: `POST`
- **Endpoint**: `/todo`
- **Body** (JSON):
  ```json
  {
    "title": "Sample Todo",
    "description": "Description of the todo",
    "status": "pending",
    "priority": "high",
    "tags": ["work", "urgent"],
    "endDate": "2024-12-31T23:59:59Z",
    "startDate": "2024-01-01T00:00:00Z",
    "email": "user@example.com",
    "phone": "+1234567890",
    "categories": ["personal", "work"],
    "color": "#FF5733"
  }
  ```

#### 2. Get All Todos
- **Method**: `GET`
- **Endpoint**: `/todo`
- **Response**: Array of todo objects

#### 3. Update Todo
- **Method**: `PATCH`
- **Endpoint**: `/todo/:id`
- **Body**: Partial todo object with fields to update
- **Example**:
  ```json
  {
    "status": "completed",
    "description": "Updated description"
  }
  ```

#### 4. Delete Todo
- **Method**: `DELETE`
- **Endpoint**: `/todo/:id`

## Todo Model

The Todo model includes the following fields:

- `id`: String (UUID, primary key)
- `title`: String (required)
- `description`: String (optional)
- `status`: String (required)
- `priority`: String (required)
- `tags`: String array
- `endDate`: DateTime (required)
- `startDate`: DateTime (required)
- `email`: String (required)
- `phone`: String (required)
- `categories`: String array
- `color`: String (required)
- `createdAt`: DateTime (auto-generated)
- `modifiedAt`: DateTime (auto-updated)

## Project Structure

```
be/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── app.js                 # Express app setup
│   ├── controller/
│   │   └── todo.controller.js # Request handlers
│   ├── routes/
│   │   └── todo.route.js      # API routes
│   ├── services/
│   │   └── todo.service.js    # Business logic
│   └── prisma/
│       └── prismaClient.js    # Prisma client setup
├── server.js                  # Server entry point
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables
└── .gitignore                 # Git ignore rules
```

## Available Scripts

- `npm run dev`: Start the development server with nodemon
- `npm test`: Run tests (currently not implemented)

## Prisma Commands

- `npx prisma migrate dev`: Create and apply migrations
- `npx prisma generate`: Generate Prisma client
- `npx prisma studio`: Open Prisma Studio for database management
- `npx prisma db push`: Push schema changes to database (development only)

## CORS Configuration

The API is configured with CORS enabled, allowing requests from any origin. In production, you may want to restrict this to specific domains.

## Error Handling

The API includes basic error handling. Errors are logged to the console. In production, consider implementing more robust error handling and logging.

## Contributing

1. Make sure all tests pass
2. Follow the existing code style
3. Update documentation as needed

## License

This project is licensed under the ISC License.