document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const copyHashBtn = document.getElementById('copyHashBtn');
  const shaCode = document.getElementById('shaCode');
  const qrContainer = document.getElementById('qrContainer');
  const qrUrlLabel = document.getElementById('qrUrlLabel');

  // Determine current host and IP
  let downloadUrl = '';
  if (window.location.protocol.startsWith('http')) {
    downloadUrl = `${window.location.origin}/downloads/TenX-v1.0-release.apk`;
  } else {
    // If opened directly from file system, use detected Wi-Fi IP
    downloadUrl = `http://192.168.1.250:8088/downloads/TenX-v1.0-release.apk`;
  }

  // Update label
  if (qrUrlLabel) {
    qrUrlLabel.textContent = downloadUrl.replace(/^https?:\/\//, '');
  }

  // Render QR Code
  try {
    if (typeof QRCode !== 'undefined') {
      qrContainer.innerHTML = '';
      new QRCode(qrContainer, {
        text: downloadUrl,
        width: 88,
        height: 88,
        colorDark: '#070B12',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      // Fallback simple indicator
      qrContainer.innerHTML = `<svg width="60" height="60" viewBox="0 0 24 24" fill="#070B12"><path d="M4 4h6v6H4zm2 2v2h2V6zm8-2h6v6h-6zm2 2v2h2V6zM4 14h6v6H4zm2 2v2h2v-2zm10 0h2v2h-2zm-2-2h2v2h-2zm4 4h2v2h-2zm-2 2h2v2h-2zm2-4h2v2h-2z"/></svg>`;
    }
  } catch (e) {
    console.error('QR code generation error:', e);
  }

  // Copy Link action
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(downloadUrl);
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<span>Link Copied!</span>';
        copyLinkBtn.style.borderColor = '#10B981';
        copyLinkBtn.style.color = '#10B981';
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
          copyLinkBtn.style.borderColor = '';
          copyLinkBtn.style.color = '';
        }, 2200);
      } catch (err) {
        prompt('Download URL:', downloadUrl);
      }
    });
  }

  // Copy Hash action
  if (copyHashBtn && shaCode) {
    copyHashBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shaCode.innerText.trim());
        const originalText = copyHashBtn.innerText;
        copyHashBtn.innerText = 'Copied!';
        copyHashBtn.style.borderColor = '#10B981';
        copyHashBtn.style.color = '#10B981';
        setTimeout(() => {
          copyHashBtn.innerText = originalText;
          copyHashBtn.style.borderColor = '';
          copyHashBtn.style.color = '';
        }, 2200);
      } catch (err) {
        prompt('SHA-256 Hash:', shaCode.innerText.trim());
      }
    });
  }

  // Download button animation
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const span = downloadBtn.querySelector('span');
      if (span) {
        const original = span.textContent;
        span.textContent = 'Downloading APK...';
        setTimeout(() => {
          span.textContent = original;
        }, 4000);
      }
    });
  }
});
