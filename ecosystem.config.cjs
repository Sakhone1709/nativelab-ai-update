module.exports = {
  apps: [
    {
      name: "nativelab-ai",
      cwd: "/home/admin/web/nativelab.ai/public_html/nativelab-ai",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 20090",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "20090",
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
