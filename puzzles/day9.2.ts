import * as fs from "fs";

function decompress(pointer: number, data: string): [number, number, number] {
    const marker: string = data.slice(pointer + 1, data.indexOf(")", pointer));
    const [length, repetition] = marker.split("x");
    return [marker.length + 2, Number(length), Number(repetition)];
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/9", "utf-8").trim();

    // decompress
    let length: number = 0;
    let pointer: number = 0;
    while (pointer !== data.length) {
        if (data[pointer] !== "(") {
            length += 1;
            pointer++;
        }
        else {
            const [delta, decompressionLength, repetition] = decompress(pointer, data);
            length += decompressionLength * repetition;
            pointer += delta + decompressionLength;
        }
    }

    // print result
    const result: number = length;
    console.log(result); 
}

main();
