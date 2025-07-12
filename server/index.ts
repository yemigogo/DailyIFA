import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { spawn } from "child_process";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enhanced Dashboard message and redirect
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Enhanced Yoruba Calendar Dashboard</title>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #8B4513, #DAA520); color: white; text-align: center; padding: 50px; }
        .container { max-width: 600px; margin: 0 auto; }
        .btn { background: #FFD700; color: #8B4513; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 10px; }
        .btn:hover { background: #FFA500; }
        .feature { background: rgba(255,255,255,0.1); padding: 20px; margin: 20px 0; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Enhanced Yoruba Calendar Dashboard</h1>
        <p>Your complete spiritual practice platform with 7 advanced features:</p>
        
        <div class="feature">
          <h3>🌙 Real Moon Phase Calculations</h3>
          <h3>📝 Personal Ritual Tracking</h3>
          <h3>📧 Email Notifications</h3>
          <h3>📱 Social Media Sharing</h3>
          <h3>🔔 Push Notifications</h3>
          <h3>⚙️ Admin Dashboard</h3>
          <h3>📅 Important Spiritual Dates</h3>
        </div>
        
        <p><strong>Demo Accounts:</strong></p>
        <p>Admin: admin / admin123</p>
        <p>User: spiritual_seeker / test123</p>
        
        <a href="http://localhost:8080" class="btn">Access Enhanced Dashboard</a>
        <a href="http://localhost:8080/login" class="btn">Login</a>
        
        <p style="margin-top: 30px; font-size: 14px;">
          The Enhanced Dashboard runs on port 8080 with all your requested features.<br>
          Click the button above to access the full application.
        </p>
      </div>
    </body>
    </html>
  `);
});

// Serve audio files statically
app.use('/audio', express.static(path.join(process.cwd(), 'client/public/audio')));
// Serve static files (Odu cards, etc.) - this must come first
app.use('/static', express.static(path.join(process.cwd(), 'static'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
