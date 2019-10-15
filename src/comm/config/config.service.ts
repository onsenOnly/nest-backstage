import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { envDir } from '../../env/dirname.env';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        if (filePath === undefined) {
            filePath = '\\develop.env';
        }
        const config = dotenv.parse(fs.readFileSync(`${envDir + filePath}`));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * 确保设置所有需要的变量，并返回经过验证的JavaScript对象
     * including the applied default values.
     * 包括应用的默认值。
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['develop', 'production'])
                .default('develop'),
            PORT: Joi.number().default(3000),
            MONGO_URL: Joi.string(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get env(): string {
        return this.envConfig.NODE_ENV;
    }

    get port(): string {
        return this.envConfig.NODE_ENV;
    }

    get mongo_url(): string {
        return this.envConfig.MONGO_URL;
    }
}
