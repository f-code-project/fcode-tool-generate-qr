export const encodeBase64 = (str: string): string => {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
};
export const decodeBase64 = (base64: string): string => {
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (char) => char.codePointAt(0)!);
  return new TextDecoder().decode(bytes);
};
export const generateQR = async (data: string): Promise<string> => {
  const response = await fetch(`https://api.qrcode-monkey.com/qr/custom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
      config: {
        body: "square",
        eye: "frame1",
        eyeBall: "ball14",
        erf1: ["fh"],
        erf2: [],
        erf3: ["fh", "fv"],
        brf1: [],
        brf2: [],
        brf3: [],
        bodyColor: "#000000",
        bgColor: "#FFFFFF",
        eye1Color: "#009D4F",
        eye2Color: "#009D4F",
        eye3Color: "#009D4F",
        eyeBall1Color: "#FCC714",
        eyeBall2Color: "#FCC714",
        eyeBall3Color: "#FCC714",
        gradientColor1: "#009D4F",
        gradientColor2: "#009D4F",
        gradientType: "linear",
        gradientOnEyes: false,
        logo: "98d0d71b6cdb8125f7848c412b2ad74329851266.png",
        logoMode: "clean",
      },
      size: 2000,
      download: "imageUrl",
      file: "png",
    }),
  });
  const result: { imageUrl: string } = await response.json();
  return result.imageUrl;
};

export const downloadQR = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const bytesWritten = await Bun.write(`qrcode/${filename}`, response);
    return bytesWritten;
  } catch (error) {
    console.error("Lỗi khi tải QR code:", error);
  }
};
