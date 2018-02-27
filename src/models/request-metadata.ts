import * as mongoose from 'mongoose';

const requestMetadataSchema = new mongoose.Schema({}, { strict: false });
export const RequestMetadataModel = mongoose.model('RequestMetadata', requestMetadataSchema);
