import { downloadQR, encodeBase64, generateQR } from "./helper";
const fileReader = Bun.file("data.txt");
const data = (await fileReader.text()).split("\n");

const fileExporter = Bun.file("export.txt");

const writer = fileExporter.writer();

// current api
const promiseUrls: Promise<string>[] = [];
for (let line of data) {
  const [studentCode, fullName] = line.trim().split("|");
  const token = encodeBase64(`${fullName}|${studentCode}`);
  const callAPIGenerate = generateQR(token);
  promiseUrls.push(Promise.resolve(callAPIGenerate));
  //   const byteWriten = await downloadQR(
  //     `https:${data}`,
  //     `[${studentCode}] - ${fullName}.png`,
  //   );
  //   console.log(`${fullName} - ${studentCode} - ${byteWriten} bytes written`);
  writer.write(`${fullName}|${token}\n`);
}
const urls = await Promise.all(promiseUrls);
for (let i = 0; i < urls.length; i++) {
  const [studentCode, fullName] = data[i]!.trim().split("|");
  const byteWriten = await downloadQR(
    `https:${urls[i]!}`,
    `[${studentCode}] - ${fullName}.png`,
  );
  console.log(`${fullName} - ${studentCode} - ${byteWriten} bytes written`);
}
writer.flush();
