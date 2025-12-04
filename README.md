# Telemetry service

This repository is created for test assignment project for company JustSnap

## Table of Content

- [Project Description](#project-description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Running an Application](#running-an-application)
- [Testing](#testing)
- [Project Status](#project-status)

## Project Description

This project represents a simple service that receives and analyses telemetry readings passed via HTTP API. The service receives new data, extracts previous records from database, aggregates it all together and applies rules to get the result for telemetry. `json-rules-engine` is used for rules application.

## Prerequisites

Before running the project make sure that the following is installed on your computer:

- NodeJS ([download link](https://nodejs.org/en/download))
- NVM ([installation guide](https://github.com/nvm-sh/nvm#install--update-script))
- Docker ([installation link](https://docs.docker.com/engine/install/))
- Docker Compose ([installation link](nvmnode.com/guide/installation.html))

## Installation

- run `nvm install` to use NodeJS version specified in `.nvmrc` file
- run `npm ci` to install dependencies

Now you are all set

## Project structure

```tree
./
├── scripts/                                # Scripts that generate data for docker volumes
│   ├── create-initial-monogo-config.js     # Create user and db
│   └── create-initial-pg-configs.js        # Create user and db
├── src/
│   ├── adapters/           # Adapters for core app
│   │   ├── driven/         # Repos and everything that is driven by domain services
│   │   │   ├── RulesEngine/
│   │   │   │   └── RulesRepository.js
│   │   │   └── TelemetryService/
│   │   │       └── TelemetryRepository.js
│   │   └── driving/                    # Everything that drives domain (i.e. controllers)
│   │       └── TelemetryController.js
│   ├── core/   # Core (domain) logic of application
│   │   ├── errors/     # Common errors
│   │   │   ├── DtoError.js
│   │   │   └── TelemetryError.js
│   │   ├── rule-engine/
│   │   │   ├── domain/ # Descripton of entities (models)
│   │   │   │   └── RuleEngineEntity.js
│   │   │   ├── dto/                            # DTO classes
│   │   │   │   ├── RuleEngineResultDto.js
│   │   │   │   └── TelemetryEngineDataDto.js
│   │   │   ├── interface/                      # Class interfaces
│   │   │   │   └── ITelemetryRuleEngine.js
│   │   │   ├── ports/                          # Ports interfaces
│   │   │   │   ├── driven/
│   │   │   │   │   └── RulesRepository.js
│   │   │   │   └── driving/
│   │   │   │       └── RunRulesPort.js
│   │   │   ├── service/                        # Core service working with entity
│   │   │   │   └── telemetry-rule-engine.service.js
│   │   │   └── usecases/                       # Usecases
│   │   │       └── RunRulesUseCase.js
│   │   └── telemetry-service/
│   │       ├── domain/
│   │       │   └── TelemetryEntity.js
│   │       ├── dto/
│   │       │   ├── TelemetryAggregateDto.js
│   │       │   ├── TelemetryDto.js
│   │       │   └── TelemetryPersistentDto.js
│   │       ├── interface/
│   │       │   └── ITelemetryAggregateService.js
│   │       ├── ports/
│   │       │   ├── driven/
│   │       │   │   └── TelemetryRepositoryPort.js
│   │       │   └── driving/
│   │       │       ├── GetTelemetryAggregationPort.js
│   │       │       ├── GetTelemetryResultPort.js
│   │       │       └── SaveTelemetryPort.js
│   │       ├── service/
│   │       │   ├── telemetry-aggregate.service.js
│   │       │   └── types.js
│   │       └── usecases/
│   │           ├── GetTelemetryAggregateUseCase.js
│   │           ├── GetTelemetryReulstUseCase.js
│   │           └── SaveTelemetryUseCase.js
│   ├── env/
│   │   └── environment.js          # Exports all functions for getting env vars
│   ├── infrastructure/             # Any interraction with outside world
│   │   ├── api/                    # Fastify API routes
│   │   │   └── routes/
│   │   │       └── telemetry.route.js
│   │   └── db/                     # Database configs and models
│   │       ├── mongo/
│   │       │   └── models/
│   │       │       └── JsonRuleModel.js
│   │       └── postgresql/
│   │           ├── config/
│   │           │   └── db.js
│   │           └── models/
│   │               └── telemetry.model.js
│   ├── app.js                      # Registers routes and plugins and initiates fastify
│   └── server.js                   # Starts a server
├── static/
│   └── rules/
│       └── rules.js                # Rules for `json-rule-engine`
├── tests/
│   ├── e2e/
│   │   └── api.test.js
│   ├── integration/
│   │   ├── mongo.test.js
│   │   └── postgres.test.js
│   └── unit/
│       ├── __mocks__/
│       │   ├── fake-telemetry-generator.js
│       │   ├── rules-repo.mock.js
│       │   └── telemetry-repo.mock.js
│       ├── services/
│       │   ├── telemetry-aggregate-service.test.js
│       │   └── telemetry-rule-engine.test.js
│       └── usecases/
│           ├── rule-engine/
│           │   └── run-rules-usecase.test.js
│           └── telemetry-aggregate/
│               ├── get-telemetry-aggregate-usecase.test.js
│               └── get-telemetry-result-usecase.test.js
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── env_examle      # Sample for .env file
├── .gitignore
├── jest.config.js
├── jsdoc-ignore-imports.cjs    # Plugin to avoid issues with keyword `import` is JSDoc
├── jsdoc.json
├── .nvmrc
├── package.json
├── package-lock.json
├── README.md
└── .sequelizerc
```

## API Reference

For now application has one single endpoint.
API doc is available via `/docs` endpont

## Running an Application

### Env files setup

Run

```bash
cat env_example > .env          # this env file is for project in general
cat env_example > .env.test     # this one is used for tests only
```

### Env vars description

```bash
PG_DATABASE=telemetry_app
PG_USERNAME=dev             # Username used by application
PG_PASSWORD=password        # Password used by application
PG_PORT=5431
PG_HOST=localhost           # Keep "localhost" for .env.test but replace with "postgresdb" in .env
PG_ROOT_PASSWORD=password   # Password used to create container and run init script (do not use in app)
PG_ROOT_USER=root           # User used for container creation and init (do not use in app)

MONGO_ROOT_PASSWORD=password  # Password used to create container and run init script (do not use in app)
MONGO_ROOT_USER=root        # User used for container creation and init (do not use in app)
MONGODB_USERNAME=dev        # Used by app
MONGODB_PASSWORD=password   # Used by app
MONGODB_DATABASE_NAME=telemetry_app
MONGODB_HOST=localhost      # Keep localhost for .env.test but replace with "mongo" in .env
MONGODB_PORT=27016
MONGODB_RULES_COLLECTION=telemetry_json_rules

NODE_ENV=test

```

Make sure you are using correct values in `.env` and `.env.test`

### Installing dependencies and running

```bash
$ nvm install                   # use correct version of node
$ npm ci                        # install dependencies
$ npm run db:initial-config     # create config for docker init (important!!!)
$ npm run start:local           # starts docker compose
```

### Stoping and removing volumes

```bash
docker compose down -v
```

### Starting databases only

```bash
npm run docker:start:db
```

### Watching logs

```bash
npm run docker:logs:server
npm run docker:logs:mongo
npm run docker:logs:postgres
```

### Rebuilding after changing database user, password or database name

```bash
docker compose down -v # stop running containers and remove volumes
npm run db:initial-config # create new configs for docker init
npm run docker:build # rebuilds app container without using cached version
npm run start:local # starts docker compose
```

## Testing

```bash
npm run test:unit # starts unit tests
npm run test:integration # starting integration tests (database must be running in docker)
npm run test:e2e  # API test (app must be running in docker)
npm run test:all # runs all test (app must be running in docker)
```

## Project Status

The project is not fully finished yet. Unfortunately not all of the requirements were met. Things to implement:

- Handling database timeouts and disconnect
- Caching
- API rate limiting
- Concurrency and race-condition handling
- Dependency injection (inversify)
- Logic for telemetry analysis
- Authorization and authentication (API key)
- DB migrations (`sequelize-cli` does not work with ES modules)

Things to improve:

- Use case testing (now it does not cover all possible cases)
- API testing (lacks validation tests)
- Rules logic testing (not all scenarios are tested)
