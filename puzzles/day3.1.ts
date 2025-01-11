import * as fs from "fs";

function isTriangle(triangle: number[]): number {
    let isCorrect: boolean;
    triangle.sort((a, b) => a - b);
    isCorrect = triangle[2] <= triangle[0] + triangle[1];
    return isCorrect ? 1 : 0;
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/3", "utf-8");
    const triangles = data.split("\n");

    // check the triangles and count them
    let result: number = 0;

    for (const triangle of triangles) {
        const triangleArr: number[] = triangle.split("  ").slice(1, 4).map((x) => Number(x));
        result += isTriangle(triangleArr);
    }

    // print result
    console.log(result); 
}

main();
