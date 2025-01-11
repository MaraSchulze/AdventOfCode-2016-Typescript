import * as fs from "fs";

function getFrequencies(room: string): Map<string, number> {
    let frequencies: Map<string, number> = new Map<string, number>();

    for (const char of room) {
        if (/[a-z, A-Z]/.test(char)) {
            frequencies.set(char, (frequencies.get(char) || 0) + 1);
        }
    }

    return frequencies;
}

function getSectorId(room: string): number {
    let sectorIdAsString: string = "";

    for (const char of room) {
        if (/[0-9]/.test(char)) {
            sectorIdAsString += char;
        }
    }

    return Number(sectorIdAsString);
}

function decrypt(roomName: string, sectorId: number) {
    let clearText: string = "";

    sectorId = sectorId % 26;

    for (const letter of roomName) {
        if (letter === "-")
            clearText += " ";
        else
            clearText += String.fromCharCode("a".charCodeAt(0) + ((letter.charCodeAt(0) - "a".charCodeAt(0) + sectorId) % 26));
    }

    return clearText;
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/4", "utf-8");
    const rooms: string[] = data.trim().split("\n");

    // iterate over rooms and sum up sector ids
    let result: number;

    for (const room of rooms) {
        // extract letters and sector ids
        const letters: Map<string, number> = getFrequencies(room);
        const sectorId: number = getSectorId(room);
        
        // print out decrypted room names
        if (decrypt(room.slice(0, room.lastIndexOf("-")), sectorId) === "northpole object storage")
            result = sectorId;
    }

    // print result
    console.log(result); 
}

main();
