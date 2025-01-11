import * as fs from "fs";

function getColumn(transmission: string[], columnNumber: number) {
    let column: string[] = new Array<string>();

    for (const line of transmission) {
        column.push(line[columnNumber]);    
    }

    return column;
}

function mostFrequent(column: string[]) {
    let frequencies: Map<string, number> = new Map<string, number>();

    for (const letter of column) {
        frequencies.set(letter, (frequencies.get(letter) || 0) + 1);
    }
    const entriesArray = Array.from(frequencies.entries());
    entriesArray.sort((a, b) => b[1] - a[1]);

    return entriesArray[entriesArray.length - 1][0];
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/6", "utf-8");
    const transmission: string[] = data.trim().split("\n");

    // iterate over columns of transmission
    let result: string = "";

    for (let j: number = 0; j < transmission[0].length; j++) {
        const column: string[] = getColumn(transmission, j);
        result += mostFrequent(column);
    }

    // print result
    console.log(result); 
}

main();
