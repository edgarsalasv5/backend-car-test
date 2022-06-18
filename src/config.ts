import * as Joi from 'joi';

enum EnumEnvironment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export interface IConfig {
  NODE_ENV: EnumEnvironment;
  PORT: number;
  DB_HOST: string;
  DB_PORT: number | number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  JWT_SECRET: string;
}

export const validationConfigSchema = Joi.object<IConfig>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

export const getConfig = (): IConfig => {
  const config: IConfig = {
    NODE_ENV: process.env.NODE_ENV as EnumEnvironment,
    PORT: +process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: +process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
  };

  return config;
};
