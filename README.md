# SOFT355 - GetIt Done
## Description

## Installation
To run the application use the following commands, assuming that [Node.js is installed](https://nodejs.org/en/download/):


```
npm install
node server
```

Once the dependencies have installed the server has started, navigate to:
http://localhost:9000/

## Mocha Tests
If you wish to run the unit tests that are included in the build run:

```
mocha test --exit
```

## Build Server
A build server was once alive at:
soft355-jenkins.uksouth.cloudapp.azure.com

Use the following command to SSH into the server:
```
ssh -L 127.0.0.1:8080:localhost:8080 danthick@soft355-jenkins.uksouth.cloudapp.azure.com
```