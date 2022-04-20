# Getting Started the Gallery app

## Pre-requisites

- To run WITHOUT docker `export REACT_APP_CLIENT_ID=SUPER_SECRET_KEY && npm start`
- To run WITH docker-compose please create a app.env file in ./gallery with REACT_APP_CLIENT_ID=SUPER_SECRET_KEY

## Available Scripts

In the project directory, you can run:

### `docker-compose build`

Builds your images via docker compose;

### `docker-compose up`

Starts your local development environment with hot-reloading

### `cd ./gallery && npm run test`

Runs all the unit tests in watch mode
