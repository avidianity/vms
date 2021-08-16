import Manager from '@avidian/events';

export const PRODUCTION = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

export const DEVELOPMENT = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

export const TEST = process.env.NODE_ENV && process.env.NODE_ENV === 'test';

export const manager = new Manager();
