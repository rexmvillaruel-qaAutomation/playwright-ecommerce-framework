import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const uiBaseUrl = process.env.UI_BASE_URL;

if (!uiBaseUrl) {
  throw new Error('UI_BASE_URL is not defined');
}

const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('API_BASE_URL is not defined');
}

export const config = {
  uiBaseUrl,
  apiBaseUrl,
};