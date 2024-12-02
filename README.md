## Description

Advertisement campaign reports

## Project setup

### Install dependences

```bash
$ npm install
```

### Update .env with .env.example

### Run database

```bash
$ cd docker
$ docker-compose up db
```

### Migration

```bash
$ npm migration:run
```

### Run queue

```bash
$ cd docker
$ docker-compose up queue
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# with docker
$ cd docker
$ docker-compose up -d
```

### API Documentation

[http://localhost:3000/api](http://localhost:3000/api)
