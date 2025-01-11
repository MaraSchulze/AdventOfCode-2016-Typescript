import * as fs from "fs";

// type definition
type coordinate = [number, number];

function tupleAdd(t1: coordinate, t2: coordinate): coordinate {
    return [t1[0] + t2[0], t1[1] + t2[1]];
}

function isInBounds(coord: coordinate) {
    return coord[0] >= -1 && coord[0] <= 1 && coord[1] >= -1 && coord[1] <= 1; 
}

function getKey(coord: coordinate) {
    return String(5 + 3 * coord[0] + coord[1]);
}

function execute(keypress: string, current: coordinate): string {
    const directions: {U: coordinate, D: coordinate, L: coordinate, R: coordinate} = {U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1]};
    let newPosition: coordinate;

    for (const dir of keypress) {
        newPosition = tupleAdd(current, directions[dir]);
        if (isInBounds(newPosition)) {
            current[0] = newPosition[0];
            current[1] = newPosition[1];
        }
    }
    return getKey(current);
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("2", "utf-8");
    const keypresses: string[] = data.split("\n");

    // iterate over keypresses
    let result: string = "";
    let current: coordinate = [0, 0];
    for (const keypress of keypresses) {
        result += execute(keypress, current);
    }

    // print result
    console.log(result);
}

main();
