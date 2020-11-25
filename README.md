# Serverless Image Processing

Serverless image processing platform

***As of 10/30/2020, cloud provider is*** **AWS**

Built with the [Serverless Framework](https://www.serverless.com/)

# Running Locally

With the help of the [serverless-offline](https://www.serverless.com/plugins/serverless-offline) plugin, project can run locally

Benefits:

1. **Fast** - no need to hit cloud provider

2. **Free** - no need to hit cloud provider

    What more can you ask for? :)

## Procedure

0. Download the following:

- [Serverless Framework](https://www.serverless.com/open-source/)
- [serverless-offline](https://www.serverless.com/plugins/serverless-offline)
- [serverless-s3-local](https://www.serverless.com/plugins/serverless-s3-local)
- [wscat](https://www.npmjs.com/package/wscat)

0. Edit env.yml with the appropriate environment variable values

1. In a terminal, run the following in this directory (project root) to start the serverless services

    ```
    $ serverless offline [--printOutput]
    ```

2. In a new terminal tab/window, connect to the API Gateway service as a new client

    ```
    $ wscat -c ws://localhost:3001
    ```

    Change 3001 to the appropriate port number given in output of step 1


## Testing

1. In a terminal, run the following in this directory

    ```
    $ npm run test
    ```
