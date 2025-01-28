import * as fs from "fs";
import { off } from "process";

function main(): void {
    // extract input
    const data: string = fs.readFileSync('../input/test13', 'utf-8');
    const favouriteNumber: number = Number(data);

    // create map
    const height: number = 5;
    const width: number = 8;
    const office: string[][] = Array.from({ length: height }, () => Array(width).fill('.'));
    createMap(office, favouriteNumber);
    console.log(office.length, office[0].length);

    // find minimum number of steps
    const result: number = findMinimum(office, 1, 1, 0);

    // print result
    console.log(result); 
}

function createMap(office: string[][], favouriteNumber: number): void {
    for (let x: number = 0; x < office.length; x++) {
        for (let y: number = 0; y < office[0].length; y++) {
            if (isWall(x, y, favouriteNumber))
                office[x][y] = '#';
        }
    }
}

function isWall(x: number, y: number, favouriteNumber: number): boolean {
    let num: number = x*x + 3*x + 2*x*y + y + y*y + favouriteNumber;
    let nrOneBits: number = 0;
    while (num !== 0)  {
        nrOneBits += num % 2 === 1 ? 1 : 0;
        num = num >>> 1;
    }
    return nrOneBits % 2 === 1 ? true : false;
}

function findMinimum(office: string[][], x: number, y: number, steps: number): number {
    
    let temporaryMinima: number[] = Array<number>();

    console.log(x, y, steps);

    if (x < 0 || x >= office.length || y < 0 || y >= office[0].length)
        return steps;
    console.log(x, y, steps, office[x][y]);
    if (x === 4 && y === 7)
        return steps;
    if (office[x][y] === '#')
        return steps;

    const save: string = office[x][y];
    office[x][y] = '#';
    temporaryMinima.push(findMinimum(office, x - 1, y, steps + 1));
    temporaryMinima.push(findMinimum(office, x + 1, y, steps + 1));
    temporaryMinima.push(findMinimum(office, x, y - 1, steps + 1));
    temporaryMinima.push(findMinimum(office, x, y + 1, steps + 1));
    office[x][y] = save;

    return Math.max(...temporaryMinima);
}

main();
