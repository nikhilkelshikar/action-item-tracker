# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


---

## 🛠 Project Technical Roadmap: kelshikar.com

This document outlines the architecture and configuration for the **Action Item Tracker** app and the **Landing Page** for `kelshikar.com`.

### 1. Project Structure & Storage

* **Local Directory:** [Your Custom Directory]
* **Firebase Project ID:** `action-item-tracker-86a77`
* **Hosting Strategy:** Multisite Hosting (One Firebase project, two distinct web targets).

---

### 2. DNS & Subdomain Configuration

The app is hosted at **`aiminder.kelshikar.com`**.

| Record Type | Host / Name | Value / Data | Purpose |
| --- | --- | --- | --- |
| **CNAME** | `aiminder` | `ghs.googlehosted.com` | Points subdomain to Firebase CDN |
| **TXT** | `aiminder` | `google-site-verification=...` | Verifies ownership (One-time setup) |
| **A** | `@` | *IPs provided by Firebase* | Points root domain to Landing Page |

---

### 3. Multisite Hosting Configuration

To manage both the landing page and the app, the `firebase.json` and local targets are configured as follows:

#### **A. Set Deployment Targets (Terminal)**

Run these commands in your Antigravity terminal to link your folders to the Firebase sites:

```bash
# Link the main app target
firebase target:apply hosting app action-item-tracker-86a77

# Link the landing page target
firebase target:apply hosting landing kelshikar-landing

```

#### **B. Firebase Configuration (`firebase.json`)**

```json
{
  "hosting": [
    {
      "target": "landing",
      "public": "dist-landing",
      "ignore": ["firebase.json", "**/.*"]
    },
    {
      "target": "app",
      "public": "dist-app",
      "ignore": ["firebase.json", "**/.*"]
    }
  ]
}

```

---

### 4. Deployment Workflow

Whenever you make changes in Antigravity, use the following command to push updates to both sites:

```bash
firebase deploy

```

* **App URL:** `https://aiminder.kelshikar.com`
* **Landing Page URL:** `https://kelshikar.com`

---

### 5. Troubleshooting & Maintenance

* **SSL Status:** If you see "Your connection is not private," wait for the **Minting certificate** status in Firebase to change to **Connected**.
* **Asset Paths:** Ensure your app does not use `<base href="/ai-minder/">` anymore, as it is now on its own subdomain.

---

**Now that the summary is updated, would you like me to generate a modern "Coming Soon" landing page for the root domain `kelshikar.com`?**