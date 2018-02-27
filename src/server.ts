import 'babel-polyfill';
import express = require('express');
import Fingerprint, { parameter } from 'express-fingerprint';

import * as routes from './routes';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(Fingerprint());
app.use('/', routes.trackingPixelRouter);

const server = app.listen(app.get("port"), () => {
	let addr = server.address();
	if (/^ipv6$/i.test(addr.family)) {
		addr.address = '[' + addr.address + ']';
	}
	console.log('listening on http://%s:%d', addr.address, addr.port);
});

