import * as fs from "fs";

export async function readFile(path: string): Promise<string> {
    try {
        console.log(`Read file: ${path}`)
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err);
    }
    return ''
}

export async function readJSON(path: string): Promise<any> {
    return JSON.parse(await readFile(path))
}