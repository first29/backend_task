
export const config = {
  host: process.env.DB_HOST||"127.0.0.1",
  port: process.env.DB_PORT||"3306",
  user: process.env.DB_USER||"R",
  password: process.env.DB_PASSWORD||"***",
  database: process.env.DB_NAME||"r",
};
