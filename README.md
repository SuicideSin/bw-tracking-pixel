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

To run in Docker ("production")

```
docker build -t systemdisc/bw-tracking-pixel https://github.com/SystemDisc/bw-tracking-pixel.git
docker run -p 3000:3000 --add-host='trackingdb:127.0.0.1' -d systemdisc/bw-tracking-pixel
```

To run in Docker ("development")

```
docker build -t systemdisc/bw-tracking-pixel https://github.com/SystemDisc/bw-tracking-pixel.git
docker run -p 3000:3000 --add-host='trackingdb:127.0.0.1' -d -e NODE_ENV='development' systemdisc/bw-tracking-pixel
```

Change `127.0.0.1` in `--add-hosts` to the IP of the MongoDB server
