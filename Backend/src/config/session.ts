import {PrismaSessionStore} from '@quixo3/prisma-session-store';
import session from 'express-session';
import {prisma} from './prisma.js';
import {env} from './env.js';
export const sessionMiddleware = session ({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 *60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
    name: "sid",
    secret: env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
      httpOnly: true,
      secure:  (env.SESSION_SECRET)? true : false,
      sameSite: "lax"
    }
  });