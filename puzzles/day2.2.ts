import * as fs from "fs";

// type definition
type coordinate = [number, number];
type directionKey = "U" | "L" | "D" | "R";

function tupleAdd(t1: coordinate, t2: coordinate): coordinate {
    return [t1[0] + t2[0], t1[1] + t2[1]];
}

function getKey(coord: coordinate) {
    const translation: number[] = [1, 3, 7, 11, 13];
    return translation[coord[0] + 2] + coord[1];
}

function isInBounds(coord: coordinate) {
    const keyRepresentation: number = getKey(coord);
    return keyRepresentation >= 1 && keyRepresentation <= 13 && Math.abs(coord[0]) + Math.abs(coord[1]) <= 2; 
}

function stringRepresentation(key: number) {
    if (key < 10)
        return String(key);
    else
        return String.fromCharCode("A".charCodeAt(0) + (key - 10));
}

function execute(keypress: string, current: coordinate): string {
    const directions: Record<directionKey, coordinate> = {U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1]};
    let newPosition: coordinate;

    for (const dir of keypress) {
        newPosition = tupleAdd(current, directions[dir as directionKey]);
        if (isInBounds(newPosition)) {
            current[0] = newPosition[0];
            current[1] = newPosition[1];
        }
    }
    return stringRepresentation(getKey(current));
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/2", "utf-8");
    const keypresses: string[] = data.trim().split("\n");

    // iterate over keypresses
    let result: string = "";
    let current: coordinate = [0, -2];

    for (const keypress of keypresses) {
        result += execute(keypress, current);
    }

    // print result
    console.log(result);
}

main();
