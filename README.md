# Capstone Microservices System

A multi-service microservices architecture featuring an isolated Sandbox execution engine, AI Orchestration, Authentication, and Notification services managed with Docker and Kubernetes.

---

## 📁 Repository Structure

```
├── ai-orchestration/    # AI agent orchestration service
├── auth/                # User authentication & identity management service
├── notification/        # Real-time and background notification service
├── k8s/                 # Kubernetes manifests (Deployments, Services, RBAC, Ingress)
│   ├── ingress.yml
│   ├── sandbox-deployment.yml
│   ├── sandbox-rbac.yml
│   └── sandbox-service.yml
├── sandbox/             # Dynamic code sandbox environment management
│   ├── server/          # Express.js backend for managing K8s sandbox pods
│   └── template/        # React 19 + Vite frontend sandbox template
├── .gitignore           # Git ignore configuration
└── README.md            # Project documentation
```

---

## 🚀 Services Overview

### 1. **Sandbox Service (`/sandbox`)**
* **Backend (`sandbox/server`):** Built with **Node.js, Express, Mongoose, and `@kubernetes/client-node`**. It dynamically manages isolated container environments in Kubernetes.
* **Template (`sandbox/template`):** Built with **React 19, Vite, and ESLint**. Serves as the boilerplate template injected into sandbox environments.

### 2. **Kubernetes Configuration (`/k8s`)**
Contains production-ready K8s manifests:
* `sandbox-deployment.yml`: Deployment manifest for the main sandbox container with resource limits and readiness/liveness health probes.
* `sandbox-rbac.yml`: ServiceAccount (`sandbox-sa`) and RBAC permissions for the sandbox manager.
* `sandbox-service.yml`: Kubernetes Service exposing the sandbox API.
* `ingress.yml`: NGINX Ingress rules routing traffic across microservices.

### 3. **Microservices (In Progress)**
* `auth`: User authentication service.
* `ai-orchestration`: AI agent workflow execution service.
* `notification`: Push and email notification service.

---

## ⚙️ Getting Started

### Prerequisites
* **Node.js:** `v18+` or `v20+`
* **npm:** `v9+`
* **Docker:** Installed and running
* **Kubernetes:** `kubectl` with access to a cluster (Minikube / Kind / Docker Desktop)

---

### Local Setup & Running Services

#### Running the Sandbox Server
```bash
cd sandbox/server
npm install
npm run dev
```
The server will start on port `3000` (or `process.env.PORT`).

#### Running the Sandbox React Template
```bash
cd sandbox/template
npm install
npm run dev
```
The frontend dev server will launch via Vite.

---

## 🐳 Kubernetes Deployment

To deploy the Sandbox service to your local Kubernetes cluster:

1. **Apply ServiceAccount & RBAC:**
   ```bash
   kubectl apply -f k8s/sandbox-rbac.yml
   ```

2. **Deploy the Sandbox Service & Deployment:**
   ```bash
   kubectl apply -f k8s/sandbox-deployment.yml
   kubectl apply -f k8s/sandbox-service.yml
   ```

3. **Apply Ingress Configuration:**
   ```bash
   kubectl apply -f k8s/ingress.yml
   ```

4. **Verify Deployment:**
   ```bash
   kubectl get pods -l app=sandbox
   ```

---

## 📝 License
ISC
