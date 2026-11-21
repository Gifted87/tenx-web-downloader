import os
import shutil
import hashlib
import socket
import re
import urllib.request

src_apk = r"c:\Users\hp\Documents\Web-Projects\Alert-App\build\app\outputs\flutter-apk\app-release.apk"
web_dir = r"c:\Users\hp\Documents\Web-Projects\tenx-web-downloader"
downloads_dir = os.path.join(web_dir, "downloads")

dest_pkg = os.path.join(downloads_dir, "TenX-v1.0-release.apk")
dest_generic = os.path.join(downloads_dir, "app-release.apk")
dest_root = os.path.join(web_dir, "app-release.apk")

print(f"Checking source APK: {src_apk}")
if not os.path.exists(src_apk):
    raise FileNotFoundError(f"Source APK not found at {src_apk}")

size_bytes = os.path.getsize(src_apk)
size_mb = round(size_bytes / (1024 * 1024), 1)

with open(src_apk, "rb") as f:
    sha256_hash = hashlib.sha256(f.read()).hexdigest().upper()

print(f"File Size: {size_bytes} bytes ({size_mb} MB)")
print(f"SHA-256 Hash: {sha256_hash}")

# Copy to targets
os.makedirs(downloads_dir, exist_ok=True)
shutil.copy2(src_apk, dest_pkg)
print(f"Copied to -> {dest_pkg}")
shutil.copy2(src_apk, dest_generic)
print(f"Copied to -> {dest_generic}")
shutil.copy2(src_apk, dest_root)
print(f"Copied to -> {dest_root}")

# Determine local IP (Wi-Fi)
local_ip = "127.0.0.1"
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    local_ip = s.getsockname()[0]
    s.close()
except Exception as e:
    print(f"Could not determine LAN IP: {e}")

print(f"Detected Local IP: {local_ip}")

# Update index.html
index_path = os.path.join(web_dir, "index.html")
if os.path.exists(index_path):
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Update size in spec-val
    html = re.sub(
        r'(<span class="spec-label">File Size</span>\s*<span class="spec-val">)[^<]+(</span>)',
        rf'\g<1>{size_mb} MB\g<2>',
        html
    )

    # Update shaCode
    html = re.sub(
        r'(<div class="hash-code" id="shaCode">)[^<]+(</div>)',
        rf'\g<1>{sha256_hash}\g<2>',
        html
    )

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Updated {index_path} with new size and hash.")

# Update app.js
appjs_path = os.path.join(web_dir, "app.js")
if os.path.exists(appjs_path):
    with open(appjs_path, "r", encoding="utf-8") as f:
        js = f.read()

    # Update fallback IP
    js = re.sub(
        r'downloadUrl = `http://[^:]+:8088/downloads/TenX-v1\.0-release\.apk`;',
        f'downloadUrl = `http://{local_ip}:8088/downloads/TenX-v1.0-release.apk`;',
        js
    )

    with open(appjs_path, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"Updated {appjs_path} with Wi-Fi IP http://{local_ip}:8088")

print("\nDeployment completed successfully!")
