# Squirro Coding Challenge Frontend

This is an implementation of Squirro Frontend Coding Challenge.

## Running the project

Install dependencies first by

```shell
$ npm install
```

Once the dependencies are installed, you can start the dev server by

```shell
$ npm run dev
```

**NOTE**: The frontend assumes by default that the API is available through <http://localhost:3000>. If it's not the case, set `BOOK_STORE_API_URL` in the environment:

```shell
$ BOOK_STORE_API_URL="http//localhost:9001" npm run dev
```

Once the dev server is running, the application can be reached at <http://localhost:3300>.

## Tests

Tests can be run through

```shell
$ npm run test
```

or alternatively, tests can be run in watch mode as well, making them rerun on each change:

```shell
$ npm run test:watch
```
