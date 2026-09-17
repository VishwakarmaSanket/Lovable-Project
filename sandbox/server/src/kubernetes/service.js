import { k8sCoreV1Api } from "./config.js";

export const createService = async (sandboxID) => {
  const serviceManifest = {
    metadata: {
      name: `sandbox-service-${sandboxID}`,
      labels: {
        app: "sandbox",
        sandboxID: sandboxID,
      },
    },
    spec: {
      selector: {
        app: "sandbox",
        sandboxID: sandboxID,
      },
      ports: [
        { name: "http", port: 80, targetPort: 5173, protocol: "TCP" },
        { name: "agent-http", port: 3000, targetPort: 3000, protocol: "TCP" },
      ],
      type: "ClusterIP",
    },
  };

  const response = await k8sCoreV1Api.createNamespacedService({
    namespace: "default",
    body: serviceManifest,
  });

  return response;
};
