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

function main(): void {
    // extract input
    const data: string = fs.readFileSync("1", "utf-8");
    const directions: string[] = data.split(", ")

    // define directions
    const direction: coordinate[] = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    // declare set
    let path: Set<string> = new Set<string>();

    // iterate over directions
    let currentDirNr: number = 0;
    let place: coordinate = [0, 0];
    path.add(JSON.stringify([0, 0]));

    for (const dir of directions) {
        const turn: string = dir.slice(0, 1);
        const blocks: number = Number(dir.slice(1));
        currentDirNr = getNewDir(currentDirNr, turn);
        
        for (let i: number = 0; i < blocks; i++) {
            place = tupleAdd(place, direction[currentDirNr]);
            if (path.has(JSON.stringify(place))) {
                console.log(Math.abs(place[0]) + Math.abs(place[1]));
                return;
            }
            path.add(JSON.stringify(place));
        }
    }
}

main();
