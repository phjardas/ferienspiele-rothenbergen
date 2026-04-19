import { createWriteStream } from "node:fs";
import createWaiver from "./waiver";

const reg = {
  child: {
    firstName: "Testine",
    lastName: "Tester",
  },
};

async function main() {
  await new Promise((resolve, reject) => {
    const waiver = createWaiver(reg, "pdf");
    const out = createWriteStream("waiver.pdf");
    waiver.pipe(out).on("finish", resolve).on("error", reject);
    typeof waiver.end === "function" && waiver.end();
  });
}

main();
