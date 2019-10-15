import * as mongoose from 'mongoose';

const EnumRoleType = {
    ADMIN: 'admin',
    DEFAULT: 'guest',
    DEVELOPER: 'developer',
};

export const PermissionSchema = new mongoose.Schema({
    visit: Array,
    role: String,
});
