import * as fs from "fs";

function rect(a: number, b: number, screen: boolean[][]): void {
    screen.slice(0, b).forEach((value1) => value1.slice(0, a).forEach((_, index2) => value1[index2] = true));
}

function rotateColumn(column: number, offset: number, screen: boolean[][]) {
    for (let times: number = 0; times < offset; times++) {
        const save: boolean = screen[screen.length - 1][column];
        for (let i: number = screen.length - 1; i > 0; i--) {
            screen[i][column] = screen[i - 1][column];
        }
        screen[0][column] = save;
    }
}

function rotateRow(row: number, offset: number, screen: boolean[][]) {
    for (let times: number = 0; times < offset; times++) {
        const save: boolean = screen[row][screen[0].length - 1];
        for (let i: number = screen[0].length - 1; i > 0; i--) {
            screen[row][i] = screen[row][i - 1];
        }
        screen[row][0] = save;
    }
}

function execute(instruction: string, screen: boolean[][]): void {
    let parameter1: number;
    let parameter2: number;

    // instruction is rect
    if (instruction.startsWith("rect")) {
        [parameter1, parameter2] = instruction.split(" ")[1].split("x").map((x) => Number(x));
        rect(parameter1, parameter2, screen);
    }
    // instruction is rotate row
    if (instruction.startsWith("rotate row")) {
        [parameter1, parameter2] = instruction.split("=")[1].split(" by ").map((x) => Number(x));
        rotateRow(parameter1, parameter2, screen);
    }
    // instruction is rotate column
    if (instruction.startsWith("rotate column")) {
        [parameter1, parameter2] = instruction.split("=")[1].split(" by ").map((x) => Number(x));
        rotateColumn(parameter1, parameter2, screen);
    }
}

function printScreen(screen: boolean[][]): void {
    for (const row of screen) {
        const rowAsString: string = row.map((x) => x === true ? "x" : " ").join("");
        console.log(rowAsString);
    }
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/8", "utf-8");
    const instructions: string[] = data.trim().split("\n");

    // execute instructions
    const screen: boolean[][] = Array.from ({length: 6}, () => new Array(50).fill(false));
    for (const instruction of instructions) {
        execute(instruction, screen);
    }

    // print result
    printScreen(screen);
}

main();
