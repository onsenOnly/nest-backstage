import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Logger } from 'log4js';
import * as uuid from 'uuid';

const concatByMethod = (req, reqData) => {
    switch (req.method) {
        case 'GET':
        case 'PUT':
            reqData.params = req.params;
            break;
        case 'POST':
        case 'DELETE':
            reqData.params = req.body;
            break;
    }
};

const getClientIp = (req) => {
    let ipStr = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    // const ipReg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipStr.split(',').length > 0) {
        ipStr = ipStr.split(',')[0];
    }
    return ipStr;
};

@Injectable()
export class ReqLoggerMiddleware implements NestMiddleware {
    constructor(
        @Inject('LOGGER_CAT')
        private readonly catLogger: Logger,
        @Inject('LOGGER_USER')
        private readonly userLogger: Logger,
        @Inject('LOGGER_PERMISSION')
        private readonly permissionLogger: Logger,
        @Inject('LOGGER_TAG')
        private readonly tagLogger: Logger,
        @Inject('LOGGER_UPLOAD')
        private readonly uploadLogger: Logger,
        @Inject('LOGGER_ROUTE')
        private readonly bannerLogger: Logger,
        @Inject('LOGGER_BANNER')
        private readonly routeLogger: Logger,
        @Inject('LOGGER_POST')
        private readonly postLogger: Logger,
        @Inject('LOGGER_CONSUMER')
        private readonly consumerLogger: Logger,
        @Inject('LOGGER_SETTING')
        private readonly settingLogger: Logger,
        @Inject('LOGGER_COMMENT')
        private readonly commentLogger: Logger,
        @Inject('LOGGER_APP')
        private readonly appLogger: Logger,
        @Inject('LOGGER_FILE')
        private readonly fileLogger: Logger,
    ) { }
    use(req: any, res: any, next: () => void) {

        if (req && req.method) {
            const oneUuid = `${uuid.v4()}-${new Date().getTime()}`;
            req.tagUuid = oneUuid;
            const reqData = {
                url: req.url,
                method: req.method,
                ip: getClientIp(req),
                tagUuid: oneUuid,
            };
            concatByMethod(req, reqData);
            let branch = req.url.substring(1).split('/');
            if (branch[0] && branch[0].indexOf('?') > -1) {
                branch = branch[0].substring(0, branch[0].indexOf('?'));
            } else {
                branch = branch[0];
            }
            switch (branch) {
                case 'cats':
                    this.catLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'user':
                    this.userLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'permission':
                    this.permissionLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'tag':
                    this.tagLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'upload':
                    this.uploadLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'route':
                    this.routeLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'banner':
                    this.bannerLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'post':
                    this.postLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'consumer':
                    this.consumerLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'setting':
                    this.settingLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'comment':
                    this.commentLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'app':
                    this.appLogger.info('reqData:', JSON.stringify(reqData));
                    break;
                case 'file':
                    this.fileLogger.info('reqData:', JSON.stringify(reqData));
                    break;
            }
        }
        next();
    }
}
