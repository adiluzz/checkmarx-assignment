import moment, { Moment } from "moment";


type GetRevenueForMonthProps = {
    start: Moment;
    end: Moment;
    date: Moment;
    price: number;
}

const getRevenueForMonth = (props: GetRevenueForMonthProps): number => {
    if (props.start.isSame(props.date, 'month') || props.end.isSame(props.date, 'month')) {
        const totalDaysInMonth = props.date.daysInMonth();
        const startDay = props.start.isSame(props.date, 'month') ? props.start.day() : 1;
        const endDay = props.end.isSame(props.date, 'month') ? props.end.day() : totalDaysInMonth;
        const totalDays = endDay - startDay;
        const pricePerDay = props.price / totalDaysInMonth;
        return totalDays * pricePerDay;
    }
    if (props.date.isBetween(props.start, props.end)) {
        return props.price;
    }
    return 0;
};

type GetUnreservedCapacityProps = Omit<GetRevenueForMonthProps, 'price'> & { capacity: number };

const getUnreservedCapacity = (props: GetUnreservedCapacityProps): number => {
    if (props.date.isBetween(props.start, props.end)) {
        return 0;
    }
    return props.capacity;
}


export const parseCsvData = async (csvData: string[][], year: number, month: number) => {
    const monthMoment = moment({ year, month, day: 1 });
    let totalRevenue = 0;
    let totalUnreservedCapcity = 0;
    for (let i = 1; i < csvData.length; i++) {
        const [capacity, monthlyPrice, start, end] = csvData[i];
        const startDate = moment(start);
        const endDate = end ? moment(end) : moment();
        const price = Number(monthlyPrice);
        totalRevenue += getRevenueForMonth({
            start: startDate,
            end: endDate,
            date: monthMoment,
            price
        });
        totalUnreservedCapcity += getUnreservedCapacity({
            start: startDate,
            end: endDate,
            date: monthMoment,
            capacity: Number(capacity)
        });
    }
    return [totalRevenue, totalUnreservedCapcity];
};