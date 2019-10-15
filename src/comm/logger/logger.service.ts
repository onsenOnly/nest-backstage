import { configure, getLogger } from 'log4js';
import { Logger } from 'log4js';
import { logDir } from '../../log_file/logDir';
// console.info(__dirname + '\\files');

// configure(__dirname + '\\files');

configure({
    appenders: {
        out: { type: 'console' },
        cheese: { type: 'dateFile', filename: logDir + '\\files\\cheese', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        cat: { type: 'dateFile', filename: logDir + '\\files\\cat', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        user: { type: 'dateFile', filename: logDir + '\\files\\user', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        permission: { type: 'dateFile', filename: logDir + '\\files\\permission', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        tag: { type: 'dateFile', filename: logDir + '\\files\\tag', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        banner: { type: 'dateFile', filename: logDir + '\\files\\banner', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        upload: { type: 'dateFile', filename: logDir + '\\files\\upload', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        route: { type: 'dateFile', filename: logDir + '\\files\\route', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        post: { type: 'dateFile', filename: logDir + '\\files\\post', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        consumer: { type: 'dateFile', filename: logDir + '\\files\\consumer', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        setting: { type: 'dateFile', filename: logDir + '\\files\\setting', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        comment: { type: 'dateFile', filename: logDir + '\\files\\comment', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        result: { type: 'dateFile', filename: logDir + '\\files\\result', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        app: { type: 'dateFile', filename: logDir + '\\files\\app', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        file: { type: 'dateFile', filename: logDir + '\\files\\file', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
        all_exception: { type: 'dateFile', filename: logDir + '\\files\\all_exception', alwaysIncludePattern: true, pattern: 'yyyy-MM-dd.log' },
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        cheese: { appenders: ['out', 'cheese'], level: 'info' },
        cat: { appenders: ['out', 'cat'], level: 'info' },
        user: { appenders: ['out', 'user'], level: 'info' },
        permission: { appenders: ['out', 'permission'], level: 'info' },
        tag: { appenders: ['out', 'tag'], level: 'info' },
        banner: { appenders: ['out', 'banner'], level: 'info' },
        upload: { appenders: ['out', 'upload'], level: 'info' },
        route: { appenders: ['out', 'route'], level: 'info' },
        post: { appenders: ['out', 'post'], level: 'info' },
        consumer: { appenders: ['out', 'consumer'], level: 'info' },
        setting: { appenders: ['out', 'setting'], level: 'info' },
        comment: { appenders: ['out', 'comment'], level: 'info' },
        result: { appenders: ['out', 'result'], level: 'info' },
        app: { appenders: ['out', 'app'], level: 'info' },
        file: { appenders: ['out', 'file'], level: 'info' },
        all_exception: { appenders: ['out', 'all_exception'], level: 'info' },
    },
});

export const loggerProviders = [
    {
        provide: 'LOGGER_CHEESE',
        useFactory: (): Logger => {
            const logger = getLogger('cheese');
            return logger;
        },
    },
    {
        provide: 'LOGGER_CAT',
        useFactory: (): Logger => {
            const logger = getLogger('cat');
            return logger;
        },
    },
    {
        provide: 'LOGGER_EXCEPTION',
        useFactory: (): Logger => {
            const logger = getLogger('all_exception');
            return logger;
        },
    },
    {
        provide: 'LOGGER_USER',
        useFactory: (): Logger => {
            const logger = getLogger('user');
            return logger;
        },
    },
    {
        provide: 'LOGGER_PERMISSION',
        useFactory: (): Logger => {
            const logger = getLogger('permission');
            return logger;
        },
    },
    {
        provide: 'LOGGER_TAG',
        useFactory: (): Logger => {
            const logger = getLogger('tag');
            return logger;
        },
    },
    {
        provide: 'LOGGER_UPLOAD',
        useFactory: (): Logger => {
            const logger = getLogger('upload');
            return logger;
        },
    },
    {
        provide: 'LOGGER_ROUTE',
        useFactory: (): Logger => {
            const logger = getLogger('route');
            return logger;
        },

    },
    {
        provide: 'LOGGER_BANNER',
        useFactory: (): Logger => {
            const logger = getLogger('banner');
            return logger;
        },

    },
    {
        provide: 'LOGGER_POST',
        useFactory: (): Logger => {
            const logger = getLogger('post');
            return logger;
        },
    },
    {
        provide: 'LOGGER_CONSUMER',
        useFactory: (): Logger => {
            const logger = getLogger('consumer');
            return logger;
        },
    },
    {
        provide: 'LOGGER_SETTING',
        useFactory: (): Logger => {
            const logger = getLogger('setting');
            return logger;
        },
    },
    {
        provide: 'LOGGER_COMMENT',
        useFactory: (): Logger => {
            const logger = getLogger('comment');
            return logger;
        },
    },
    {
        provide: 'LOGGER_APP',
        useFactory: (): Logger => {
            const logger = getLogger('app');
            return logger;
        },
    },
    {
        provide: 'LOGGER_FILE',
        useFactory: (): Logger => {
            const logger = getLogger('app');
            return logger;
        },
    },
    {
        provide: 'LOGGER_RESULT',
        useFactory: (): Logger => {
            const logger = getLogger('result');
            return logger;
        },
    },
];
