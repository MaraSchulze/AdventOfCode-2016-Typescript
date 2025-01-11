import * as fs from "fs";

// type alias
type coordinate = [number, number];

function getNewDir(currentDirNr: number, turn: string) {
    if (turn == "L")
        return (((currentDirNr - 1) % 4) + 4) % 4;
    else
        return (((currentDirNr + 1) % 4) + 4) % 4;
}

function tupleAdd(t1: coordinate, t2: coordinate): coordinate {
    return [t1[0] + t2[0], t1[1] + t2[1]];
}

function tupleMult(factor: number, t: coordinate): coordinate {
    return [factor * t[0], factor * t[1]];
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("1", "utf-8");
    const directions: string[] = data.split(", ")

    // define coordinate type and directions
    const direction: coordinate[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    // iterate over directions
    let currentDirNr: number = 0;
    let place: coordinate = [0, 0];
    for (const dir of directions) {
        const turn: string = dir.slice(0, 1);
        const blocks: number = Number(dir.slice(1));
        currentDirNr = getNewDir(currentDirNr, turn);
        place = tupleAdd(place, tupleMult(blocks, direction[currentDirNr]));
    }

    // print result
    const result: number = Math.abs(place[0]) + Math.abs(place[1]);
    console.log(result); 
}

main();
