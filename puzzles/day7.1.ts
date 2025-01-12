import * as fs from "fs";

function isAbba(abba: string) {
    return abba[0] == abba[3] && abba[1] == abba[2] && abba[0] != abba[1];
}

function isTLSSupported(ip: string): boolean {
    let condition: boolean = false;
    let isOn: boolean = false;

    for (let i: number = 0; i < ip.length - 3; i++) {
        if (ip[i] == "[")
            isOn = true;
        if (ip[i] == "]")
            isOn = false;
        if (isAbba(ip.slice(i, i + 4))) {
            if (isOn)
                return false;
            else
                condition = true;
        }
    }

    return condition;
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/7", "utf-8");
    const ips: string[] = data.trim().split("\n");

    // check if it supports TLS
    let result: number = 0;
    for (const ip of ips) {
        result += isTLSSupported(ip) ? 1 : 0;
    }

    // print result
    console.log(result); 
}

main();
