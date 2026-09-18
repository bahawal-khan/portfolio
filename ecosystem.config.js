const path = require("path");

module.exports = {
  apps: [
    {
      name: "khanova-portfolio",
      cwd: __dirname,
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      watch: false,
    },
    {
      name: "khanova-backend",
      cwd: path.join(__dirname, "backend"),
      // Not a JS file — tell PM2 to exec it directly instead of running it
      // through the node interpreter.
      interpreter: "none",
      script: ".venv/bin/uvicorn",
      args: "app.main:app --host 127.0.0.1 --port 8001",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      watch: false,
    },
  ],
};
