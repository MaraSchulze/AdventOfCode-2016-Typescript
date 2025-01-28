import * as fs from "fs";

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/test10", "utf-8");
    const instructions: string[] = data.trim().split("\n");

    // declare datastructures
    class Robot {
        private recipientHigh: string;
        private recipientLow: string;
        private values: string[];

        constructor(recipientHigh: string, recipientLow: string) {
            this.recipientHigh = recipientHigh;
            this.recipientLow = recipientLow;
        }

        private check() {
            return this.values.includes("2") && this.values.includes("5");
        }

        passValue(value: string): boolean {
            this.values.push(value);
            if (this.values.length == 1)
                return false;
            if (this.check() == true)
                return true;
            this.values.sort((a, b) => Number(a) - Number(b));
            if (this.recipientHigh.startsWith("output"))
            return this.recipientHigh.passValue(this.values[1]) || this.recipientLow.passValue(this.values[0]);
        }
    }

    let robots: Map<string, Robot> = new Map<string, Robot>();
    let inputs: Map<string, string> = new Map<string, string>();
    let outputs: Map<string, string> = new Map<string, string>();

    // parse data
    for (const instruction of instructions) {
        parse(instruction);
    }

    // begin passing of chips
    for (const entry in inputs.entries()) {
        let [robot, value] = entry;
        if (!robots[robot].passValue(value))
            break;
    }
}

main();
