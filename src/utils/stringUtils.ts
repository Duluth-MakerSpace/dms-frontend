import dayjs from "dayjs";
import { SHORT_DAY_DATE_TIME } from "../constants/dateFormats";

export const formatOpenSlots = (signups: number, max: number, expired: boolean = false): string => {
    if (expired) {
        return "Closed";
    }
    if (signups === max) {
        return "All spots taken";
    }
    return `${max - signups} spots remaining`
}

export const formatClassDatesShort = (dates: string[], expired: boolean = false): string => {
    if (dates.length === 0) {
        return " ";
    }
    let suffix;
    if (dates.length === 1) {
        suffix = "";
    } else if (dates.length === 2) {
        suffix = " (+ 1 more session)"
    } else {
        suffix = ` (+ ${dates.length - 1} more sessions)`
    }

    // to do: discombobulate
    const displayDate = dayjs(new Date(parseInt(dates[0]))).format(SHORT_DAY_DATE_TIME);

    return displayDate + ` ` + suffix
}

export const formatDuration = (minutes: number): string => {
    if (minutes === 60) {
        return "1 hour";
    } else if (minutes < 60) {
        return `${minutes} minutes`
    }
    const hours = ~~(minutes / 60);
    const min = minutes % 60;
    if (min === 0) {
        if (hours === 1) {
            return "1 hour"
        } else {
            return `${hours} hours`
        }
    }
    if (hours === 1) {
        return `1 hour, ${min} min`
    } else {
        return `${hours} hours, ${min} min`
    }
}

export const formatDollars = (dollars: number): string => {
    if (Number.isInteger(dollars)) {
        return `$${dollars}`;
    }
    return `$${dollars.toFixed(2)}`;
}

export const formatPhone = (phone: string): string => {
    // Process well-formatted phone numbers but ignore improper phone numbers.
    // "+19998887777" -> "(999) 888-7777"
    if (!/^\+1\d{10}$/.test(phone)) {
        return phone
    }
    return `(${phone.substring(2, 5)}) ${phone.substring(5, 8)}-${phone.substring(8, 12)}`
}