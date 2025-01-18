import * as fs from "fs";

// type definitions
type processorType = { [register: string]: number };

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/12", "utf-8");
    const instructions: string[] = data.trim().split("\n");

    // initialize processor
    let processor: processorType = { a: 0, b: 0, c: 0, d: 0, ip: 0 };
    
    // execute program
    while (processor.ip < instructions.length) {
        let instruction: string = instructions[processor.ip];
        let parameters: string[] = instruction.split(" ");
        execute(parameters, processor);
    }

    // print result
    const result: number = processor.a;
    console.log(result); 
}

function execute(parameters: string[], processor: processorType): void {
    switch (parameters[0]) {
        case "cpy": cpy(parameters.slice(1), processor);
                    break;
        case "inc": inc(parameters.slice(1), processor);
                    break;
        case "dec": dec(parameters.slice(1), processor);
                    break;
        case "jnz": jnz(parameters.slice(1), processor);
                    break;
    }
}

function cpy(parameters: string[], processor: processorType): void {
    // find value according to source type
    let source: number;
    source = "abcd".includes(parameters[0]) ? processor[parameters[0]] : Number(parameters[0]);

    // copy
    const destination: string = parameters[1];
    processor[destination] = source;

    // increase instruction pointer
    processor.ip++;
}

function inc(parameters: string[], processor: processorType): void {
    const register: string = parameters[0];
    processor[register]++;

    // increase instruction pointer
    processor.ip++;
}

function dec(parameters: string[], processor: processorType): void {
    const register: string = parameters[0];
    processor[register]--;

    // increase instruction pointer
    processor.ip++;
}

function jnz(parameters: string[], processor: processorType): void {
    const offset: number = Number(parameters[1]);
    const register: string = parameters[0];

    // jump or increase instruction pointer
    processor.ip += processor[register] != 0 ? offset : 1;
}

main();
