import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(morgan("combined"));

app.get("/api/status/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/status/readyz", (req, res) => {
  res.status(200).json({ status: "ready" });
});

const proxies = {};
const agentProxies = {};

function getProxy(sandboxID) {
  const target = `http://sandbox-service-${sandboxID}`;

  if (!proxies[sandboxID]) {
    proxies[sandboxID] = createProxyMiddleware({
      target,
      changeOrigin: true,
      ws: true,
    });
  }

  return proxies[sandboxID];
}

function getAgentProxy(sandboxID) {
  const target = `http://sandbox-service-${sandboxID}:3000`;

  if (!agentProxies[sandboxID]) {
    agentProxies[sandboxID] = createProxyMiddleware({
      target,
      changeOrigin: true,
      ws: true,
    });
  }

  return agentProxies[sandboxID];
}

app.use((req, res, next) => {
  const host = req.get("host");

  /**
   * pod1.preview.localhost
   * pod1.agent.localhost
   */

  if (!host) {
    return res.status(400).json({ error: "Missing Host header" });
  }

  const sandboxID = host.split(".")[0];

  if (host.split(".")[1] === "preview") {
    return getProxy(sandboxID)(req, res, next);
  } else if (host.split(".")[1] === "agent") {
    return getAgentProxy(sandboxID)(req, res, next);
  }
});

export default app;
