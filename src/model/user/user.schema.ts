import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const hash = (password) => {
    const hashStr = bcrypt.hashSync(password, 10);
    return hashStr;
};

export const UserSchema = new mongoose.Schema({
    userName: String,
    password: { type: String, set: hash },
    permissions: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
    avatar: String,
    createTime: { type: Date, default: Date.now() },
    LastLoginTime: { type: Date },
});
