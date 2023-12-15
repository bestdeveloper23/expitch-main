import { ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

export type Environment = 'development' | 'staging' | 'production';

export interface EnvironmentVariables {
  NODE_ENV: Environment;
  PORT: number;
  BASE_URL: string;
  OPENAI_API_KEY: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_DATABASE: string;
  GCS_BUCKET: string;
  GCS_CLIENT_EMAIL: string;
  GCS_PRIVATE_KEY: string;
  RECAPTCHA_SECRET_KEY: string;
  STYTCH_PROJECT_ID: string;
  STYTCH_SECRET: string;
}

export type ConfigServiceWithEnv = ConfigService<EnvironmentVariables>;

export const environmentValidationSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .required(),
  PORT: Joi.number().required(),
  BASE_URL: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().required(),
  // DB_USERNAME: Joi.string().required(),
  // DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  GCS_BUCKET: Joi.string().required(),
  GCS_CLIENT_EMAIL: Joi.string().required(),
  GCS_PRIVATE_KEY: Joi.string().required(),
  RECAPTCHA_SECRET_KEY: Joi.string().required(),
  STYTCH_PROJECT_ID: Joi.string().required(),
  STYTCH_SECRET: Joi.string().required(),
});
