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
      ports: [{ name: "http", port: 8080, targetPort: 5173, protocol: "TCP" }],
      type: "ClusterIP",
    },
  };

  const response = await k8sCoreV1Api.createNamespacedService({
    namespace: "default",
    body: serviceManifest,
  });

  return response;
};
