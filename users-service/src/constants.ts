import * as path from 'path';

export const DB_PATH = process.env.DB_PATH || path.resolve('.', 'database.sqlite');
export const PORT = process.env.PORT || 3000;
