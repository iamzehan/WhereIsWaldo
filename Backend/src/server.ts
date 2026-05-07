import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

app.listen(env.PORT, () => {
  logger.info(`🚀 Server running on port ${env.PORT} visit: http://localhost:3000`);
});