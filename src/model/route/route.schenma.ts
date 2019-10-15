import * as mongoose from 'mongoose';

export const RouteSchema = new mongoose.Schema({
    'id': String,
    'icon': String,
    'name': String,
    'route': String,
    'role': String,
    'zh': { name: String },
    'pt-br': { name: String },
});
