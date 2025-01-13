import * as fs from "fs";

function getFrequencies(room: string): Map<string, number> {
    let frequencies: Map<string, number> = new Map<string, number>();

    for (const char of room) {
        if (/[a-z]/.test(char)) {
            frequencies.set(char, (frequencies.get(char) || 0) + 1);
        }
    }

    return frequencies;
}

function getSectorId(room: string): number {
    let sectorIdAsString: string = "";

    for (const char of room) {
        if (/\d/.test(char)) {
            sectorIdAsString += char;
        }
    }

    return Number(sectorIdAsString);
}

function getChecksum(room: string): string {
    return room.slice(-6, -1);
}

function isRealRoom(letters: Map<string, number>, checksum: string): boolean {
    const entriesArray = Array.from(letters.entries());
    let firstFiveLetters: string;

    entriesArray.sort((a, b) => a[1] !== b[1] ? b[1] - a[1] : a[0].charCodeAt(0) - b[0].charCodeAt(0));
    firstFiveLetters = entriesArray.slice(0, 5).map((x) => x[0]).join("");

    return checksum === firstFiveLetters;
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/4", "utf-8");
    const rooms: string[] = data.trim().split("\n");

    // iterate over rooms and sum up sector ids
    let result: number = 0;

    for (const room of rooms) {
        // extract letters, sector ids and checksum
        const letters: Map<string, number> = getFrequencies(room);
        const sectorId: number = getSectorId(room);
        const checksum: string = getChecksum(room);
        
        // check if it is a real room
        result += isRealRoom(letters, checksum) ? sectorId : 0;
    }

    // print result
    console.log(result); 
}

main();
