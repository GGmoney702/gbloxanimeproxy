import express, { Express } from 'express';
import compression from 'compression';
import helmet from "helmet";
import { SERVER, ROUTES } from './config/constants.js';
import { corsMiddleware, errorHandler, requestLogger } from './middleware.js';
import proxyRoutes from './proxy-routes.js';

const app: Express = express();

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(corsMiddleware);
app.use(requestLogger);

app.use(ROUTES.PROXY_BASE, proxyRoutes);

// ...rest unchanged

export default app;
