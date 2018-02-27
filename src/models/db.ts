import * as mongoose from 'mongoose';

mongoose.connect('mongodb://trackingdb/tracking-pixel').then(() => {
	console.log('successfully connected to mongodb');
}).catch((error) => {
	console.error(error, 'failed to connect to mongodb');
	process.exit(1);
});
