import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import session from "cookie-session";
import cors from "cors";
import express from "express";
import helmet from "helmet";

// import router from "./src/routes/index.js";
import {
  InternalServerError,
  NotFound,
  OK,
} from "./src/utils/response.util.js";
import { CONSTANTS } from "./src/config/constants.js";

// Initialize Express app
const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
      },
    },
  })
);

// CORS configuration
const corsOptions = {
  origin: CONSTANTS.ALLOWED_ORIGINS,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie and session middleware
// app.use(cookieParser(CONSTANTS.COOKIE_SECRET));
// app.use(
//   session({
//     name: "session",
//     secret: CONSTANTS.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: CONSTANTS.NODE_ENV === "production",
//       httpOnly: true,
//       sameSite: "strict",
//       maxAge: 30 * 60 * 1000, // 30 minutes
//     },
//   })
// );

// Health check endpoint
app.get("/api/v1/health", (_req, res) => {
  OK(res, {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
// app.use("/api/v1", router);

// 404 handler
app.use((_req, res) => {
  NotFound(res, "The requested resource was not found on the server");
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  InternalServerError(res, err);
});

export default app;
