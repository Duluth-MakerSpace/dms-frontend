export const combineDateTime = (date: Date, time: Date) => {
    date.setHours(time.getHours(), time.getMinutes());
    return date;
}