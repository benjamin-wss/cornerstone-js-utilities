# cornerstone-js-utilities

A collection of utilities that I find myself writing all the time at work.
This is primarily used backend/server-side code.

# Getting Started

To install the package you run either command in your terminal:

**via NPM**

```shell
npm install --save @benjamin-wss/cornerstone-js-utilities
```

**via Yarn**

```shell
yarn add @benjamin-wss/cornerstone-js-utilities
```

# API Documentation

There are several utilities included in this package to make life easier.

## Environment Variables

These are a series of helper functions to make accessing environment variables easier.

There are 2 ways to use this. Namely:

### Accessing Environment Variables With Default Value

Use this if you want to have a default value if an environment variable is not specified. Use this like so:

```javascript
const {
  EnvironmentVariables,
} = require("@benjamin-wss/cornerstone-js-utilities");

const dbConnectionString = EnvironmentVariables.getEnvVariableAsString({
  fieldName: "DB_CONNECTION_STRING",
  // If you use this to put a PROD connection string by default, you are intellectually challenged.
  defaultValue:
    "postgres://doNot:putProductionCredentials@yourDefaultVariables.com/AppDb",
});
```

If the utility is used this way, the `defaultValue` will be used when an environment variable is used.

Note that I am using a database connection string as an attempt as humor, you **should not** put production DB credentials as the example implies. You can however, use this for other things like say your HTTP server port number, service name, Google Maps API url, etc. Basically only specify a default only when it is unlikely to change from local development to production.

### Accessing Environment Variables Without Default Value

Use this if you want an error thrown if no environment variable is specified.

```javascript
const {
  EnvironmentVariables,
} = require("@benjamin-wss/cornerstone-js-utilities");

const dbConnectionString = EnvironmentVariables.getEnvVariableAsString({
  fieldName: "DB_CONNECTION_STRING",
});
```

An error will be thrown if no environment variable is specified. In the case of the example, if the `DB_CONNECTION_STRING` environment variable is not specified, an error will be thrown that looks like:

```shell
`The environment variable DB_CONNECTION_STRING does not have a default value and is null, please provide a value or define a default value.`
```

The `DB_CONNECTION_STRING` section of the error message will be different depending on the environment variable you specify.

# TODO

- [x] Write `jsdoc` for functions.
- [x] Write documentation on functions for the `EnvironmentVariables` group of utilities.
- [ ] Complete unit test suite.
