# Technical

- **Application**: [NestJS](https://nestjs.com/)
- **Seed data**: [Python](https://www.python.org/) (_Because Python provides strong support for big data processing_)

# Settings

- **Node.js**: [nodejs.org](https://nodejs.org/en)
- **docker**: [python.org](https://www.docker.com/products/docker-desktop/)
- **makefile**
  - _Window_: Using [Chocolatey](https://chocolatey.org/install) (Ref: [StackOverFlow](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows))
  - _MacOS_: using Brew `brew install make`
  - _Linux_: using apt `sudo apt install build-essential -y`

# Overview architecture

![Your Code Work](./screenshots/architecture.jpg)

- Since top students group data or chart data is frequently used, caching will be utilized to improve application performance.

![Your Code Work](./screenshots/overview_architecture.jpg)

# Seed data

- You can create a **Python virtual environment** if you don’t want to
  install packages directly on your machine.

  install packages directly on your machine.

  `python3 -m venv .venv`

  `source .venv/bin/activate`

  `pip3 install psycopg2-binary pandas sqlalchemy`

- Run seed.py

  `python3 src/database/seeds/seed.py`

  - Note*: Change db_url to database path

# Run

- Development environment (NODE_ENV=development)

  - For the first run
    `make bootstrap`

  - For subsequent runs, just execute
    `make up`

# Build

- Use multi-stage builds in Dockerfile to reduce the image size.
- Build Docker Image
  `make build`
- Push Image to Docker Hub
  `make push`

# Deploy

**Backend**

- Using [Onrender](https://render.com/) (Docker image - docker.io/vuong676/gscore:latest)
- Link Deployed: https://gscore-backend.onrender.com/documentation

**Database**: Using [Aiven Console](https://console.aiven.io/) (Since support free 5GB).

# Swagger API

- Check Scores Feature

![Your Code Work](./screenshots/checkScoreApi.png)

- Get Top Student By Group Type Feature
  ![Your Code Work](./screenshots/topStudentApi.png)

- Retrieve subject score information for bar chart or circle chart.

![Your Code Work](./screenshots/getChartApi.png)
