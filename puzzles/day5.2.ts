import * as fs from "fs";
import { createHash, Hash } from "crypto";

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/5", "utf-8");
    let doorId: string = data.slice(0, -1);

    // compute password
    let password: string[] = Array(8);
    let seen: Set<number> = new Set<number>();

    for (let i: number = 0; seen.size !== 8; i++) {
        const hash: Hash = createHash("md5");
        hash.update(doorId + String(i));
        const current: string = hash.digest("hex");
        const fifthChar: string = current[5];
        if (current.startsWith("00000") && Number(fifthChar) >= 0 && Number(fifthChar) <= 7 && !seen.has(Number(fifthChar))) {
            password[Number(fifthChar)] = current[6];
            seen.add(Number(fifthChar));
        }
    }

    // print result
    const result: string = password.join("");
    console.log(result); 
}

main();
