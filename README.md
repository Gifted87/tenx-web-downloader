<div align="center">

# TenX Web Downloader & Distribution Platform

**High-speed, responsive web media downloader, distribution hub, and companion mobile application.**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 & CSS3](https://img.shields.io/badge/HTML5%20%2F%20CSS3-Glassmorphism-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![Python Deployment](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Android APK](https://img.shields.io/badge/Platform-Android%208.0+-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://android.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Executive Overview

**TenX Web Downloader** is a streamlined, cyber-inspired distribution and media acquisition platform designed for high-throughput mobile app delivery and direct artifact downloads. Built with a high-fidelity glassmorphism aesthetic and dark-mode aurora gradients, the platform provides seamless cross-device synchronization between desktop browsers and mobile environments.

With native support for dynamic QR code generation, cryptographic SHA-256 integrity verification, instant clipboard bridges, and automated LAN IP resolution, TenX delivers zero-friction sideloading and web media access.

---

## 🚀 Key Features

- **⚡ Direct Artifact & Media Extraction**: Streamlined direct binary and media downloading with real-time UI state transitions and click animations.
- **📱 Dynamic LAN/WAN QR Generation**: Automatically computes current origin or detected local network IP (`http://<LAN_IP>:8088/downloads/...`) and renders high-density scannable QR codes for zero-friction mobile camera scanning.
- **🛡️ Cryptographic Integrity (SHA-256)**: Real-time verification card displaying build hashes with one-click clipboard copying to guarantee zero binary tampering.
- **🎨 Aurora Cyberpunk Glassmorphism**: Designed with modern CSS custom properties, backdrop filters, responsive typography (`Inter` and `JetBrains Mono`), and reactive card elevation.
- **🔄 Automated Deployment Pipeline (`deploy_to_website.py`)**: One-command build deployment that computes binary sizes, calculates SHA-256 checksums, auto-detects Wi-Fi / Ethernet LAN IP addresses, and injects updated metadata directly into `index.html` and `app.js`.
- **📱 Companion Android Application**: Built for high-performance market surveillance and execution, packaged with release R8 optimizations targeting Android 8.0+.

---

## 🏗️ Architecture & Directory Structure

```plaintext
tenx-web-downloader/
├── assets/
│   ├── tenx_logo.png            # High-resolution vector/raster branded iconography
│   ├── chart-preview.png        # Live Candlestick terminal screenshot
│   ├── tools-preview.png        # Analytical market tools showcase
│   └── agents-preview.png       # Multi-Agent AI architecture visual
├── downloads/                   # Download distribution directory (.gitignored)
│   ├── TenX-v1.0-release.apk    # Versioned production APK binary
│   └── app-release.apk          # Standardized distribution endpoint
├── index.html                   # Core responsive web portal and showcase UI
├── app.js                       # Dynamic QR generator, clipboard controller & UX
├── style.css                    # Design system, glassmorphism & aurora animations
├── deploy_to_website.py         # Automated metadata injector & LAN IP detector
├── .gitignore                   # Ignores large binaries (>50MB), caches, and logs
└── README.md                    # Platform documentation and deployment guide
```

---

## 🛠️ Quickstart & Local Setup

### 1. Running the Web Platform Locally

You can launch the web interface locally using any standard static file server:

#### Option A: Python HTTP Server (Recommended)
```bash
# Navigate to the project root
cd tenx-web-downloader

# Start server on port 8088
python -m http.server 8088
```
Open your browser at: `http://localhost:8088`

#### Option B: Node.js `npx serve`
```bash
npx serve -l 8088 .
```

---

### 2. Automated Pipeline (`deploy_to_website.py`)

When updating the Android APK or media artifact, run the automated deployment script to calculate checksums, parse binary sizes, identify local network IP addresses, and update the web UI:

```bash
python deploy_to_website.py
```

**Script Operations:**
1. Verifies source binary existence and retrieves file size in bytes/megabytes.
2. Computes the cryptographic `SHA-256` uppercase hex string.
3. Automatically copies artifacts to `downloads/TenX-v1.0-release.apk` and `downloads/app-release.apk`.
4. Discovers active local Wi-Fi / Ethernet IP address via UDP socket probe.
5. Injects file size and hash checksum into `index.html`.
6. Configures dynamic fallback download URL inside `app.js`.

---

### 3. Installing the Companion Android APK

1. **Scan via Camera**: Point your Android device camera at the generated QR code on the web portal.
2. **Direct Browser Download**: Alternatively, click **Download TenX APK** to initiate the direct HTTP download.
3. **Verify Integrity**:
   - On Windows:
     ```powershell
     Get-FileHash -Algorithm SHA256 .\downloads\TenX-v1.0-release.apk
     ```
   - On Linux / macOS:
     ```bash
     sha256sum downloads/TenX-v1.0-release.apk
     ```
   Compare output against the hash displayed in the portal.
4. **Sideload**: Enable *"Install unknown apps"* in Android Settings if prompted, and complete the installation.

---

## 🌐 Production Web Deployment

### Deploying to Cloud Platforms (Vercel / Netlify / GitHub Pages)

- **Static Hosting**: The client web application contains zero runtime dependencies and can be hosted on GitHub Pages, Cloudflare Pages, Vercel, AWS S3, or Nginx.
- **Large Binary Hosting**: For APKs exceeding 50-100MB, consider hosting binaries on GitHub Releases, Cloudflare R2, or AWS S3, and updating the download URL in `index.html`.

#### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name download.tenx.internal;

    root /var/www/tenx-web-downloader;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /downloads/ {
        autoindex off;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

---

## 🔐 Security & Best Practices

- **Integrity Validation**: Always check SHA-256 hashes against trusted release tags.
- **HTTPS Enforcement**: Always deploy with TLS/SSL in public production to prevent Man-in-the-Middle (MITM) attacks during APK transmission.
- **Binary Hygiene**: Binaries exceeding 50MB are maintained in `.gitignore` to comply with Git repository best practices and ensure lightning-fast clone times.

---

## 🤝 Contributing

Contributions and enhancements are welcome!
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/enhancement`)
3. Commit your changes (`git commit -m 'feat: add enhanced progress tracker'`)
4. Push to the branch (`git push origin feature/enhancement`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
TenX Terminal &copy; 2026. All rights reserved.
