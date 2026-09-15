import { k8sCoreV1Api } from "./config.js";

export async function createPod(sandboxID) {
  const podManifest = {
    metadata: {
      name: `sandbox-pod-${sandboxID}`,
      labels: {
        app: "sandbox",
        sandboxID: sandboxID,
      },
    },
    spec: {
      containers: [
        {
          image: "template",
          imagePullPolicy: "IfNotPresent",
          name: `sandbox-container`,
          ports: [{ containerPort: 5173, name: "http" }],
          resources: {
            limits: { cpu: "500m", memory: "1Gi" },
            requests: { cpu: "250m", memory: "512Mi" },
          },
        },
      ],
    },
  };

  const response = await k8sCoreV1Api.createNamespacedPod({
    namespace: "default",
    body: podManifest,
  });
  return response;
}
