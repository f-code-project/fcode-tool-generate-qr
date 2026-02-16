import { downloadQR, encodeBase64, generateQR } from "./helper";
const file = Bun.file("data.txt");
const exportFile = Bun.file("export.txt");
const writer = exportFile.writer();
const data = await file.text();
for (let line of data.split("\n")) {
  const [studentCode, fullName] = line.trim().split("|");
  const token = encodeBase64(`${fullName}|${studentCode}`);
  const data = await generateQR(token);
  console.log(data);

  const byteWriten = await downloadQR(`https:${data}`, `${studentCode}.png`);

  console.log(`${fullName} - ${studentCode} - ${byteWriten} bytes written`);

  writer.write(`${fullName}|${token}|${data}\n`);
  break;
}
writer.flush();
