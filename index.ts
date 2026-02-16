import { encodeBase64 } from "./helper";
const file = Bun.file("data.txt");
const exportFile = Bun.file("export.txt");
const writer = exportFile.writer();
const data = await file.text();
for (let line of data.split("\n")) {
  const [studentCode, fullName] = line.trim().split("|");
  writer.write(`${fullName}|${encodeBase64(`${fullName}|${studentCode}`)}\n`);
}
writer.flush();
