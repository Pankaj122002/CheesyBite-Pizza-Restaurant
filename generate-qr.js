const QRCode = require('qrcode');
const path = require('path');

const url = 'https://cheesybitepizza.netlify.app/menu';
const outputPath = path.join(__dirname, 'src', 'assets', 'images', 'menu-qr.png');

QRCode.toFile(outputPath, url, {
  color: {
    dark: '#000000',
    light: '#ffffff'
  },
  width: 500,
  margin: 2
}, function (err) {
  if (err) throw err;
  console.log('QR code generated successfully at', outputPath);
});
