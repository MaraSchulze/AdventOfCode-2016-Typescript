import * as fs from "fs";

function isTriangle(triangle: number[]): number {
    let isCorrect: boolean;
    triangle.sort((a, b) => a - b);
    isCorrect = triangle[2] < triangle[0] + triangle[1];
    return isCorrect ? 1 : 0;
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/3", "utf-8");
    const trianglesRowwise: number[] = data.trim().split(/\s+/).map((x) => Number(x));

    let triangles: number[][] = new Array();
    for (let i: number = 0; i < 3; i++) {
        for (let j: number = i; j < trianglesRowwise.length; j += 9) {
            triangles.push([trianglesRowwise[j], trianglesRowwise[j + 3], trianglesRowwise[j + 6]]);
        }
    }

    // check the triangles and count them
    let result: number = 0;

    for (const triangle of triangles) {
        result += isTriangle(triangle);
    }

    // print result
    console.log(result); 
}

main();
