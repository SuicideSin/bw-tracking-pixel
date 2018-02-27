import { Router } from 'express';
import * as ogs from 'open-graph-scraper';

import { onePixelTransparentGif } from '../static';
import { RequestMetadataModel } from '../models';

export const router = Router();

router.get('/', (req, res) => {
	// make sure the browser always requests the tracking pixel
	res.contentType('image/gif');
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	// immediately send the gif to the browser and close the HTTP session
	res.send(onePixelTransparentGif);

	// queue up storing tracking info
	let storeTrackingInfo = new Promise((resolve, reject) => {
		let referrer = req.header('referrer');

		// in development, accept any referrer and use a default referrer
		if (process.env.NODE_ENV === 'development') {
			if (!referrer) {
				referrer = 'https://raw.githubusercontent.com/samholmes/node-open-graph/master/test.html';
			}
		}
		else {
			if (!referrer) return reject(new Error('no referrer'));
			// we should be checking referrer against all of the domains we handle which should be fetched from some DB
			if (
				referrer != 'https://stores.example.com' &&
				!referrer.startsWith('https://stores.example.com/')
			) {
				return reject(new Error('incorrect referrer'));
			}
		}

		ogs({
			url: referrer
		}, (error, meta) => {
			if (error || typeof meta !== 'object') return reject(new Error('no metadata'));
			let requestMetadata = new RequestMetadataModel({
				opengraph: meta.data,
				fingerprint: (req as any).fingerprint,
			});
			return resolve(requestMetadata.save());
		})
	}).catch((error) => {
		// we should handle errors instead of outputting and ignoring them
		console.error(error);
	});
});
