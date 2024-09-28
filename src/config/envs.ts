import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation Error: ${error.message}`);
}

const envVars: EnvVars = value;

// console.log({ envVars });
export const envs = {
  port: envVars.PORT,
  productsMsHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsMsPort: envVars.PRODUCTS_MICROSERVICE_PORT,
  ordersMsHost: envVars.ORDERS_MICROSERVICE_HOST,
  ordersMsPort: envVars.ORDERS_MICROSERVICE_PORT,
};
