import QRCode from "qrcode";

export default async function generateQRCode(text) {
  const msg = String(text)

  return await QRCode.toDataURL(msg)
}