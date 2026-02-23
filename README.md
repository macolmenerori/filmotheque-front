# filmotheque-front

A personal movie collection database, to keep track of the movies we own.

## Requirements

- [opensesame project](https://github.com/macolmenerori/opensesame) set up and running (for authentication)
- [filmotheque-back](https://github.com/macolmenerori/filmotheque-back) set up and running
- [Node JS](https://nodejs.org/en) `>=24.0` (Krypton)
- [pnpm](https://pnpm.io/installation)

## How to set up and run (Demo)

A Docker Compose setup is included to run the **full stack** (MongoDB + auth service + backend + frontend) with a single command, pre-loaded with sample data.

1. Clone the repository:

   ```bash
   git clone https://github.com/macolmenerori/filmotheque-front.git
   cd filmotheque-front/docker
   ```

2. Build and start all services:

   ```bash
   docker compose up --build
   ```

3. Open `http://localhost` and log in with:
   - **Email:** `admin@admin.com`
   - **Password:** `administrator`

The compose stack includes:

| Service             | Port  | Description                   |
| ------------------- | ----- | ----------------------------- |
| `filmotheque-db`    | 27017 | MongoDB with seeded demo data |
| `opensesame-back`   | 8080  | Authentication API            |
| `filmotheque-back`  | 8082  | Filmotheque API               |
| `filmotheque-front` | 80    | Frontend (Nginx)              |

> Sample movies are pre-loaded. To reset the data, run `docker compose down` and start again.

## How to set up and run (Docker)

Easiest way to set up the project to use it right away.

### Requirements

- [Docker](https://www.docker.com/) installed and running
- [opensesame-back](https://github.com/macolmenerori/opensesame-back) set up and running (can be in Docker too)
- [filmotheque-back](https://github.com/macolmenerori/filmotheque-back) set up and running (can be in Docker too)

### Steps

1. Edit the file `.example.env` with all the parameters, then rename it to `.env`. If following this guide, leave the variables as they are.
2. Set up opensesame-back: generate docker image and run it (see [opensesame-back readme](https://github.com/macolmenerori/opensesame-back/blob/master/README.md) for more info)

```
docker build -t opensesame-back:latest .

docker network create opensesame-network

docker run --network opensesame-network -p 8080:8080 --name opensesame-back opensesame-back
```

1. Set up filmotheque-back: generate docker image and run it (see [filmotheque-back readme](https://github.com/macolmenerori/filmotheque-back/blob/master/README.md) for more info)

```
docker build -t filmotheque-back:latest .

docker run --network opensesame-network -p 8081:8081 --name filmotheque-back filmotheque-back
```

1. Generate the docker image

```
docker build -t filmotheque-front:latest .
```

1. Run the docker image

```
docker run --network opensesame-network --env-file .env -p 80:80 --name filmotheque-front filmotheque-front
```

## How to set up and run (Native)

For feature-testing and development.

### Requirements

- Node JS
- pnpm
- opensesame-back set up and running
- filmotheque-back set up and running

### Steps

1. Edit the file `.example.env` with all the parameters, then rename it to `.env`
2. Install packages `pnpm install`
3. Run the dev environment `pnpm start`

## Configuration

```
NODE_ENV=production # The environment, leave 'production' for usage and 'development' for dev

BASE_URL_AUTH=http://localhost:8080/api # URL of opensesame-back API
BASE_URL_API=http://localhost:8081/api # URL of fimotheque-back API
```
