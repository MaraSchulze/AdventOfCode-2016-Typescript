import * as fs from "fs";

function isTriangle(triangle: number[]): boolean {
    triangle.sort((a, b) => a - b);

    return triangle[2] <= triangle[0] + triangle[1];
}

function main(): void {
    // extract input
    const data: string = fs.readFileSync("../input/3", "utf-8");
    const triangles = data.trim().split("\n");

    // check the triangles and count them
    let result: number = 0;

    for (const triangle of triangles) {
        const triangleArr: number[] = triangle.trim().split("  ").slice(0, 3).map((x) => Number(x));
        result += isTriangle(triangleArr) ? 1 : 0;
    }

    // print result
    console.log(result); 
}

main();
