## Description

Simple google drive api (google auth, file and folder structure, view/edit user access)

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
$ docker-compose up app
```

### API Documentation

[http://localhost:3000/api](http://localhost:3000/api)
