# bw-tracking-pixel

## Installation

```
npm install
```

And, map the host `trackingdb` to the IP of your MongoDB server

## Running

To run in "production" (this will only accept referrers starting with https://stores.example.com, though it should check for valid domains in some DB)

```
npm start
```

To run in "development" (this will accept any referrer and default to https://raw.githubusercontent.com/samholmes/node-open-graph/master/test.html)

```
NODE_ENV=development npm start
```
