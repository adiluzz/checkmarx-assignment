import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCsv } from '../../services/csv.service';
import { parseCsvData } from '../../services/data.service';



export type ResponseData = {
    revenue: number;
    unreserved: number;
    month: number;
    year: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | { message: string }>
) {
    if (req.method === 'GET') {
        const year = Number(req.query.data[1]);
        const month = Number(req.query.data[2]);
        const data = await parseCsv();
        const parsedData = await parseCsvData(data, year, month);
        res.status(200).json({
            revenue: parsedData[0],
            unreserved: parsedData[1],
            year, month
        });
    }
    res.status(200).json({ message: 'Hello from Next.js!' });
}