import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug(
    'Using .env.example file to supply config environment variables'
  );
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const MONGODB_URI = prod
  ? process.env['MONGODB_URI']
  : process.env['MONGODB_URI_LOCAL'];

export const ACCESS_TOKEN_SECRET = process.env['ACCESS_TOKEN_SECRET'] || '';

if (!ACCESS_TOKEN_SECRET) {
  logger.error(
    'No access token private key. Set ACCESS_TOKEN_SECRET environment variable.'
  );
  process.exit(1);
}

export const REFRESH_TOKEN_SECRET = process.env['REFRESH_TOKEN_SECRET'] || '';
if (!REFRESH_TOKEN_SECRET) {
  logger.error('No refresh token secret found in enviorment variable.');
  process.exit(1);
}

export const GOOGLE_OAUTH_CLIENT_ID =
  process.env['GOOGLE_OAUTH_CLIENT_ID'] || '';

if (!GOOGLE_OAUTH_CLIENT_ID) {
  logger.error('No google oauth client id found in environment variable');
}

export const GOOGLE_OAUTH_CLIENT_SECRET =
  process.env['GOOGLE_OAUTH_CLIENT_SECRET'] || '';

if (!GOOGLE_OAUTH_CLIENT_SECRET) {
  logger.error('NO Google oauth client secret in enviroment varible');
  process.exit(1);
}

export const GOOGLE_OAUTH_REDIRECT_URL =
  process.env['GOOGLE_OAUTH_REDIRECT_URL'] || '';

if (!GOOGLE_OAUTH_REDIRECT_URL) {
  logger.error('No Google oauth redirect url found in enviroment variable');
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    );
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    );
  }
  process.exit(1);
}
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
if (!CLOUDINARY_CLOUD_NAME) {
  logger.error('No cloudinary cloud name found in environment variable');
  process.exit(1);
}
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
if (!CLOUDINARY_API_KEY) {
  logger.error('No cloudinary api key found in environment variable');
  process.exit(1);
}

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
if (!CLOUDINARY_API_SECRET) {
  logger.error('No cloudinary api secret found in environment variable');
  process.exit(1);
}
