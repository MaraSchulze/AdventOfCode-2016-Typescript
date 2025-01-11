import * as fs from "fs";
import { createHash, Hash } from "crypto";

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/5", "utf-8");
    let doorId: string = data.slice(0, -1);

    // compute password
    let password: string = "";
    
    for (let i: number = 0; password.length != 8; i++) {
        const hash: Hash = createHash("md5");
        hash.update(doorId + String(i));
        const current: string = hash.digest("hex");
        if (current.startsWith("00000")) {
            password += current[5];
        }
    }

    // print result
    const result: string = password;
    console.log(result); 
}

main();
