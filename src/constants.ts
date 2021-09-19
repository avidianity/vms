import Manager from '@avidian/events';

export const PRODUCTION = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

export const DEVELOPMENT = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

export const TEST = process.env.NODE_ENV && process.env.NODE_ENV === 'test';

export const EMULATED = process.env.REACT_APP_EMULATED === 'true';

export const manager = new Manager();
