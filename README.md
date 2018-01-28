# lambda-emulator [![Build Status](https://travis-ci.org/Hoishin/lambda-emulator.svg?branch=master)](https://travis-ci.org/Hoishin/lambda-emulator) [![codecov](https://codecov.io/gh/Hoishin/lambda-emulator/badge.svg?branch=master)](https://codecov.io/gh/Hoishin/lambda-emulator?branch=master)

> Emulate AWS Lambda + DynamoDB application and run tests

## Prerequisites

- [nvm](https://github.com/creationix/nvm#install-script) or Node 6.10.3 installed
- Docker

## Install

```sh
npm install --save lambda-emulator
```

## Setting up

Make sure you are using Node v6.10.3

```sh
node --version
# If not 6.10.3
nvm install 6.10.3
```

Install Serverless Framework and its plugins

```sh
npm install --global serverless
npm install --save-dev serverless-dynamodb-local serverless-offline serverless-plugin-simulate
```

Download the Docker image that will be used to emulate Lambda

```sh
docker pull lambci/lambda:nodejs6.10
```

Install DynamoDB

```sh
sls dynamodb install
```

## Start emulator

You need to have 3 processes simultaneously. Open 3 terminals and run the commands below in order.

```sh
sls simulate lambda -p 4000
```

```sh
sls simulate apigateway -p 5000 --lambda-port 4000
```

```sh
sls dynamodb start -p 8000 --seed=development
```

## Usage

### SDK

```js
// Instead of require('aws-sdk') import 'lambda-emulator'
// Even though the name is emulator, this import is production-ready
// since it will just import aws-sdk if it is production
const { Lambda, DynamoDB } = require('lambda-emulator');

const lambda = new Lambda();
lambda.invoke(someParams);

const dynamodb = new DynamoDB.DocumentClient();
dynamodb.get(someParams);
```

### CLI

Use Serverless commands

```
$ sls invoke local
Plugin: Invoke
invoke local .................. Invoke function locally
    --function / -f (required) ......... Name of the function
    --path / -p ........................ Path to JSON or YAML file holding input data
    --data / -d ........................ input data
    --raw .............................. Flag to pass input data as a raw string
    --context / -c ..................... Context of the service
    --contextPath / -x ................. Path to JSON or YAML file holding context data
```

### DynamoDB Shell

[http://localhost:8000/shell](http://localhost:8000/shell)

### API Gateway Entrypoint

[http://localhost:5000](http://localhost:5000)

## API

### Lambda

- Returns `AWS.Lambda`
- Endpoint and other configs are set according to environment

### DynamoDB

- Returns `AWS.DynamoDB`
- Endpoint and other configs are set according to environment

## TODO

- Add CLI that installs Serverless framework and plugins for easier setup
- More test coverage

## License

MIT © [Hoishin (Keiichiro Amemiya)](https://github.com/Hoishin)
