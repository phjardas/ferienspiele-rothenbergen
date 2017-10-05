import { Environment } from './model';
import { defaultEnvironment } from './default-environment';
export * from './model';

export const environment: Environment = { ...defaultEnvironment, production: true };
