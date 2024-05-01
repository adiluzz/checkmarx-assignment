import { Moment } from "moment";

export type ResponseData = {
    revenue: number;
    unreserved: number;
    date: string;
}

export type GetRevenueForMonthProps = {
    start: Moment;
    end: Moment;
    date: Moment;
    price: number;
}

export type GetUnreservedCapacityProps = Omit<GetRevenueForMonthProps, 'price'> & { capacity: number };
