import * as fs from "fs";

function isBab(bab: string) {
    return bab[0] == bab[2] && bab[0] != bab[1];
}

function hasCondition(abas: Set<string>, babs: Set<string>) {
    for (const aba of abas) {
        const bab: string = aba[1] + aba[0] + aba[1];
        if (babs.has(bab))
            return true;
    }
    return false;
}

function isSSLSupported(ip: string): boolean {
    let isOn: boolean = false;
    let abas = new Set<string>();
    let babs = new Set<string>();

    for (let i: number = 0; i < ip.length - 2; i++) {
        if (ip[i] == "[")
            isOn = true;
        if (ip[i] == "]")
            isOn = false;
        let triple: string = ip.slice(i, i + 3);
        if (isBab(triple)) {
            if (isOn)
                babs.add(triple);
            else
                abas.add(triple);
        }
    }

    return hasCondition(abas, babs);
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/7", "utf-8");
    const ips: string[] = data.trim().split("\n");

    // check if it supports TLS
    let result: number = 0;
    for (const ip of ips) {
        result += isSSLSupported(ip) ? 1 : 0;
    }

    // print result
    console.log(result); 
}

main();
