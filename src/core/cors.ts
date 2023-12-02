import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import {
  ConfigServiceWithEnv,
  Environment,
} from 'src/config/environment.schema';

export const getCors = (config: ConfigServiceWithEnv): CorsOptions => {
  const isProduction = config.get<Environment>('NODE_ENV') === 'production';

  return {
    origin: isProduction ? 'https://www.expitch.com' : '*',
  };
};
