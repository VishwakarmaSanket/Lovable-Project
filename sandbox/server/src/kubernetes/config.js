import * as K8saApi from "@kubernetes/client-node";

const kc = new K8saApi.KubeConfig();
kc.loadFromDefault();

export const k8sCoreV1Api = kc.makeApiClient(K8saApi.CoreV1Api);
