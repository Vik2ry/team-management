# Next.js 14 Setup Guide with Redis, Bull, and PostgreSQL

This guide provides setup instructions for running a Next.js 14 application with Redis (for Bull) and PostgreSQL using Docker. 

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Optional: [pgAdmin 4](https://www.pgadmin.org/download/) if using a local PostgreSQL setup.

Additionally, create a `.env` file in the project root with the following environment variables:

```env
DATABASE_URL="postgres://postgres:Segun@19@localhost:5432/football-transfer"
JWT_SECRET="football-transfer-secret"
NEXT_PUBLIC_GIPHY_API_KEY="Lighg4uIbZkTXM1P59wKPePFHo4gmwGX"
```

---

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vik2ry/team-management.git
   cd team-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the environment variables:**
   Create a `.env` file in the root of your project and add the variables mentioned in the "Prerequisites" section.

---

## Docker Setup

### 1. Redis Setup for Bull

To set up Redis for Bull using Docker, include the following in your `docker-compose.yml`:

```yaml
version: '3.8'
services:
  redis:
    image: redis:alpine
    container_name: redis
    ports:
      - "6379:6379"
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis-data:/data

volumes:
  redis-data:
```

This configuration:
- Uses the `redis:alpine` image.
- Exposes Redis on port `6379`.
- Ensures data persistence with a Docker volume.

### 2. PostgreSQL Setup

To set up PostgreSQL with Docker:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: Segun@19
      POSTGRES_DB: football-transfer
    ports:
      - "5432:5432"
    volumes:
      - pg-data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "8080:80"

volumes:
  pg-data:
```

This configuration:
- Sets up PostgreSQL on port `5432`.
- Configures pgAdmin 4 on port `8080`.

---

## Running the Application

1. **Build and start services:**
   ```bash
   docker-compose up -d
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Next.js app: `http://localhost:3000`
   - Redis: `redis://localhost:6379`
   - PostgreSQL: `postgres://postgres:Segun@19@localhost:5432/football-transfer`
   - pgAdmin: `http://localhost:8080` (Email: `admin@example.com`, Password: `admin`)

---

## Additional Notes

- **Using Redis for Bull:**  
  Ensure the Redis connection in your application points to `redis://localhost:6379`.

- **Database Migrations:**  
  Use a tool like Prisma or Sequelize for database migrations:
  ```bash
  npx prisma migrate dev
  ```

- **Environment Variables:**  
  Never hardcode sensitive credentials. Use `.env` files or a secrets manager.

---

- **Time Report**
  Planning and Project setup ---------------------------------- 2 hours
  Background process setup and Research------------------------ 2 hours
  Schema setup Authentication and API routes initial setup----- 4 hours
  Basic/bare-boned UI setup ----------------------------------- 2 hours
  Player Card design and initial UI---------------------------- 3 hours
  Debugging UI when a line went missing unknown to me --------- 4 hours
