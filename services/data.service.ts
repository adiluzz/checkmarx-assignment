import moment from "moment";
import { GetRevenueForMonthProps, GetUnreservedCapacityProps } from "./data.interface";

const getRevenueForMonth = (props: GetRevenueForMonthProps): number => {

    // If an office is partially reserved for a given month, calculate the number of days and the price per day
    if (props.start.isSame(props.date, 'month') || props.end.isSame(props.date, 'month')) {
        const totalDaysInMonth = props.date.daysInMonth();
        const startDay = props.start.isSame(props.date, 'month') ? props.start.day() : 1;
        const endDay = props.end.isSame(props.date, 'month') ? props.end.day() : totalDaysInMonth;
        const totalDays = endDay - startDay;
        const pricePerDay = props.price / totalDaysInMonth;
        return totalDays * pricePerDay;
    }

    // If an office is not partially reserved for a given month, calculate that as a full month
    if (props.date.isBetween(props.start, props.end)) {
        return props.price;
    }

    // return 0 if no reservation was made
    return 0;
};

const getUnreservedCapacity = (props: GetUnreservedCapacityProps): number => {
    // If date is in between return 0 (non unused capacity), else return the capacity
    if (props.date.isBetween(props.start, props.end)) {
        return 0;
    }
    return props.capacity;
}


export const parseCsvData = async (csvData: string[][], year: number, month: number): Promise<number[]> => {
    const monthMoment = moment({ year, month, day: 1 });
    let totalRevenue = 0;
    let totalUnreservedCapcity = 0;
    for (let i = 1; i < csvData.length; i++) {
        // get data from csv row parse the strings and create moment objects and numbers
        const [capacity, monthlyPrice, start, end] = csvData[i];
        const startDate = moment(start);
        const endDate = end ? moment(end) : moment();
        const price = Number(monthlyPrice);

        // Revenue for month
        totalRevenue += getRevenueForMonth({
            start: startDate,
            end: endDate,
            date: monthMoment,
            price
        });

        // unreserved for month
        totalUnreservedCapcity += getUnreservedCapacity({
            start: startDate,
            end: endDate,
            date: monthMoment,
            capacity: Number(capacity)
        });
    }

    // return the totals
    return [totalRevenue, totalUnreservedCapcity];
};