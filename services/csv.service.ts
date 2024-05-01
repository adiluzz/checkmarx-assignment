import { parse } from 'csv-parse';
import fs from 'node:fs';


export const parseCsv = async (): Promise<string[][]> => {
    const records = [];
    const parser = fs
        .createReadStream(`./data/data.csv`)
        .pipe(parse({
        }));
    for await (const record of parser) {
        records.push(record);
    }
    return records;
};
