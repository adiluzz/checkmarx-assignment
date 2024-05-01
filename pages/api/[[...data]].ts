import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCsv } from '../../services/csv.service';
import { ResponseData } from '../../services/data.interface';
import { parseCsvData } from '../../services/data.service';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {
        const year = Number(req.query.data[1]);
        const month = Number(req.query.data[2]) - 1;
        const data = await parseCsv();
        const parsedData = await parseCsvData(data, year, month);
        res.status(200).json({
            revenue: parsedData[0],
            unreserved: parsedData[1],
            date: moment({ year, month, day: 1 }).format('YYYY-MM')
        });
    }
}