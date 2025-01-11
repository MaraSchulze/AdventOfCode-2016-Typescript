import * as fs from "fs";
import { createHash, Hash } from "crypto";

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/5", "utf-8");
    let doorId: string = data.slice(0, -1);

    // compute password
    let password: string[] = Array.from("zzzzzzzz");
    
    for (let i: number = 0; password.some((x) => x === ("z" as string)); i++) {
        const hash: Hash = createHash("md5");
        hash.update(doorId + String(i));
        const current: string = hash.digest("hex");
        if (current.startsWith("00000") && Number(current[5]) >= 0 && Number(current[5]) <= 7 && password[Number(current[5])] === "z") {
            password[Number(current[5])] = current[6];
        }
    }

    // print result
    const result: string = password.join("");
    console.log(result); 
}

main();
